import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { CategoryList } from "../../../src/app/components/home/home.page";
import { menuData } from "../../../src/assets/MenuList";

describe('Home Test Components', async () => {

    test("CategoryList test",
        () => {
            render(<CategoryList
                onClick={ () => {
                } }
                item={ menuData[0] }
            />);
            expect(screen.getByRole("heading", { level: 2, name: "Product" })).toBeDefined();

        });
});
