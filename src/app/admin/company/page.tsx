import CompanyClient from "@/app/admin/company/company.client";
import { prisma } from "@/config/prisma";
import { CompanyFormSchemaType } from "@/schema/company.valid";

export default async function Page() {
    const company = await prisma.companys.findFirst({
        include: {
            Visi: true,
            Misi: true
        }

    }).then((item): CompanyFormSchemaType | undefined => {
        if (!item) {
            return undefined;
        }

        const misi = item.Misi.map(({ text }) => ({ text }))
        const visi = item.Visi.map(({ text }) => ({ text }))

        const { Misi, Visi, ...data } = {
            ...item,
            misi: misi,
            visi: visi
        }
        return data
    });
    console.log('CompanyClient : company', company)
    return <CompanyClient company={ company }/>
}
