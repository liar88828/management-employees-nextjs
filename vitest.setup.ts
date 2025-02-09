import '@testing-library/jest-dom'
import { beforeAll, vi } from "vitest";

beforeAll(() => {
    vi.mock("next/router", () => require("next-router-mock"));
    vi.mock("next/navigation", () => require("next-router-mock"));
    // vi.mock("next/navigation", () => {
    //     const actual = vi.importActual("next/navigation");
    //     return {
    //         ...actual,
    //         ...require("next-router-mock"),
    //         useRouter: vi.fn(() => ({
    //             push: vi.fn(),
    //         })),
    //         useSearchParams: vi.fn(() => ({
    //             get: vi.fn(),
    //         })),
    //         usePathname: vi.fn(),
    //     };
    // });

})