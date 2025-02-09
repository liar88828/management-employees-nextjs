export const errorStatus = [
    {
        status_code: 100,
        name: "Continue",
        description:
            "The server has received the request headers, and the client should proceed to send the request body.",
    },
    {
        status_code: 101,
        name: "Switching Protocols",
        description:
            "The server agrees to switch protocols as requested by the client.",
    },
    {
        status_code: 102,
        name: "Processing",
        description:
            "The server has received and is processing the request, but no response is available yet.",
    },
    {
        status_code: 103,
        name: "Early Hints",
        description:
            "Used to return some response headers before the final HTTP message.",
    },
    {
        status_code: 200,
        name: "OK",
        description:
            "The request was successful, and the server returned the requested data.",
    },
    {
        status_code: 201,
        name: "Created",
        description: "The request was successful, and a new resource was created.",
    },
    {
        status_code: 202,
        name: "Accepted",
        description:
            "The request has been accepted for processing but is not yet complete.",
    },
    {
        status_code: 203,
        name: "Non-Authoritative Information",
        description:
            "The returned metadata is not from the original server but a third party.",
    },
    {
        status_code: 204,
        name: "No Content",
        description:
            "The request was successful, but there is no content to send in the response.",
    },
    {
        status_code: 205,
        name: "Reset Content",
        description: "Informs the client to reset the view or UI.",
    },
    {
        status_code: 206,
        name: "Partial Content",
        description:
            "The server is delivering part of the resource due to a range header sent by the client.",
    },
    {
        status_code: 300,
        name: "Multiple Choices",
        description:
            "Indicates multiple options for the resource from which the client can choose.",
    },
    {
        status_code: 301,
        name: "Moved Permanently",
        description:
            "The requested resource has been moved permanently to a new URL.",
    },
    {
        status_code: 302,
        name: "Found",
        description: "The resource is temporarily located at a different URL.",
    },
    {
        status_code: 303,
        name: "See Other",
        description:
            "The client should retrieve the resource using a different URL with GET.",
    },
    {
        status_code: 304,
        name: "Not Modified",
        description: "The resource has not been modified since the last request.",
    },
    {
        status_code: 307,
        name: "Temporary Redirect",
        description: "Similar to 302, but the method should not change.",
    },
    {
        status_code: 308,
        name: "Permanent Redirect",
        description: "Similar to 301, but the method should not change.",
    },
    {
        status_code: 400,
        name: "Bad Request",
        description:
            "The server cannot process the request due to client-side errors.",
    },
    {
        status_code: 401,
        name: "Unauthorized",
        description:
            "Authentication is required, or the provided credentials are invalid.",
    },
    {
        status_code: 403,
        name: "Forbidden",
        description:
            "The client is authenticated but does not have permission to access the resource.",
    },
    {
        status_code: 404,
        name: "Not Found",
        description: "The requested resource could not be found on the server.",
    },
    {
        status_code: 405,
        name: "Method Not Allowed",
        description:
            "The HTTP method used is not allowed for the requested resource.",
    },
    {
        status_code: 409,
        name: "Conflict",
        description: "A conflict occurred, such as a resource already existing.",
    },
    {
        status_code: 422,
        name: "Unprocessable Entity",
        description:
            "The server understands the request but cannot process it due to validation errors.",
    },
    {
        status_code: 429,
        name: "Too Many Requests",
        description: "The client has sent too many requests in a given timeframe.",
    },
    {
        status_code: 500,
        name: "Internal Server Error",
        description:
            "The server encountered an unexpected condition that prevented it from fulfilling the request.",
    },
    {
        status_code: 501,
        name: "Not Implemented",
        description: "The server does not support the requested functionality.",
    },
    {
        status_code: 502,
        name: "Bad Gateway",
        description:
            "The server received an invalid response from an upstream server.",
    },
    {
        status_code: 503,
        name: "Service Unavailable",
        description:
            "The server is currently unable to handle the request due to maintenance or overload.",
    },
    {
        status_code: 504,
        name: "Gateway Timeout",
        description:
            "The server did not receive a timely response from an upstream server.",
    },
    {
        status_code: 505,
        name: "HTTP Version Not Supported",
        description:
            "The server does not support the HTTP protocol version used in the request.",
    },
] as const

// Create types for the status codes and names
export type ErrorStatusName = (typeof errorStatus)[number]["name"] // "Continue" | "Switching Protocols"
export  type ErrorStatusCode = (typeof errorStatus)[number]["status_code"] // 100 | 101

// Assigning values
const dataName: ErrorStatusName = "Unauthorized" // This will work
const dataCode: ErrorStatusCode = 201 // This will NOT work because 499 is not a valid status code in errorStatus

export function findStatusCode(errorName: ErrorStatusName): ErrorStatusCode {
    const status = errorStatus.find(status => status.name === errorName);
    if (!status) {
        throw new Error(`Error status not found for name: ${ errorName }`);
    }
    return status.status_code;
}

// Function to find error name based on code
export function findErrorName(code: ErrorStatusCode): ErrorStatusName {
    const status = errorStatus.find(status => status.status_code === code);
    if (!status) {
        throw new Error(`Error status not found for code: ${ code }`);
    }
    return status.name;
}
