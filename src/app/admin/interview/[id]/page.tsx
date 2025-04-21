import { TContext } from "@/interface/server/param";
import { getContextParam } from "@/utils/requestHelper";
import { employeeRepository } from "@/server/controller";
import { EmptyData } from "@/app/components/PageErrorData";
import { FormInterview, InterviewShowCV, InterviewShowDocument } from "@/app/admin/interview/interview.client";
import { prisma } from "@/config/prisma";

export default async function Page(context: TContext) {
    const employeeId = await getContextParam(context, 'id')
    const employee = await employeeRepository.findById({ employeeId })
    const departments = await prisma.departements.findMany()

    if (!employee) {
        return <EmptyData page={ `Employee Detail ${ employeeId }` }/>
    }
    return (
        <div className={ 'space-y-4' }>
            <FormInterview employee={ employee } departments={ departments } />
            <div className="space-x-4">
                <InterviewShowCV employee={ employee }/>
                <InterviewShowDocument employee={ employee }/>
            </div>
        </div>
    );
}
