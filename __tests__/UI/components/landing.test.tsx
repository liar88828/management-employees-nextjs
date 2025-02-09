import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { About, ContactUs, Footer, Header, Hero } from "../../../src/app/components/landing/landing.page";

describe('Landing Test Components', async () => {

    test("Header test",
        () => {
            render(<Header isLogin={ true }/>);
            expect(screen.getByText("About")).toBeInTheDocument();
            expect(screen.getByText("Products")).toBeInTheDocument();
            expect(screen.getByText("Testimonials")).toBeInTheDocument();
            expect(screen.getByText("Contact")).toBeInTheDocument();
            expect(screen.getByText("Home")).toBeInTheDocument();
        });

    test("Header test NOT LOGIN",
        () => {
            render(<Header isLogin={ false }/>);
            // expect(screen.getByRole("heading", { level: 1, name: "Invoice" })).toBeDefined();
            expect(screen.getByText("About")).toBeInTheDocument();
            expect(screen.getByText("Products")).toBeInTheDocument();
            expect(screen.getByText("Testimonials")).toBeInTheDocument();
            expect(screen.getByText("Contact")).toBeInTheDocument();
            expect(screen.getByText("Login")).toBeInTheDocument();
        });

    test("Hero test ",
        () => {
            render(<Hero/>);
            expect(screen.getByRole("heading", {
                level: 2,
                name: "Discover the Delicious World of Tahu Bakso"
            })).toBeDefined();
            expect(screen.getByText(
                "Savor the perfect blend of tofu and meatballs in every bite. Authentic Indonesian street food, now at your fingertips.")).toBeInTheDocument();
            expect(screen.getByText("Order Now")).toBeInTheDocument();
            expect(screen.getByText("Learn More")).toBeInTheDocument();
        });

    test("About test ",
        () => {
            render(<About/>);
            expect(screen.getByRole("heading", { level: 2, name: "About Tahu Bakso" })).toBeDefined();
        });

    test("ContactUs test ",
        () => {
            render(<ContactUs/>);
            expect(screen.getByRole("heading", { level: 2, name: "Contact Us" })).toBeDefined();
            expect(screen.getByText("Send Message")).toBeInTheDocument();
        });

    test("Footer test ",
        () => {
            render(<Footer/>);
            expect(screen.getByRole("heading", { level: 2, name: "Bakso Istimewa" })).toBeDefined();
            expect(screen.getByText("Jalan Raya Bandung No. 123, Indonesia")).toBeInTheDocument();
            expect(screen.getByText("📞 +62 812 3456 7890 | ✉️ info@baksoistimewa.com")).toBeInTheDocument();
            expect(screen.getByText("Instagram")).toBeInTheDocument();
            expect(screen.getByText("Facebook")).toBeInTheDocument();
            expect(screen.getByText("WhatsApp")).toBeInTheDocument();
            expect(screen.getByText("© 2023 Tahu Bakso Delights. All rights reserved.")).toBeInTheDocument();
            expect(screen.getByText("Privacy Policy")).toBeInTheDocument();
            expect(screen.getByText("Terms of Service")).toBeInTheDocument();
        });

});
