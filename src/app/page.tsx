import { About, ContactUs, Footer, Header, Hero, } from "@/app/components/landing/landing.page";
import { getSession } from "@/secure/db";
import { Ceremony, OurProducts } from "@/app/components/landing/landing.server";

export default async function HomePage() {
    const isLogin = await getSession()
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

