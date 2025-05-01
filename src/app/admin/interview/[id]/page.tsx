import { TContext } from "@/interface/server/param";
import { getContextParam } from "@/utils/requestHelper";
import { employeeRepository } from "@/server/controller";
import { EmptyData } from "@/app/components/PageErrorData";
import { prisma } from "@/config/prisma";
import { InterviewShowCVGlobal } from "@/app/admin/interview/components/interviewShowCVGlobal";
import { InterviewShowDocument } from "@/app/admin/interview/components/interviewShowDocument";
import { InterviewForm } from "@/app/admin/interview/components/interviewForm";

export default async function Page(context: TContext) {
    const employeeId = await getContextParam(context, 'id')
    const employee = await employeeRepository.findById({ employeeId })
    const positions = await prisma.positions.findMany()

    if (!employee) {
        return <EmptyData page={ `Employee Detail ${ employeeId }` }/>
    }
    return (
        <div className={ 'space-y-4' }>
            <InterviewForm employee={ employee } positions={ positions } />
            <div className="space-x-4">
                <InterviewShowCVGlobal employee={ employee } />
                <InterviewShowDocument employee={ employee }/>
            </div>
        </div>
    );
}
