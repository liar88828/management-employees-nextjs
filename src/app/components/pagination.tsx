import Link from "next/link";

export function Pagination(props: { page: number, totalPages: number }) {
    return (
        <div className="flex justify-between items-center mt-4">
            <Link
                data-testid="paginationLinkPrevious"
                href={ `?page=${ props.page - 1 }` }
                className={ `btn btn-secondary ${ props.page <= 1 && "btn-disabled" }` }
            >
                Previous
            </Link>
            <span>
                Page { props.page } of { props.totalPages }
            </span>
            <Link
                data-testid="paginationLinkNext"
                href={ `?page=${ props.page + 1 }` }
                className={ `btn btn-secondary ${ props.page >= props.totalPages && "btn-disabled " }` }
            >
                Next
            </Link>
        </div>
    );
}