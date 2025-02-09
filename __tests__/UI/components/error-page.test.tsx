import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
    EmptyData,
    PageEmptyData,
    PageErrorData,
    PageErrorDataTrolley
} from "../../../src/app/components/PageErrorData";
import { userEvent } from "@testing-library/user-event";
import mockRouter from "next-router-mock";
import { BackButton } from "../../../src/app/components/backButton";

vi.mock("next/navigation", () => require("next-router-mock"));

describe('Error Page Test Components', async () => {

    describe("PageErrorData Components Test ", async () => {
        test("PageErrorData test",
            () => {
                render(<PageErrorData
                    msg={ 'test page' }
                    code={ 999 }
                />);
                expect(screen.getByRole("heading", { level: 2, name: "Error 999" })).toBeDefined();
                expect(screen.getByText('test page')).toBeInTheDocument();
            });

        test('PageErrorData test Refresh', () => {
            // Set the initial url:
            mockRouter.push("/initial-path");

            // Render the component:
            render(<PageErrorData
                msg={ 'test page' }
                code={ 999 }
            />);

            const refresh = screen.getByTestId('PageErrorData-refresh');
            expect(refresh).toHaveTextContent('Reload');
            userEvent.click(refresh);
            expect(mockRouter).toMatchObject({
                asPath: "/initial-path",
                pathname: "/initial-path",
                query: {},
            });
        });

        test('PageErrorData test back', () => {
            // Set the initial url:
            mockRouter.push("/initial-path");

            // Render the component:
            render(<PageErrorData
                msg={ 'test page' }
                code={ 999 }
            />);

            const back = screen.getByTestId('PageErrorData-back');
            expect(back).toHaveTextContent('Back');
            userEvent.click(back);
            expect(mockRouter).toMatchObject({
                asPath: "/initial-path",
                pathname: "/initial-path",
                query: {},
            });
        });
    })

    test("PageErrorDataTrolley test",
        () => {
            render(<PageErrorDataTrolley/>);
            expect(screen.getByRole("heading", { level: 1, name: "0 Items" })).toBeDefined();
            expect(screen.getByText('Login')).toBeInTheDocument();
        });

    test("EmptyData test",
        () => {
            render(<EmptyData page={ 'test page Data Is Empty' }/>)
            expect(screen.getByRole("heading", { level: 2, name: "Error 404" })).toBeDefined();
            expect(screen.getByText('Error 404')).toBeInTheDocument();
            expect(screen.getByText('test page Data Is Empty Data Is Empty')).toBeInTheDocument();
            expect(screen.getByText('Reload')).toBeInTheDocument();
            expect(screen.getByText('Back')).toBeInTheDocument();
        });

    test("PageEmptyData test",
        () => {
            render(<PageEmptyData page={ 'test page Data Is Empty' }/>)
            expect(screen.getByRole("heading", { level: 2, name: "Error 404" })).toBeDefined();
            expect(screen.getByText('Error 404')).toBeInTheDocument();
            expect(screen.getByText('test page Data Is Empty Data Is Empty')).toBeInTheDocument();
            expect(screen.getByText('Reload')).toBeInTheDocument();
            expect(screen.getByText('Back')).toBeInTheDocument();
        });

    test('BackButton test back', () => {
        // Set the initial url:
        mockRouter.push("/initial-path");

        // Render the component:
        render(<BackButton/>);

        const back = screen.getByRole('button');
        expect(back).toBeDefined();
        userEvent.click(back);
        expect(mockRouter).toMatchObject({
            asPath: "/initial-path",
            pathname: "/initial-path",
            query: {},
        });
    });

});
