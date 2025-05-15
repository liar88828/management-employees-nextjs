import { toFetch } from "@/hook/toFetch";
import { ResponseAll } from "@/interface/server/param";
import { EmployeeParams, TEmployeeDB } from "@/interface/entity/employee.model";
import { toUrl } from "@/utils/toUrl";
import { ErrorFetch } from "@/utils/error/ErrorClass";
import { RegistrationUserCreateClient } from "@/app/(user)/registration/registration-user-sanitizer";

export const employeeAll = async ({ filter, pagination }: EmployeeParams) => {
    const url = toUrl('employee', { ...filter, ...pagination })
    return toFetch<ResponseAll<TEmployeeDB>>('GET', { url })
};

export const employeeId = async (id: string) => {
    return toFetch<TEmployeeDB>('GET', {
        url: `employee/${ id }`
    })
};

export const employeeFindByUserId = async (userId: string) => {
    return toFetch<TEmployeeDB>('GET', {
        url: `employee/user/${ userId }`
    })
};

export const employeeCreate = async ({ img, ...data }: RegistrationUserCreateClient) => {
    try {
        const formData = new FormData();

        formData.append('file', img[0]);
        formData.append('data', JSON.stringify(data));

        const response = await fetch('/api/employee', {
            method: 'POST',
            body: formData, // Send as FormData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error(errorData || 'Failed to create employee');
        }

        // Optionally redirect or show success message
        // router.push('/employees'); // Redirect to employees list
        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        return false
    }
};

export const employeeUpdate = async ({ img, ...data }: RegistrationUserCreateClient, id: string) => {
    try {
        const formData = new FormData();

        formData.append('file', img[0]);
        formData.append('data', JSON.stringify(data));

        const response = await fetch(`/api/employee/${ id }`, {
            method: 'PUT',
            body: formData, // Send as FormData
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error(errorData || 'Failed to create employee');
        }

        return response.json();
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        return false
    }
};

export async function onUpsertData(method: "POST" | "PUT", data: RegistrationUserCreateClient, id?: string) {
    if (method === "POST") {
        return employeeCreate(data)
    } else if (method === "PUT" && id) {
        return employeeUpdate(data, id)
    }
}

export const _employeeCreateUserApi = async ({ img, ...data }: RegistrationUserCreateClient) => {
    const formData = new FormData();
    formData.append('file', img[0]);
    formData.append('data', JSON.stringify(data));
// .userId
    const response = await fetch(`/api/user/registration/${ data }`, {
        method: 'POST',
        body: formData, // Send as FormData
    });

    console.log('employeeCreateUserAction', response.json());
    if (!response.ok) {
        const data = await response.json();
        console.error(data)
        const errorData: { msg: string, error: any, code: number } = data
        throw new ErrorFetch(errorData.msg || 'Failed to create employee');
    }

    return response.json();
}
