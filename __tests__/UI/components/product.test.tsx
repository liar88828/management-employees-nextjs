import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import {
    ProductCardPageAdmin,
    ProductCardPageUser,
    ProductDetailPageAdmin,
    ProductDetailPageUser
} from "../../../src/app/components/product/product.page";
import { productExampleComplete } from "../../../src/assets/product.example";

describe('Product Test Components', async () => {

    test("ProductCardPageUser test",
        () => {
            render(<ProductCardPageUser
                isLogin={ true }
                product={ productExampleComplete }
                detailProductAction={ () => {
                } }
                addTrolleyAction={ () => {
                } }
            />);
            expect(screen.getByRole("heading", { level: 2, name: "tahu baxo" })).toBeDefined();
            expect(screen.getByText('orderan')).toBeInTheDocument();
        });

    test("ProductCardPageAdmin test",
        () => {
            render(<ProductCardPageAdmin
                product={ productExampleComplete }
                onDeleteAction={ async () => {
                } }
            />);
            expect(screen.getByRole("heading", { level: 2, name: "tahu baxo" })).toBeDefined();
            expect(screen.getByText('qty: 86')).toBeInTheDocument();
            expect(screen.getByText('orderan')).toBeInTheDocument();
        });

    test("ProductDetailPageAdmin test",
        () => {
            render(<ProductDetailPageAdmin
                hrefUpdateAction={ () => {
                } }
                onAddStockAction={ async () => {
                } }
                onChangeAction={ () => {
                } }
                product={ productExampleComplete }
                onDeleteAction={ async () => {
                } }
            />);
            expect(screen.getByRole("heading", { level: 2, name: "tahu baxo" })).toBeDefined();
            expect(screen.getByText('Type: orderan')).toBeInTheDocument();
            expect(screen.getByText('Location: Semarang')).toBeInTheDocument();
            expect(screen.getByText('Available Quantity: 86')).toBeInTheDocument();
            expect(screen.getByText('Add Stock')).toBeInTheDocument();
            expect(screen.getByText('Update')).toBeInTheDocument();
            expect(screen.getByText('Delete')).toBeInTheDocument();
        });

    test("ProductDetailPageUser test",
        () => {
            render(<ProductDetailPageUser product={ productExampleComplete }>
                <h1>Hello Test</h1>
            </ProductDetailPageUser>);
            expect(screen.getByRole("heading", { level: 2, name: "tahu baxo" })).toBeDefined();
            expect(screen.getByText('Type: orderan')).toBeInTheDocument();
            expect(screen.getByText('Location: Semarang')).toBeInTheDocument();
            expect(screen.getByText('Stock: 86')).toBeInTheDocument();
            expect(screen.getByText('Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s')).toBeInTheDocument();
        });

});
