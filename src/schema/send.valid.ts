import { z } from "zod";
import { zodDate } from "@/schema/zod.valid";
// import { Letters } from "@prisma/client";

// export type LetterDB = Omit<Letters, 'id' | 'updatedAt' | 'createdAt'> & { id?: string }

// : z.ZodType<Omit<LetterDB, 'id'>>
z.object({
    id: z.string().optional(),
    // option: z.string().min(2),
    // employeesId: z.lists(z.string()),
    interviewDate: zodDate,
    interviewLocation: z.string().min(2),
    dressCode: z.string().min(2),
    signerName: z.string().min(2),
});
