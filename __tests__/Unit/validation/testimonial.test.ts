import { describe, expect, test } from "vitest"
import { testimonialSchema } from "../../../src/validation/testimonial.valid";
import { testimonialExample } from "../../../src/assets/testimonial.example";

describe('Testimonial Tests Validation', () => {

    test("testimonialSchema validation", () => {
        const data = testimonialSchema.parse(testimonialExample)
        expect(data).toEqual(testimonialExample)
    })

})
