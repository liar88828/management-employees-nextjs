import { BaseLayoutAdmin } from "@/app/layout/baseLayoutAdmin";
import { getSession } from "@/secure/db";
import { Metadata } from "next";
import React, { ReactNode } from "react";


export const metadata: Metadata = {
	title: 'Admin Dashboard',
	description: 'Admin Dashboard',
}

export default async function Layout({ children }: { children: ReactNode }) {
	const session = await getSession()
	const isLogin = !!session

	return (
		<BaseLayoutAdmin
			isLogin={ isLogin }
			notification={ <></> }
		>
			{ children }
		</BaseLayoutAdmin>
	)

}
