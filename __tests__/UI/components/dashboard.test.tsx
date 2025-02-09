import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import {
    DashboardCustomerPage,
    DashboardOrderPage,
    DashboardProductPage,
    GridCardChild
} from "../../../src/app/components/dashboard/dashboard.page";
import { dataOrderTransactions, exampleReceiver } from "../../../src/assets/ExampleOrder";
import { productExample } from "../../../src/assets/product.example";

// vi.fn('useActionState')
describe('Dashboard Test Components', async () => {

    test("GridCardChild test",
        () => {
            render(<GridCardChild
                title={ 'test' }
                data={ { count: 2, totalAll: 100 } }
                classNames={ '' }
            />);
            expect(screen.getByRole("heading", { level: 2, name: "2" })).toBeDefined();
            expect(screen.getByRole("heading", { level: 1, name: "Rp 100" })).toBeDefined();
            expect(screen.getByText("This Mouth")).toBeInTheDocument();
            expect(screen.getByText("test")).toBeInTheDocument();
            expect(screen.getByText("2")).toBeInTheDocument();
        });

    test("DashboardOrderPage test",
        () => {
            render(<DashboardOrderPage
                orders={ dataOrderTransactions }
            />);
            expect(screen.getByRole("heading", { level: 2, name: "Top Order" })).toBeDefined();
            expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
        });

    test("DashboardCustomerPage test",
        () => {
            render(<DashboardCustomerPage customers={ [ exampleReceiver ] }/>);
            expect(screen.getByRole("heading", { level: 2, name: "Top Customers" })).toBeDefined();
            expect(screen.getByText("Alice Johnson")).toBeInTheDocument();
            // expect(screen.getByText("Purchase")).toBeInTheDocument();
        });

    test("DashboardProductPage test",
        () => {
            render(<DashboardProductPage products={ [ productExample ] }/>);
            expect(screen.getByRole("heading", { level: 2, name: "Recent Product" })).toBeDefined();
            expect(screen.getByText("Wireless Mouse")).toBeInTheDocument();
            // expect(screen.getByText("Purchase")).toBeInTheDocument();
        });

});
