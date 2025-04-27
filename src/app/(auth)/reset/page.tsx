import ResetCheckOtp from "@/app/(auth)/reset/ResetCheckOtp";
import ResetCheckEmail from "@/app/(auth)/reset/ResetCheckEmail";
import ResetPassword from "@/app/(auth)/reset/ResetPassword";

export default function Reset() {
    return ( <section className={ 'grid grid-cols-1 gap-4 max-w-3xl w-full' }>
            <ResetCheckEmail />
            <ResetCheckOtp />
            <ResetPassword />
        </section>
    );
}
