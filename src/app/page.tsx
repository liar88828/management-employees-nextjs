import { redirect } from "next/navigation";
//
// export default async function HomePage() {
//     const isLogin = await getSession()
//     return <>
//         <Header isLogin={ isLogin }/>
//         <main className='container px-5'>
//             <Hero/>
//             <About/>
//             <OurProducts/>
//             <Ceremony/>
//             <ContactUs/>
//         </main>
//         <Footer/>
//     </>
// }
//
export default async function HomePage() {
    // const isLogin = await getSession()
    redirect('/login')
    return <div>Will redirect</div>
}
