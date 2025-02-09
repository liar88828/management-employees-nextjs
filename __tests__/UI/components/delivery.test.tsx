import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { DeliveryCardPageAdmin, DeliveryDetailPageAdmin } from "../../../src/app/components/delivery/delivery.page";
import { deliveryExample } from "../../../src/assets/deliveryExample";

describe('Delivery Test Components', async () => {

    test("DeliveryCardPageAdmin test",
        () => {
            render(<DeliveryCardPageAdmin
                delivery={ deliveryExample }
                onClick={ async () => {
                } }
                goDetailAction={ () => {
                } }
            />);
            expect(screen.getByRole("heading", { level: 2, name: "Luxury Villa" })).toBeDefined();
            expect(screen.getByText("123 Palm Street, Beverly Hills, CA")).toBeInTheDocument();
        });

    test("DeliveryDetailPageAdmin test",
        () => {
            render(<DeliveryDetailPageAdmin delivery={ deliveryExample }/>);
            expect(screen.getByRole("heading", { level: 2, name: "Luxury Villa" })).toBeDefined();
            expect(screen.getByText("A stunning luxury villa with a private pool and garden.")).toBeInTheDocument();
            expect(screen.getByText("Real Estate")).toBeInTheDocument();
        });

});
