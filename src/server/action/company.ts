'use server'
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { CompanyFormSchema, CompanyFormState } from "@/schema/company.valid";
import { saveImage, updateImage } from "@/server/repository/image.repo";
import { prisma } from "@/config/prisma";
import { redirect } from "next/navigation";

export async function createCompanyAction(state: CompanyFormState, formData: FormData): Promise<CompanyFormState> {

    const formValue = Object.fromEntries(formData);
    // @ts-ignore
    formValue.img = [ formValue.img ]
    try {
        const validatedFields = CompanyFormSchema.safeParse(formValue)
        if (!validatedFields.success) {
            return {
                value: formValue,
                success: false,
                errors: validatedFields.error.flatten().fieldErrors,
            }
        }
        const { id, img, ...data } = validatedFields.data
        await prisma.$transaction(async (tx) => {
            const found = await tx.companys.findUnique({ where: { id: Number(id) } })
            if (found) {
                await updateImage(formData, '/company/logo.png', 'img')
                await tx.companys.update({
                    where: { id: found.id },
                    data: {
                        ...data,
                        img: '/company/logo.png'
                    }
                })
            } else {
                await saveImage(formData, '/company/logo.png', 'img')
                await tx.companys.create({
                    data: {
                        ...data,
                        img: '/company/logo.png'
                    }
                })
            }

            // await tx.companys.upsert({
            //     where: { id: Number(id) },
            //     create: data,
            //     update: data
            // })
        })

        return {
            value: formValue,
            success: true,
            message: "Company created successfully."
        }
    } catch (e) {

        if (isRedirectError(e)) {
            throw e
        }

        if (e instanceof Error) {
            return {
                value: formValue,
                success: false,
                message: e.message,
            }
        }
        return {
            value: formValue,
            success: false,
            message: 'Something Error',
            // prev: { email, password }
        }
    }
}

export async function findCompanyForUser() {
    const company = await prisma.companys.findFirst()
    if (!company) {
        redirect('/home')
    }
    return company
}
