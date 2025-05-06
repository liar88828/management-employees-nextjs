'use client'
import { EmployeeUserClient } from "@/interface/entity/employee.model";

// export function Pagination({ totalPages, search, status, currentPage }: {
//     totalPages: number,
//     search: string,
//     status: string,
//     currentPage: number
// }) {
//     return (
//         <div className="flex justify-center mt-4 space-x-2">
//             { Array.from({ length: totalPages }, (_, i) => (
//                 <Link key={ i + 1 } href={ `/admin/inbox?search=${ search }&status=${ status }&currentPage=${ i + 1 }` }
//                       className={ `btn ${ currentPage === i + 1 ? 'btn-primary' : 'btn-outline' }` }
//                 >
//                     { i + 1 }
//                 </Link>
//             )) }
//         </div>
//     );
// }

export function InboxModalAction({ employees }: { employees: EmployeeUserClient }) {
    return ( <>
            <button className="btn" onClick={ () => {
                // @ts-ignore
                document.getElementById(`InboxModalAction${ employees.id }`).showModal()
            } }
            >open modal
            </button>
            <dialog id={ `InboxModalAction${ employees.id }` } className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{ employees.User.name }</h3>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */ }
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>

    )
}
