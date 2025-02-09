import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { PaymentCardPageAdmin, PaymentDetailPageAdmin } from "../../../src/app/components/payment/payment.page";
import { paymentExample } from "../../../src/assets/ExamplePayment";

describe('Payment Test Components', async () => {

    test("PaymentCardPageAdmin test",
        () => {
            render(<PaymentCardPageAdmin
                onDeleteAction={ async () => {
                } }
                payment={ paymentExample }
            />);
            expect(screen.getByRole("heading", { level: 2, name: "mandiri" })).toBeDefined();
            expect(screen.getByText('0123 1239 1231')).toBeInTheDocument();
            expect(screen.getByText('082123123123')).toBeInTheDocument();
        });

    test("PaymentDetailPageAdmin test",
        () => {
            render(<PaymentDetailPageAdmin
                payment={ paymentExample }
            />);
            expect(screen.getByRole("heading", { level: 2, name: "mandiri" })).toBeDefined();
            expect(screen.getByText('Kredit')).toBeInTheDocument();
            expect(screen.getByText('orak jelas')).toBeInTheDocument();
        });

});
