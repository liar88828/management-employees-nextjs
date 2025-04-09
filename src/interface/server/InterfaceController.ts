import { NextRequest } from "next/server";
import { TContext } from "@/interface/server/param";

export interface InterfaceController {
	
	employeeGetAll(request: NextRequest, context: TContext): Promise<any>;
	
	employeeById(request: NextRequest, context: TContext): Promise<any>;
	
	employeeCreate(request: NextRequest, context: TContext): Promise<any>;
	
	employeeUpdate(request: NextRequest, context: TContext): Promise<any>;
	
	employeeDelete(request: NextRequest, context: TContext): Promise<any>;
}