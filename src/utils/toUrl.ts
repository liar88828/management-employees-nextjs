type QueryParams = Record<string, string | number | boolean | null | undefined>;

export function toParams<T extends QueryParams>(params: T): string {
    const searchParams = new URLSearchParams();

    // Populate searchParams with key-value pairs from params
    for (const [ key, value ] of Object.entries(params)) {
        if (value !== null && value !== undefined) {
            searchParams.append(key, String(value));
        }
    }

    return `?${ searchParams.toString() }`;
}

export function toUrl<T extends QueryParams>(endPoint: string, params: T): string {
    return `${ endPoint }${ toParams(params) }`;
}
