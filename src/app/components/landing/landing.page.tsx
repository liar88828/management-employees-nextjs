import Link from "next/link";
import Image from "next/image";

export function Header(
    { isLogin }:
    { isLogin: boolean }
) {
    return <header className="navbar bg-base-300 ">
        <div className="flex justify-between  w-full">
            <Link className="" href="/">
                <Image src="/my-logo.png" alt="Tahu Bakso Logo" width={ 100 } height={ 100 }/>
                {/* <span className="hidden font-bold sm:inline-block">Tahu Bakso Delights</span> */ }
            </Link>
            <div className="flex gap-2 sm:gap-5">

                <nav className="flex items-center  space-x-2 text-sm font-medium">
                    <a
                        className="transition-colors hover:text-foreground/80 text-foreground/60" href="#about">
                        About
                    </a>

                    <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#products">
                        Products
                    </a>

                    <a className="transition-colors hover:text-foreground/80 text-foreground/60"
                       href="#testimonials">
                        Testimonials
                    </a>

                    <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#contact">
                        Contact
                    </a>
                </nav>

                <Link
                    href={ "/admin" }
                    className="btn btn-outline btn-sm">
                    { isLogin ? 'Home' : 'Login' }
                </Link>
            </div>
        </div>
    </header>;
}

export function Hero() {
    return (
        <section className="py-5 text-center border-b">
            <div className="flex flex-col gap-5">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Discover the Delicious World of Tahu Bakso
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                    Savor the perfect blend of tofu and meatballs in every bite. Authentic Indonesian street food, now
                    at your fingertips.
                </p>
            </div>
            <div className="space-x-4 my-4">
                <Link
                    href={ '/product' }
                    className="btn ">
                    Order Now
                </Link>
                <Link
                    href={ '/home' }
                    className="btn btn-outline">
                    Learn More
                </Link>
            </div>
        </section>
    );
}

export function About() {
    return (
        <section id="about" className="mt-20">
            <h2 className="text-title">
                About Tahu Bakso
            </h2>
            <p className="mt-4 max-w-[700px] md:text-xl ">
                Tahu Bakso is a beloved Indonesian street food that combines the goodness of tofu with the savory taste
                of meatballs. Our recipe has been perfected over generations, bringing you an authentic taste of
                Indonesia&#39;s culinary heritage.
            </p>
        </section>
    );
}

export function ContactUs() {
    return (
        <section id="contact" className="card card-compact">
            <div className="card-body ">
                <h2 className="text-title ">
                    Contact Us
                </h2>
                <form className="grid grid-cols-1 space-y-2">
                    <div className="">
                        <input
                            className="input input-bordered w-full"
                            placeholder="Your Name"/>
                    </div>
                    <div className="">
                        <input
                            className="input input-bordered w-full"
                            placeholder="Your Email"/>
                    </div>
                    <div className="">
                        <textarea
                            className="textarea textarea-bordered w-full"
                            placeholder="Your Message">
                        </textarea>
                    </div>

                    <button type="submit"
                            className="w-full btn btn-outline">
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}

export function Footer() {
    return <footer className="bg-base-200 p-5">
        <div className=" text-center">
            <h2 className="text-2xl font-bold ">Bakso Istimewa</h2>
            <p className="mb-4">Jalan Raya Bandung No. 123, Indonesia</p>
            <p className="mb-6">📞 +62 812 3456 7890 | ✉️ info@baksoistimewa.com</p>
            <div className="flex justify-center space-x-4">
                <a href="#" className="hover:text-orange-200">Instagram</a>
                <a href="#" className="hover:text-orange-200">Facebook</a>
                <a href="#" className="hover:text-orange-200">WhatsApp</a>
            </div>
        </div>
        <div className="container px-4 md:px-6">

            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <p className="text-center text-sm">
                    © 2023 Tahu Bakso Delights. All rights reserved.
                </p>
                <nav className="flex gap-4">
                    <a className="text-sm"
                       href="#">
                        Privacy Policy
                    </a>
                    <a className="text-sm"
                       href="#">
                        Terms of Service
                    </a>
                </nav>
            </div>
        </div>
    </footer>;
}
