import { NextResponse } from "next/server";
import { testRepositories } from "@/server/repository/test.repo";

export async function POST() {
    // return NextResponse.json('')
    const data = await testRepositories.seedDelivery()
    return NextResponse.json(data)
}
