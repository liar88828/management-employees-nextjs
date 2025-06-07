import { TContext } from "@/interface/server/param"

export async function getId({ params }: TContext) {
    const param = await params
    if (param) {
        return param.id
    }
    throw new Error("please add id")
}

export async function getContextParam({ params }: TContext, key: keyof Awaited<TContext['params']>) {
    const param = await params
    if (param && key in param) {
        return param[key]
    }
    return ''
}

export async function getContextQuery({ searchParams }: TContext, text: keyof Awaited<TContext['searchParams']>): Promise<string> {
    const searchParam = await searchParams
    if (searchParam && text in searchParam) {
        return searchParam[text]
    }
    return ''
}

export async function getContextQueryNum({ searchParams }: TContext, text: keyof Awaited<TContext['searchParams']>): Promise<number> {
    const searchParam = await searchParams
    if (searchParam && text in searchParam) {
        return Number(searchParam[text])
    }
    return 1
}
