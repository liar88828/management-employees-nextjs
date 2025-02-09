import { NextRequest } from "next/server";
import { TContext } from "@/interface/server/param";

export interface InterfaceController {
	
	findAll(request: NextRequest, context: TContext): Promise<any>;
	
	findById(request: NextRequest, context: TContext): Promise<any>;
	
	createOne(request: NextRequest, context: TContext): Promise<any>;
	
	updateOne(request: NextRequest, context: TContext): Promise<any>;
	
	deleteOne(request: NextRequest, context: TContext): Promise<any>;
}