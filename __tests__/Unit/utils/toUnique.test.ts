import { describe, expect, test } from "vitest"
import { toUnique } from "../../../src/utils/toUnique";

describe('toUnique Tests Utils', () => {

    test("toUnique test", () => {
        const data = toUnique([ "test1", "test2" ], [ 'test2', "test3" ])
        expect(data).toEqual([ "test1", "test2", 'test3' ])
    })

    test("toUnique test Error", () => {
        const data = toUnique([ "test1", "test2" ], [ 'test2', "test3" ])
        // console.log(data)
        expect(data).not.toEqual([ "test1", "test2", "test2", 'test3' ])
        expect(data).toEqual([ "test1", "test2", 'test3' ])
    })

})
