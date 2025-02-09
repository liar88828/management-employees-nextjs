import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import {
    EmployeeCVPageAdmin,
    EmployeeDetail,
    EmployeePhotoAdmin,
    EmployeePhotoPageAdmin
} from "../../../src/app/components/employee/employee.page";
import { employeeClientExample } from "../../../src/assets/employee.example";
import { uploadFile } from "../../../src/server/action/upload";

describe('Employee Test Components', async () => {

    test.skip("EmployeePhotoAdmin test",
        () => {
            render(<EmployeePhotoAdmin employee={ employeeClientExample }/>);
            expect(screen.getByText("Filter")).toBeInTheDocument();
            // expect(screen.getByText("Submit")).toBeInTheDocument();
        });

    test("EmployeeDetail test",
        () => {
            render(<EmployeeDetail employee={ employeeClientExample }/>);
            expect(screen.getByRole("heading", { level: 2, name: "John Doe" })).toBeDefined();
            expect(screen.getByText("johndoe@example.com")).toBeInTheDocument();
        });

    test("EmployeeDetail test ERROR",
        () => {
            render(<EmployeeDetail employee={ undefined }/>);
            expect(screen.getByText("Employee not found.")).toBeInTheDocument();
        });

    test("EmployeeCVPageAdmin test ",
        () => {
            render(<EmployeeCVPageAdmin
                employee={ employeeClientExample }
                isPrinting={ false }
                onPrintAction={ () => {
                } }

            />);
            expect(screen.getByText("John Doe")).toBeInTheDocument();
            expect(screen.getByText("Software Engineer")).toBeInTheDocument();
            expect(screen.getByText("Contact Information")).toBeInTheDocument();
        });

    test("EmployeePhotoPageAdmin test ",
        () => {
            render(<EmployeePhotoPageAdmin
                imagePreview={ null }
                type={ '3x4' }
                onChange={ () => {
                } }
                action={ async () => uploadFile({
                        id: "",
                        from: "", typeFile: "3x4"
                    }
                    , new FormData
                ) }
                employee={ employeeClientExample }

            />);
            expect(screen.getByRole("heading", { level: 2, name: "Add 3x4" })).toBeDefined();
            expect(screen.getByText("Submit")).toBeInTheDocument();
            expect(screen.getByText("Upload a file")).toBeInTheDocument();
        });

});
