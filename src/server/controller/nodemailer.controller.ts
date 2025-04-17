'use server'
import nodemailer from "nodemailer";
import { EmployeeUserClient } from "@/interface/entity/employee.model";

export async function nodemailerSendRegister(employees: EmployeeUserClient[]) {

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASS,
        },
    });
    for await (const employee of employees) {
        const email = employee.User.email
        const mailOptions = {
            from: process.env.NODEMAILER_EMAIL,
            to: email,
            subject: "🚀 Hello from Nodemailer!",
            text: `Registration Accept`,
            html:
                `
       <div style="background-color: white; color: black; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 210mm; height: 297mm; font-family: Arial, sans-serif; padding: 20px;">
            <div>
                {/* Company Letterhead */}
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
                    <div style="display: flex; align-items: center;">
                        <img
                            width="100"
                            height="100"
                            src={company.img ?? imageDefault}
                            alt="logo"
                            style="margin: 8px;"
                        />
                        <div>
                            <h1 style="font-size: 24px; font-weight: bold;">{company.name}</h1>
                            <p style="font-size: 14px;">{company.address}</p>
                        </div>
                    </div>
                    <div style="text-align: right; font-size: 14px;">
                        <p>Telp: {company.phone}</p>
                        <p>Email: {company.email}</p>
                        <p>Jakarta, {toDateIndo(new Date())}</p>
                    </div>
                </div>
        
                {/* Recipient's Address */}
                <div style="margin-bottom: 2rem;">
                    <p>Kepada Yth,</p>
                    <p>Sdr/i. {employee.User.name}</p>
                    <p>{employee.address}</p>
                </div>
        
                {/* Subject */}
                <div style="margin-bottom: 2rem;">
                    <p style="font-weight: bold;">Perihal: Undangan Interview</p>
                </div>
        
                {/* Letter Body */}
                <div style="margin-bottom: 2rem;">
                    <p>Dengan hormat,</p>
                    <p>
                        Berdasarkan hasil seleksi administrasi yang telah kami lakukan, dengan ini kami mengundang
                        Saudara/i untuk mengikuti proses interview yang akan dilaksanakan pada:
                    </p>
                    <div style="padding-left: 16px;">
                        <p>Hari/Tanggal : {form.interviewDay}, {form.interviewDate}</p>
                        <p>Waktu : {form.interviewTime}</p>
                        <p>Tempat : {form.interviewLocation}</p>
                        <p>Dress Code : {form.dressCode}</p>
                    </div>
                    <p>Mohon untuk membawa dokumen berikut:</p>
                    <ul style="padding-left: 32px; list-style-type: disc;">
                        <li>Fotokopi KTP</li>
                        <li>Curriculum Vitae (CV) terbaru</li>
                        <li>Pas foto terbaru ukuran 4x6 (2 lembar)</li>
                        <li>Fotokopi ijazah dan transkrip nilai terakhir</li>
                    </ul>
                    <p>
                        Jika ada perubahan atau Anda tidak dapat hadir pada waktu yang telah ditentukan, mohon
                        segera menghubungi kami di nomor telepon yang tertera di atas.
                    </p>
                </div>
        
                {/* Closing */}
                <div style="margin-bottom: 2.5rem;">
                    <p>Atas perhatian dan kehadirannya, kami ucapkan terima kasih.</p>
                </div>
        
                {/* Signature */}
                <div style="text-align: right;">
                    <p style="margin-bottom: 4rem;">Hormat kami,</p>
                    <p style="font-weight: bold;">{form.signerName}</p>
                    <p>HRD Manager</p>
                    <p>PT. {company.name}</p>
                </div>
            </div>
        </div>
                `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(`Error sending ${ email } email: `, error);
            } else {
                console.log(`${ email } Email sent: `, info.response);
            }
        });
    }
}
