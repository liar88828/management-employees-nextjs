import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { Pagination } from "../../../src/app/components/pagination";

describe('Pagination Page Test Components', async () => {

    test("Pagination Fail test",
        () => {
            render(<Pagination
                totalPages={ 10 }
                page={ 100 }
            />)
            expect(screen.getByText('Page 100 of 10')).toBeInTheDocument();
            expect(screen.getByText('Previous')).toBeInTheDocument();
            expect(screen.getByText('Next')).toBeInTheDocument();

            const supportButtonPrev = screen.getByTestId("paginationLinkPrevious");
            const hrefPrev = supportButtonPrev.getAttribute("href");
            expect(hrefPrev).toBe("?page=99");
            //
            const supportButtonNext = screen.getByTestId("paginationLinkNext");
            const hrefNext = supportButtonNext.getAttribute("href");
            expect(hrefNext).toBe("?page=101");

        });

});
