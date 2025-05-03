export const mailOtpTemplate = (otp: string, email: string) => {
    return {
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "Validate Otp Cv Pudji Lestari Sentosa",
        text: `Your OTP is: ${ otp }`,
        html:
            `<div>
     <div style="max-width: 500px; margin: auto; padding: 20px; font-family: Arial, sans-serif;  background-color: #f8f9fa; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1); text-align: center; color: #343a40;">
         <h2 style="color: #007BFF; margin-bottom: 10px;">🔐 OTP Verification</h2>
         <p style="font-size: 1.1rem; margin-bottom: 20px;">Hello from <strong>Cv Pudji Lestari Sentosa</strong> 🎉</p>
    
              <div style="display: inline-block; background-color: #fff; padding: 15px 30px; border-radius: 8px; border: 1px solid #e0e0e0; box-shadow: inset 0 1px 3px rgba(0,0,0,0.05);">

            <p style="margin: 0; font-size: 1rem; color: #6c757d;">Your One-Time Password (OTP) is:</p>
            <p style="font-size: 2rem; font-weight: bold; color: #28a745; margin: 10px 0;">${ otp }</p>
         </div>
    
         <p style="font-size: 0.95rem; color: #6c757d; line-height: 1.5;">
            Please enter this code to proceed. <br>
            If you didn't request this, you can safely ignore this email.
         </p>
    
         <hr style="border: none; border-top: 1px solid #dee2e6; margin: 30px 0;">
         <p style="font-size: 0.8rem; color: #adb5bd;">Thank you for using our service 🙌</p>
    </div>
</div>
            

    `,
    };
}
