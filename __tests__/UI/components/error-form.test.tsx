import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormError } from "../../../src/app/components/FormError";

describe('Error Form Test Components', async () => {

    test("FormError test",
        () => {
            render(<FormError
                errors={ [
                    'is test page',
                    'is value test'
                ] }
                title={ 'is title test page' }
            />)
            expect(screen.getByText('is title test page')).toBeInTheDocument();
            expect(screen.getByText('is value test')).toBeInTheDocument();
            expect(screen.getByText('is test page')).toBeInTheDocument();
        });
});
