import Link from 'next/link';
import { Pen, Plus } from "lucide-react";
import { TContext } from "@/interface/server/param";
import { getSearchName, getSearchNameNum } from "@/utils/requestHelper";
import { Pagination } from "@/app/components/pagination";
import TestimonialSearch, { DeleteTestimonial } from "@/app/admin/testimonial/deleteTestimonial";
import { ceremonyFindAll } from "@/server/action/testimonial";

export default async function Home(context: TContext) {
    const page = await getSearchNameNum(context, 'page') || 1
    const { profiles, totalPages } = await ceremonyFindAll({
        query: await getSearchName(context, 'query'),
        page
    })

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-4">Profiles</h1>
                <div className="flex justify-center gap-2">
                    <TestimonialSearch/>
                    <Link href="/admin/testimonial/create" className="btn btn-primary mb-4 btn-square join-item">
                        <Plus/>
                    </Link>
                </div>
            </div>
            <table className="table w-full">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Social</th>
                    <th>Jobs</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                { profiles.map((profile) => (
                    <tr key={ profile.id }>
                        <td>{ profile.name }</td>
                        <td>{ profile.desc }</td>
                        <td>{ profile.social }</td>
                        <td>{ profile.jobs }</td>
                        <td className={ 'flex gap-1' }>
                            <Link
                                href={ `/admin/testimonial/update/${ profile.id }` }
                                className="btn btn-sm btn-warning btn-square">
                                <Pen/>
                            </Link>
                            <DeleteTestimonial id={ profile.id }/>
                        </td>
                    </tr>
                )) }
                </tbody>
            </table>
            <Pagination page={ page } totalPages={ totalPages }/>
        </div>
    );
}

