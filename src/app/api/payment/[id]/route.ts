import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/utils/requestHelper"
import {paymentController} from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
  return await ResponseJson(
    async () => paymentController.findById(request, context),
    "GET",
    "payment",
    201
  )
}

export async function DELETE(request: NextRequest, context: TContext) {
  return await ResponseJson(
    async () => paymentController.deleteOne(request, context),
    "DELETE",
    "payment"
  )
}

export async function PUT(request: NextRequest, context: TContext) {
  return await ResponseJson(
    async () => paymentController.updateOne(request, context),
    "PUT",
    "payment"
  )
}
