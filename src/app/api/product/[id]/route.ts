import { NextRequest } from "next/server"
import { TContext } from "@/interface/server/param"
import { ResponseJson } from "@/utils/requestHelper"
import { productController } from "@/server/controller";

export async function GET(request: NextRequest, context: TContext) {
  return await ResponseJson(
    async () => productController.findById(request, context),
    "GET",
    "product",
    201
  )
}

export async function DELETE(request: NextRequest, context: TContext) {
  return await ResponseJson(
    async () => productController.deleteOne(request, context),
    "DELETE",
    "product"
  )
}

export async function PUT(request: NextRequest, context: TContext) {
  return await ResponseJson(
    async () => productController.updateOne(request, context),
    "PUT",
    "product"
  )
}

export async function PATCH(request: NextRequest, context: TContext) {
    return await ResponseJson(
        async () => productController.updateStock(request, context),
        "PATCH",
        "product"
    )
}
