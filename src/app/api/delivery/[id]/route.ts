import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/utils/requestHelper"
import { deliveryController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
  return ResponseJson(
    async () => deliveryController.findById(request, context),
    "GET",
    "delivery",
    201
  )
}

export async function DELETE(request: NextRequest, context: TContext) {
  return ResponseJson(
    async () => deliveryController.deleteOne(request, context),
    "DELETE",
    "delivery"
  )
}

export async function PUT(request: NextRequest, context: TContext) {
  return await ResponseJson(
    async () => deliveryController.updateOne(request, context),
    "PUT",
    "delivery"
  )
}
