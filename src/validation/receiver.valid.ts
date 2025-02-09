import { z } from "zod"
import { TReceiverCreate } from "@/interface/entity/receiver.model";

import { zodAddress, zodPhone } from "@/validation/zod.valid";

export const ReceiverCreate: z.ZodType<TReceiverCreate> = z.object({
    address: zodAddress,
    id: z.string().optional(),
    name: z.string({ required_error: "name is required" }).min(1).max(100),
    phone: zodPhone,

})

