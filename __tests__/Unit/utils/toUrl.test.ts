import { describe, expect, test } from "vitest"
import { toParams, toUrl } from "../../../src/utils/toUrl";

describe('ToUrl Tests Utils', () => {

    test("toParams test", () => {
        const data = toParams({ test: 'hello' })
        expect(data).toEqual('?test=hello')
    })

    test("toUrl test", () => {
        const data = toUrl('my-api', { test: 'hello' })
        expect(data).toEqual('my-api?test=hello')
    })

})
