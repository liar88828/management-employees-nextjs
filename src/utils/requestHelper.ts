import { TContext } from "@/interface/server/param"
import { NextRequest, NextResponse } from "next/server"
import Zod from "zod"
import { Prisma } from ".prisma/client"
import type { TMethod, ToModel } from "@/interface/Utils"
import { ErrorResponse } from "@/utils/ErrorResponse";
import { ErrorResponseCode, ErrorResponseName } from "@/utils/errorHandler";

export async function getId({ params }: TContext) {
    const param = await params
    if (param) {
        return param.id
    }
    throw new Error("please add id")
}

export async function getIdNum({ params }: TContext): Promise<number> {
    const param = await params
    if (param) {
        return Number(param.id)
    }
    throw new Error("please add id")
}

export async function getContext({ params }: TContext, key: keyof Awaited<TContext['params']>) {

    const param = await params
    if (param && key in param) {
        return param[key]
    }
    return ''
}

export async function getSearchName({ searchParams }: TContext, text: keyof Awaited<TContext['searchParams']>) {
    const searchParam = await searchParams
    if (searchParam && text in searchParam) {
        return searchParam[text]
    }
    return ''
}

export async function getSearchNameNum({ searchParams }: TContext, text: keyof Awaited<TContext['searchParams']>): Promise<number> {
    const searchParam = await searchParams
    if (searchParam && text in searchParam) {
        return Number(searchParam[text])
    }
    return 1
}


export async function getJson(request: NextRequest) {
    return request.json()
}

export function getParams(request: NextRequest, text: string) {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)
    return searchParams.get(text) ?? undefined
}

export function getParamsNum(request: NextRequest, text: string): number {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)
    const data = searchParams.get(text)
    return data ? Number(data) : 1
}


export function getParamsBool(request: NextRequest, text: string) {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)
    const search = searchParams.get(text);
    if (search === 'true') {
        return true
    } else if (search === 'false') {
        return false
    } else if (search === null) {
        return undefined
    }
}

export function getParamsValue<T>(request: NextRequest, text: string, value: T): T {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)
    const search = searchParams.get(text)
    if (search) {
        return search as T
    } else {
        return value
    }
}

export function getParamsThrow(request: NextRequest, text: string) {
    const url = new URL(request.url)
    const searchParams = new URLSearchParams(url.search)
    const value = searchParams.get(text)
    if (!value) {
        throw new Error(`please add a params : ${ text }`)
    }
    return value
}

export async function ResponseJson(
    fun: any,
    method: TMethod,
    _from: ToModel = "not implement",
    code: number = 200
) {
    // console.info(`method : ${method} from : ${_from}`)

    try {

        const controls: any = await fun()
        const response = {
            msg: `${ method } ${ _from } success`,
            data: controls,
            code: code,
        }
        return NextResponse.json(response, { status: code })
    } catch (err: unknown) {
        if (err instanceof Zod.ZodError) {
            return NextResponse.json(
                {
                    msg: `Error on ${ method }`,
                    error: err.issues,
                    data: []
                },
                { status: 400 }
            )
        }

        if (err instanceof Prisma.PrismaClientValidationError) {
            console.error(err)
            return NextResponse.json(
                {
                    msg: `Error on ${ method }`,
                    error: err,
                    data: []

                },
                { status: 400 }
            )
        }

        if (err instanceof Prisma.PrismaClientUnknownRequestError) {
            // console.error(err)
            return NextResponse.json(
                {
                    msg: `Error on ${ method }`,
                    error: err,
                    data: []
                },
                {
                    status: 404
                }
            )
        }

        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            if (err.code === 'P2003') {
                return NextResponse.json(
                    {
                        msg: `Error on ${ method } : 'The is has relational with other Data, we recommendation to edit than delete the data'`,
                        error: err,
                        data: []
                    },
                    { status: 400 }
                )
            }
        }
        if (err instanceof ErrorResponse) {

            return NextResponse.json(
                {
                    msg: `Error on ${ method }`,
                    error: err.msg,
                    code: err.code,
                },
                { status: err.code }
            )
        }
        if (err instanceof ErrorResponseName) {
            return NextResponse.json(
                {
                    msg: `Error on ${ method }, ${ err.message }`,
                    error: err.name,
                    code: err.code,
                },
                { status: err.code }
            )
        }

        if (err instanceof ErrorResponseCode) {
            return NextResponse.json(
                {
                    msg: `Error on ${ method }, ${ err.message }}`,
                    error: err.name,
                    code: err.code,
                },
                { status: err.code }
            )
        }

        if (err instanceof Error) {
            return NextResponse.json(
                {
                    msg: `Error on ${ method }`,
                    error: err.message,
                    code: 500,
                },
                { status: 500 }
            )
        }
    }
}
