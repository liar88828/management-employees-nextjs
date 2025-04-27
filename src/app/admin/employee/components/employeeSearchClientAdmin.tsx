import Form from "next/form";
import { employeeListStatus } from "@/interface/enum";
import { Search } from "lucide-react";

export function EmployeeSearchClientAdmin({ search, status }: {
    search: string,
    status: string,
}) {
    return (
        <div className="flex justify-between gap-2">
            <Form action={ '/admin/employee' } className="join w-full">
                <input
                    type="text"
                    className={ 'input input-bordered join-item w-full' }
                    name={ 'search' }
                    defaultValue={ search }
                />
                <select className="select select-bordered join-item w-fit"
                        defaultValue={ status }
                        name={ 'status' }
                >
                    <option disabled value={ '' }>Filter</option>
                    {/*<option value={ '' }>All</option>*/ }
                    { employeeListStatus.map(item => (
                        <option key={ item }>{ item }</option>
                    )) }
                </select>

                <button className={ 'btn join-item ' }><Search /></button>

            </Form>
            {/*<Link href={ '/admin/employee/create' } className={ 'btn btn-square' }>*/ }
            {/*    <Plus />*/ }
            {/*</Link>*/ }
        </div>
    );
}
