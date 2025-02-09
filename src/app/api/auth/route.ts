import {NextRequest} from "next/server";
import {ResponseJson} from "@/utils/requestHelper";
import {fromRequest} from "@/server/lib/api";

export async function GET(request: NextRequest,) {
    return ResponseJson(
        async () => {
            return {data: await fromRequest(request)}
        },
        "GET",
        "auth",
        201
    )
}

