import Link from "next/link";

function newURL(base: string, params: Record<string, any>) {
    const query = new URLSearchParams();

    for (const key in params) {
        if (params[key] !== undefined && params[key] !== null) {
            query.append(key, String(params[key]));
        }
    }

    return `${ base }?${ query.toString() }`;
}

export function PaginationComponent(
    {
        totalPages,
        search,
        status,
        page,
        title,
        department
    }: {
        totalPages: number,
        search: string,
        page: number,
        title: string,
        status?: string,
        department?: string
    }) {
    return (
        <div className="flex justify-center mt-4 space-x-2">
            { Array.from({ length: totalPages }, (_, i) => (
                <Link
                    key={ i + 1 }
                    href={ newURL(`/admin/${ title }`, {
                        search,
                        status,
                        page: i + 1,
                        department
                    }) }
                    className={ `btn ${ page === i + 1 ? 'btn-primary' : 'btn-outline' }` }
                >
                    { i + 1 }
                </Link>
            )) }
        </div>
    );
}
