import Link from 'next/link';
import { DeleteTestimonial, TestimonialSearch } from "@/app/admin/testimonial/deleteTestimonial";
import { Pen } from "lucide-react";
import { TContext } from "@/interface/server/param";
import { getContextQuery, getSearchNameNum } from "@/utils/requestHelper";
import { Pagination } from "@/app/components/pagination";
import { ceremonyFindAll } from "@/server/action/testimonial";

export default async function Home(context: TContext) {
    const page = await getSearchNameNum(context, 'page')
    const query = await getContextQuery(context, 'query')
    const { profiles, totalPages } = await ceremonyFindAll({
        query,
        page
    })

    return (
        <div>
            <TestimonialSearch query={ query }/>
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

