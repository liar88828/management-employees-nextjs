import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { LoadingData, LoadingDataList, LoadingSpin, PageLoadingSpin } from "../../../src/app/components/LoadingData";

describe('Loading Page Test Components', async () => {

    test("LoadingData test",
        () => {
            render(<LoadingData/>)
            expect(screen.getByTestId('LoadingData')).toBeInTheDocument();
        });

    test("LoadingDataList test",
        () => {
            render(<LoadingDataList/>)
            expect(screen.getByTestId('LoadingDataList')).toBeInTheDocument();
        });

    test("PageLoadingSpin test",
        () => {
            render(<PageLoadingSpin/>)
            expect(screen.getByTestId('PageLoadingSpin')).toBeInTheDocument();
        });

    test("LoadingSpin test",
        () => {
            render(<LoadingSpin/>)
            expect(screen.getByTestId('LoadingSpin')).toBeInTheDocument();
        });
});
