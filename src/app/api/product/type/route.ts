import { ResponseJson } from "@/utils/requestHelper";
import { productController } from "@/server/controller";

export async function GET() {
    return await ResponseJson(
        async () => productController.findType(),
        "POST",
        "product"
    )

}