import { NextResponse } from "next/server";
import { testRepositories } from "@/server/repository/test.repo";
import { ResponseJson } from "@/utils/requestHelper";

export async function GET() {
    // return NextResponse.json('')

	return NextResponse.json({ data: await testRepositories.getMonthlyTotal() })

}

export async function POST() {
    return ResponseJson(
        async () => {
            // return NextResponse.json('')
            return testRepositories.seedOrder()
        },
        "POST",
        "test",
        201
    )


}
