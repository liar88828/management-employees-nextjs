import * as z from "zod";
import { EmployeesModel } from "@/generate/zod/employees";


export type EmployeesModelType = z.infer<typeof EmployeesModel>
