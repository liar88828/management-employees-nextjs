import { NextRequest } from "next/server";
import { TContext } from "@/interface/server/param";
import { ResponseJson } from "@/utils/requestHelper";
import { receiverController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
    return await ResponseJson(
        async () => receiverController.findUser(request, context),
        "GET",
        "receiver"
    )
}

