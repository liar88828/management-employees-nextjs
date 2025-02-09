import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { TrolleyExamples } from "../../../src/assets/ExampleOrder";
import { TrolleyCardPageUser, TrolleyDropDownPageUser } from "../../../src/app/components/trolley/trolley.page";

describe('Trolley Test Components', async () => {

    test("TrolleyCardPageUser test",
        () => {
            render(<TrolleyCardPageUser
                trolley={ TrolleyExamples[0] }
                isTrolleyIncluded={ false }
                onDecrementAction={ () => {
                } }
                onIncrementAction={ () => {
                } }
                onRemoveAction={ () => {
                } }
                onSelectAction={ () => {
                } }
            />)
            expect(screen.getByRole("heading", {
                level: 1,
                name: "tahu ayam"
            })).toBeDefined();

            expect(screen.getByRole("heading", {
                level: 2,
                name: "1"
            })).toBeDefined();
            expect(screen.getByText('orderan')).toBeInTheDocument();
            expect(screen.getByText('Rp 20.000')).toBeInTheDocument();
        });

    test("TrolleyDropDownPageUser test",
        () => {
            render(<TrolleyDropDownPageUser
                count={ 0 }
                total={ 0 }
                hrefAction={ () => {
                } }
            />)
            expect(screen.getByText('0 Items')).toBeInTheDocument();
            expect(screen.getByText('View cart')).toBeInTheDocument();
        });

});
