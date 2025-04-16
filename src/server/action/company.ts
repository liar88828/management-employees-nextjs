'use server'
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { CompanyFormSchema, CompanyFormSchemaType, CompanyFormState } from "@/schema/company.valid";
import { saveImage, saveImageFormData, updateImage, updateImageFormData } from "@/server/repository/image.repo";
import { prisma } from "@/config/prisma";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createCompanyActionFormData(state: CompanyFormState, formData: FormData): Promise<CompanyFormState> {
    const formValue = Object.fromEntries(formData);
    // @ts-ignore
    formValue.img = [ formValue.img ]
    try {
        const validatedFields = CompanyFormSchema.safeParse(formValue)

        if (!validatedFields.success) {
            console.log(validatedFields.error.flatten().fieldErrors,)
            return {
                value: formValue,
                success: false,
                errors: validatedFields.error.flatten().fieldErrors,
            }
        }

        const { id, img, ...data } = validatedFields.data
        await prisma.$transaction(async (tx) => {
            const found = await tx.companys.findUnique({
                where: { id: Number(id) }
            })
            if (found) {
                await updateImageFormData(formData, '/company/logo.png', 'img')
                await tx.companys.update({
                    where: { id: found.id },
                    data: {
                        ...data,
                        img: '/company/logo.png'
                    }
                })
            } else {
                await saveImageFormData(formData, '/company/logo.png', 'img')
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
        console.log('is success')
        return {
            value: formValue,
            success: true,
            message: "Company created successfully."
        }
    } catch (e) {
        console.error('is failed')
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

export async function createCompanyAction(companyData: CompanyFormSchemaType) {
    try {
        const { id, img, visi, misi, ...data } = companyData

        const imageFile = img?.[0]
        const hasValidImage = imageFile instanceof File && imageFile.size > 0
        // console.log('hasValidImage', hasValidImage)
        // //false
        // console.log("imageFile", imageFile)
        // // imageFile File {
        // //     size: 1968,
        // //         type: 'image/jpeg',
        // //         name: '503027.jpg',
        // //         lastModified: 1744457102591
        // // }

        await prisma.$transaction(async (tx) => {
            const found = await tx.companys.findUnique({
                where: { id: Number(id) }
            })

            if (found) {
                const companyDB = await tx.companys.findUnique({ where: { id: found.id }, select: { img: true } })
                await tx.companys.update({
                    where: { id: found.id },
                    data: {
                        ...data,
                        ...(hasValidImage && { img: `/company/${ imageFile.name }` })
                    }
                })

                await tx.visi.deleteMany({ where: { companysId: found.id } })
                await tx.visi.createMany({
                    data: visi.map(item => ({
                        text: item.text,
                        companysId: found.id
                    })),
                })

                await tx.misi.deleteMany({ where: { companysId: found.id } })
                await tx.misi.createMany({
                    data: misi.map(item => ({
                        text: item.text,
                        companysId: found.id
                    })),
                })

                if (hasValidImage) {
                    await updateImage(imageFile, `/company/${ imageFile.name }`, companyDB?.img ?? undefined)
                }
            } else {

                const companyDB = await tx.companys.create({
                    data: {
                        ...data,
                        ...(hasValidImage && { img: `/company/${ imageFile.name }` })
                    },
                    select: { id: true }
                })

                await tx.visi.createMany({
                    data: visi.map(item => ({
                        text: item.text,
                        companysId: companyDB.id
                    })),
                })

                await tx.misi.createMany({
                    data: misi.map(item => ({
                        text: item.text,
                        companysId: companyDB.id
                    })),
                })
                if (hasValidImage) {
                    await saveImage(imageFile, `/company/${ imageFile.name }`)
                }
            }
        })

        console.log('is success')
        revalidatePath('/')
    } catch (e) {
        console.error(`is failed : ${ e }`)
        if (isRedirectError(e)) throw e
        if (e instanceof Error) {
            throw e.message
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
