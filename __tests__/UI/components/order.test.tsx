import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { OrderDetailAdmin } from "../../../src/app/components/order/order.page";
import { dataOrderTransactions } from "../../../src/assets/ExampleOrder";

describe('Order Test Components', async () => {

    test("OrderDetailAdmin test",
        () => {
            render(<OrderDetailAdmin
                isPrinting={ false }
                id={ '' }
                contentRef={ null }
                isPending={ false }
                handleDeleteAction={ () => {
                } }
                handlePrintAction={ () => {
                } }
                order={ dataOrderTransactions[0] }
            />)
            expect(screen.getByRole("heading", {
                level: 1,
                name: "Invoice #712ec142-b620-4315-8571-877c84634642"
            })).toBeDefined();
            expect(screen.getByText('Alice Johnson')).toBeInTheDocument();

        });
});
