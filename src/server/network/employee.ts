import { toFetch } from "@/hook/toFetch";
import { ResponseAll } from "@/interface/server/param";
import { TEmployeeDB } from "@/interface/entity/employee.model";
import { EmployeeCreateZodClient } from "@/schema/employee.valid";
import { toUrl } from "@/utils/toUrl";
import { EmployeeParams } from "@/server/repository/employee.repo";
import { ErrorFetch } from "@/utils/ErrorResponse";

export const employeeAll = async ({filter, pagination}: EmployeeParams) => {
    const url = toUrl('employee', {...filter, ...pagination})
    return toFetch<ResponseAll<TEmployeeDB>>('GET', {url})
};

export const employeeId = async (id: string) => {
    return toFetch<TEmployeeDB>('GET', {
        url: `employee/${id}`
    })
};

export const employeeFindByUserId = async (userId: string) => {
    return toFetch<TEmployeeDB>('GET', {
        url: `employee/user/${userId}`
    })
};


export const employeeCreate = async ({img, ...data}: EmployeeCreateZodClient) => {
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

export const employeeUpdate = async ({img, ...data}: EmployeeCreateZodClient, id: string) => {
    try {
        const formData = new FormData();

        formData.append('file', img[0]);
        formData.append('data', JSON.stringify(data));

        const response = await fetch(`/api/employee/${id}`, {
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

export async function onUpsertData(method: "POST" | "PUT", data: EmployeeCreateZodClient, id?: string) {
    if (method === "POST") {
        return employeeCreate(data)
    } else if (method === "PUT" && id) {
        return employeeUpdate(data, id)
    }
}

export const employeeCreateUserApi = async ({ img, ...data }: EmployeeCreateZodClient) => {
    const formData = new FormData();
    formData.append('file', img[0]);
    formData.append('data', JSON.stringify(data));

    const response = await fetch(`/api/user/registration/${ data.userId }`, {
        method: 'POST',
        body: formData, // Send as FormData
    });

    console.log('employeeCreateUser', response.json());
    if (!response.ok) {
        const data = await response.json();
        console.error(data)
        const errorData: { msg: string, error: any, code: number } = data
        throw new ErrorFetch(errorData.msg || 'Failed to create employee');
    }

    return response.json();
}

