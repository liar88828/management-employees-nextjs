import { describe, expect, test } from "vitest"
import { UserCreate } from "../../../src/validation/user.valid";
import { userExample } from "../../../src/assets/user.example";

describe('Test user validation', () => {

    test("user valid test SUCCESS", () => {
        const data = UserCreate.safeParse(userExample)
        expect(data.data).toEqual(userExample)
    })

})
