import CompanyClient from "@/app/admin/company/company.client";
import { prisma } from "@/config/prisma";

export default async function Page() {
    const company = await prisma.companys.findFirst()
    return <CompanyClient company={ company ?? undefined }/>
}
