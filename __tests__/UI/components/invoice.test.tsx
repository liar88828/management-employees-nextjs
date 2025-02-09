import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { InvoicePaper } from "../../../src/app/components/invoice/invoice.page";
import { dataOrderTransactions } from "../../../src/assets/ExampleOrder";

describe('Invoice Test Components', async () => {

    test("InvoicePaper test",
        () => {
            render(<InvoicePaper
                invoice={ dataOrderTransactions[0] }
                path={ '' }

            />);
            expect(screen.getByRole("heading", { level: 1, name: "Invoice" })).toBeDefined();
            expect(screen.getByText("Invoice ID:")).toBeInTheDocument();
            expect(screen.getByText("#712ec142-b620-4315-8571-877c84634642")).toBeInTheDocument();

            expect(screen.getByText("Payment Details")).toBeInTheDocument();
            expect(screen.getByText("Alice Johnson")).toBeInTheDocument();

            expect(screen.getByText("Payment Details")).toBeInTheDocument();
            expect(screen.getByText("mandiri")).toBeInTheDocument();

            expect(screen.getByText("Delivery Details")).toBeInTheDocument();
            expect(screen.getByText("Astra Holt")).toBeInTheDocument();

            expect(screen.getByText("Delivery Fee:")).toBeInTheDocument();
            expect(screen.getByText("PPN: 12%")).toBeInTheDocument();
            expect(screen.getByText("Status: Completed")).toBeInTheDocument();
        });
});
