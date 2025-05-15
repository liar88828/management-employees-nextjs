import { TContext } from "@/interface/server/param";
import { EmptyData } from "@/app/components/PageErrorData";
import { InterviewShowCVGlobal } from "@/app/admin/interview/components/interviewShowCVGlobal";
import { InterviewShowDocument } from "@/app/admin/interview/components/interviewShowDocument";
import { InterviewForm } from "@/app/admin/interview/components/interviewForm";
import { employeeFindById } from "@/server/action/employee-admin.action";
import { getContextParam } from "@/utils/toRequest";

export default async function Page(context: TContext) {
    const employeeId = await getContextParam(context, 'id')
    const employee = await employeeFindById({ employeeId })
    // const positions = await prisma.positions.findMany()

    if (!employee) {
        return <EmptyData page={ `Employee Detail ${ employeeId }` } />
    }
    return (
        <div className={ 'space-y-4' }>
            <InterviewForm employee={ employee }
                // positions={ positions }
            />
            <div className="space-x-4">
                <InterviewShowCVGlobal employee={ employee } />
                <InterviewShowDocument employee={ employee } />
            </div>
        </div>
    );
}
