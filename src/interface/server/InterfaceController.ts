import { NextRequest } from "next/server";
import { TContext } from "@/interface/server/param";

export interface InterfaceController {
	
	getTestimonialAll(request: NextRequest, context: TContext): Promise<any>;
	
	testimonialById(request: NextRequest, context: TContext): Promise<any>;
	
	testimonialCreate(request: NextRequest, context: TContext): Promise<any>;
	
	testimonialUpdate(request: NextRequest, context: TContext): Promise<any>;
	
	testimonialDelete(request: NextRequest, context: TContext): Promise<any>;
}