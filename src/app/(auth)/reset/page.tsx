import ResetPassword from "@/app/(auth)/reset/reset-password";
import CheckEmail from "@/app/(auth)/reset/check-email";
import CheckOtp from "@/app/(auth)/reset/check-otp";

export default function Reset() {
    return ( <section className={ 'grid grid-cols-1 gap-4 max-w-3xl w-full' }>
            <CheckEmail />
            <CheckOtp />
            <ResetPassword />
        </section>
    );
}
