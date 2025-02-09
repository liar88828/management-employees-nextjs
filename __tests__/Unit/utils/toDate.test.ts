import { describe, expect, test } from "vitest"
import {
    addDays,
    defaultDate,
    getDates,
    getKirim,
    getTime,
    toDate,
    toDateIndo,
    today
} from "../../../src/utils/toDate";

describe('toDate Tests Utils', () => {
    describe('toDate', () => {
        test("toDate test", () => {
            const dateTest = new Date("2024-12-04T15:30:00Z")
            const data = toDate(dateTest)
            expect(data).toEqual('04/12/2024')
        })
        test("toDateIndo test", () => {
            const dateTest = new Date("2024-12-04T15:30:00Z")
            const data = toDateIndo(dateTest)
            expect(data).toEqual('Rabu, 04 Desember 2024')
        })
    })

    describe('old', () => {
        test("getKirim test", () => {
            const dateTest = new Date("2024-12-04T15:30:00Z")
            const data = getKirim(dateTest)
            expect(data).toBeTypeOf('object')
        })

        test("defaultDate test", () => {
            const data = defaultDate()
            expect(data).toBeTypeOf('string')
        })

        test("getDates test", () => {
            const data = getDates('full', 200)
            expect(data).toBeTypeOf('string')
        })

        describe('getTime test fun', () => {

            test("getTime test", () => {
                const data = getTime(true)
                expect(data).toBeTypeOf('string')
            })

            test("getTime test", () => {
                const data = getTime(false)
                expect(data).toBeTypeOf('string')
            })
        })

        test("today test", () => {
            expect(today).toBeTypeOf('number')
        })

        test("addDays test", () => {
            expect(addDays(22)).toBeTypeOf('object')
        })



    })

})
