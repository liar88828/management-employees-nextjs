'use client'
import React from "react";
import { ImageStream } from "@/app/components/imageStream";
import { employeeServerExample } from "@/assets/employee.example";

function Page() {

    return (
        <ImageStream
            employee={ employeeServerExample }
            classNames={ '' }
            filename={ '/images/f54ad6d8-553b-4a20-90af-7b53052251b1_Febrian Alif Hermawan_KTP.jpg.enc' }
        /> );
}

export default Page;
