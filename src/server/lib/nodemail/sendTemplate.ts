import { EmployeeUserClient } from "@/interface/entity/employee.model";
import { Companys } from "@/assets/company";
import { LetterForm } from "@/assets/letter";
import { toDateIndo } from "@/utils/toDate";

export function mailSendInterviewTemplate(
    employee: EmployeeUserClient,
    company: Companys,
    letter: LetterForm
) {
    const email = employee.User.email

    return {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "Registration Pudji Lestari Sentosa",
        text: `Registration Accept`,
        html:
            `

<div style="background-color: white; color: black; box-shadow: 0 4px 6px rgba(0,0,0,0.1); width: 210mm; height: 297mm; font-family: Arial, sans-serif; padding: 20px;">

    <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem;">
            <div style="display: flex; align-items: center;">
                <img
                    width="200"
                    height="100"
                    src='https://lh5.googleusercontent.com/proxy/WNYvDDCw16dcTt-lgCMpEro4gwq7KKxVwrx_t53ZwDTo7DBuqKpSfw0NWUSU8w0i3r7TDbSaUrRv_t7WTQMAt_z856hnYS6zF_w'
                    alt="logo"
                    style="margin: 8px;"
                />
                <div>
                    <h1 style="font-size: 24px; font-weight: bold;">${ company.name }</h1>
                    <p style="font-size: 14px;">${ company.address }</p>
                </div>
            </div>
            <div style="text-align: right; font-size: 14px;">
                <p>Telp: ${ company.phone }</p>
                <p>Email: ${ company.email }</p>
                <p>Jakarta, ${ toDateIndo(new Date()) }</p>
            </div>
        </div>

        <div style="margin-bottom: 2rem;">
            <p>Kepada Yth,</p>
            <p>Sdr/i. ${ employee.User.name }</p>
            <p>${ employee.address }</p>
        </div>

        <div style="margin-bottom: 2rem;">
            <p style="font-weight: bold;">Perihal: Undangan Interview</p>
        </div>

        <div style="margin-bottom: 2rem;">
            <p>Dengan hormat,</p>
            <p>
                Berdasarkan hasil seleksi administrasi yang telah kami lakukan, dengan ini kami mengundang
                Saudara/i untuk mengikuti proses interview yang akan dilaksanakan pada:
            </p>
            <div style="padding-left: 16px;">
                <p>Hari/Tanggal : ${ letter.interviewDay }, ${ letter.interviewDate }</p>
                <p>Waktu : ${ letter.interviewTime }</p>
                <p>Tempat : ${ letter.interviewLocation }</p>
                <p>Dress Code : ${ letter.dressCode }</p>
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

        <div style="margin-bottom: 2.5rem;">
            <p>Atas perhatian dan kehadirannya, kami ucapkan terima kasih.</p>
        </div>

        <div style="text-align: right;">
            <p style="margin-bottom: 4rem;">Hormat kami,</p>
            <p style="font-weight: bold;">${ letter.signerName }</p>
            <p>HRD Manager</p>
            <p>PT. ${ company.name }</p>
        </div>
    </div>
</div>

                `,
    };
}
