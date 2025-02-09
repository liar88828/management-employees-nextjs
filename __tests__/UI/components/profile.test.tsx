import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProfileStatusCountPage, ProfileUserPage } from "../../../src/app/components/profile/profile.page";
import { userExampleComplete } from "../../../src/assets/user.example";

describe('profile Test Components', async () => {

    test("ProfileUserPage test",
        () => {
            render(<ProfileUserPage
                user={ userExampleComplete }>
                <h1>Hello Test</h1>
            </ProfileUserPage>);
            expect(screen.getByRole("heading", { level: 1, name: "Hello Test" })).toBeDefined();
            expect(screen.getByRole("heading", { level: 2, name: "John Doe" })).toBeDefined();
            expect(screen.getByText('John Doe')).toBeInTheDocument();
            expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
        });

    describe("ProfileUserPage test Component", async () => {
        test("ProfileStatusCountPage test",
            () => {
                render(<ProfileStatusCountPage
                    isStatus={ true }
                    countStatus={ 998 }
                    onStatusAction={ () => {
                    } }
                >
                    <h1>Hello Test</h1>
                </ProfileStatusCountPage>);
                expect(screen.getByRole("heading", { level: 1, name: "Hello Test" })).toBeDefined();
                expect(screen.getByText('998')).toBeInTheDocument();
                const button = screen.getByTestId('ProfileStatusCountPage-action');
                expect(button).toBeDefined()
                expect(button).toHaveClass("btn btn-square btn-active");
            });

        test("ProfileStatusCountPage test status ",
            () => {
                render(<ProfileStatusCountPage
                    isStatus={ false }
                    countStatus={ 998 }
                    onStatusAction={ () => {
                    } }
                >
                    <h1>Hello Test</h1>
                </ProfileStatusCountPage>);
                const button = screen.getByTestId('ProfileStatusCountPage-action');
                expect(button).toBeDefined()
                expect(button).toHaveClass("btn btn-square ");
            });

    })
});
