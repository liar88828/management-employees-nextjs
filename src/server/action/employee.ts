'use server'
import {redirect} from "next/navigation";
import {testimonialRepository, userRepository} from "@/server/controller";
import {sanitizedTestimonialID, testimonialSanitize} from "@/sanitize/testimonial.sanitize";
import {isRedirectError} from "next/dist/client/components/redirect-error";
import {ZodError} from "zod";
import {revalidatePath} from "next/cache";
import {TestimonialFormState} from "@/validation/testimonial.valid";
import {SignupFormSchema} from "@/validation/auth.valid";
import {checkPassword} from "@/server/lib/password";
import bcrypt from "bcrypt";
import {ROLE} from "@/interface/Utils";
import {createSession} from "@/server/lib/state";
import {EmployeeCreateZodClient} from "@/validation/employee.valid";
import {saveImage, saveImageAction, setPathImage} from "@/server/repository/image.repo";
import {employeeSanitizeAction} from "@/sanitize/employe.sanitize";
import {employeeCreateUserRepo} from "@/server/repository/employee.repo";


export async function createEmployeeActionAdmin(_prev: TestimonialFormState, formData: FormData): Promise<TestimonialFormState> {
    const formRaw = testimonialSanitize(formData);
    try {
        if (formRaw.method === 'POST') {
            await testimonialRepository.createOne(formRaw)
        } else if (formRaw.method === 'PUT' && formRaw.id) {
            await testimonialRepository.updateOne(formRaw, formRaw.id)
        }
        redirect(`/admin/testimonial`)
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        if (error instanceof ZodError) {
            return {
                message: 'Validation failed',
                prev: formRaw,
                errors: error.flatten().fieldErrors
            }
        }

        if (error instanceof Error) {
            return {
                message: 'Something Error failed',
                prev: formRaw,
            }
        }

    }
}

export async function updateEmployeeActionAdmin(_prev: TestimonialFormState, formData: FormData): Promise<any> {
    const {id} = sanitizedTestimonialID(formData);
    try {
        await testimonialRepository.deleteOne(id)
        revalidatePath('/')
        redirect(`/admin/testimonial`)
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        if (error instanceof Error) {
            return {
                message: 'Something Error failed',
            }
        }

    }
}


export async function createEmployeeActionUser(_prev: TestimonialFormState, formData: FormData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse(Object.fromEntries(formData));

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const {name, email, password, phone, address, id} = validatedFields.data

    const userDB = await userRepository.findByIdValid(id)

    await checkPassword(password, userDB.password)

    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10)

    // 3. Insert the user into the database or call an Auth Library's API
    const user = await userRepository.updateOne(
        {
            name,
            email,
            password: hashedPassword,
            phone,
            role: ROLE.USER,
        },
        userDB.id
    )


    // 4. Create user session
    await createSession(user)

    // 5. Redirect user
    redirect('/home')
}


export const employeeCreateUserAction = async (data: EmployeeCreateZodClient) => {
    // @ts-expect-error
    const image = data.img[0] as File
    const filePath = await setPathImage(image)
    const response = await employeeCreateUserRepo(employeeSanitizeAction(data, filePath, data.userId))
    if (response) {
        await saveImageAction(image, filePath)
    }
    redirect('/home')




}
