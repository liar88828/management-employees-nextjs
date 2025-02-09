import { describe, expect, test } from "vitest"
import { employeeCreateClient, employeeCreateServer } from "../../../src/validation/employee.valid";
import { employeeClientExample, employeeServerExample } from "../../../src/assets/employee.example";

describe('Employee Tests Validation', () => {

    test.skip("employee client validation", () => {
        const data = employeeCreateClient.parse(employeeClientExample)
        expect(data).toEqual(employeeClientExample)
    })

    test("employee server validation", () => {
        const data = employeeCreateServer.parse(employeeServerExample)
        expect(data).toEqual(employeeServerExample)
    })

})
