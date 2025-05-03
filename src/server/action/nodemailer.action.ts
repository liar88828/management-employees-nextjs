'use server'
import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { transporter } from "@/config/nodemail";
import { LetterForm } from "@/assets/letter";
import { Companys } from "@/assets/company";
import { mailSendInterviewTemplate } from "@/server/lib/nodemail/sendTemplate";
import { mailOtpTemplate } from "@/server/lib/nodemail/otpTemplate";

export async function nodemailerSendRegister(
    employees: EmployeeUserClient[],
    company: Companys,
    letter: LetterForm
) {

    for await (const employee of employees) {
        const email = employee.User.email
        transporter.sendMail(mailSendInterviewTemplate(employee, company, letter), (error, info) => {
            if (error) {
                console.error(`Error sending ${ email } email: `, error);
            } else {
                console.log(`${ email } Email sent: `, info.response);
            }
        });
    }
}

export async function nodemailerSendOtp(otp: string, email: string) {
    transporter.sendMail(mailOtpTemplate(otp, email),
        (error, info) => {
            if (error) {
                console.log("Error sending email: ", error);
                throw error.message
            } else {
                console.log("Email sent: ", info.response);
            }
        });
}
