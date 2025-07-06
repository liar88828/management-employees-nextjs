import { UserEmployeeDocumentModal } from "@/app/components/AdminEmployeeDetailPage";
import { EmployeeIDCardModal, EmployeeJobApplicationModal } from "@/app/components/Letter/IDCardEmployeeGlobal";
import { UserEmployeeCVModal } from "@/app/components/Letter/CVGlobal";
import { TEmployeeDB, UserAuth } from "@/interface/model";
import { statusEmployeeIndo } from "@/utils/statusEmployee";
import { toDateIndo } from "@/utils/toDate";
import Link from "next/link";
import React from 'react';


export function UserHomePage({ employee, message, user }: {
	employee: TEmployeeDB | null,
	message?: string,
	user: UserAuth
}) {
	const hasEmployee = Boolean(employee);
	const employeeStatus = statusEmployeeIndo(employee);

	const errorArray: { message: string }[] = [
		{ message: message || '' },
		{ message: employeeStatus },
		{ message: !employee ? 'Please Complete Register will Show' : '' }
	].filter(e => e.message); // remove empty messages

	return (
		<div className="card bg-base-200">
			<div className="card-body">
				<div className="">
					<h1 className="card-title">{ user?.name }</h1>
					<p className="text-sm">ID # { employee?.id || 'Empty' }</p>
					<p>Register At: { employee ? toDateIndo(employee.hireDate) : 'Empty' }</p>
					<p>Status: { employeeStatus }</p>
				</div>

				<div>
					<p className="font-bold">Note:</p>
					{
						!employee?.statusEmployee.includes('Accept') &&
						errorArray.map((err, index) => (
							<p key={ index } className="text-error text-xs  italic">
								- { err.message }
							</p>
						)) }
				</div>

				<div className="card-actions">
					<Link
						href="/registration"
						className={ `btn btn-primary ${ hasEmployee ? 'btn-disabled' : '' }` }
					>
						Registration
					</Link>

					<UserEmployeeCVModal employee={ employee } />
					<UserEmployeeDocumentModal employee={ employee } />
					<EmployeeIDCardModal employee={ employee } />
					<EmployeeJobApplicationModal employee={ employee } />
				</div>
			</div>
		</div>
	);
}
