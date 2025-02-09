import { About, ContactUs, Footer, Header, Hero, } from "@/app/components/landing/landing.page";
import { checkGuest } from "@/server/lib/db";
import { Ceremony, OurProducts } from "@/app/components/landing/landing.server";

export default async function HomePage() {
    const isLogin = await checkGuest()
    return <>
        <Header isLogin={ isLogin }/>
        <main className='container px-5'>
            <Hero/>
            <About/>
            <OurProducts/>
            <Ceremony/>
            <ContactUs/>
        </main>
        <Footer/>
    </>
}

