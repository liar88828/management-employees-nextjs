import Link from "next/link";
import { productNew } from "@/server/network/product";
import { PageLoadingSpin } from "@/app/components/LoadingData";
import { PageEmptyData } from "@/app/components/PageErrorData";
import { testimonialLandingPage } from "@/server/action/testimonial";

export async function OurProducts() {
    const products = await productNew({
        filter: { popular: true, },
        pagination: { limit: 3 }
    })
    if (!products.data) {
        return <PageLoadingSpin/>
    }

    if (products.data.data.length === 0) {
        return <PageEmptyData page={ 'Please Input Product' }/>
    }

    return (
        <section id="products" className='mt-20'>
            <h2 className="text-title">Our Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
                { products.data.data.map((product, index) => (
                    <div key={ index } className='card card-compact'>
                        <div className=" card-body">
                            {/* eslint-disable-next-line @next/next/no-img-element */ }
                            <img
                                src={ `https://picsum.photos/300/200?random=${ index }` }
                                alt={ product.name }
                                className="rounded-md object-cover w-full"
                            />
                            <h3 className="card-title">{ product.name }</h3>
                            <p className="">
                                { product.desc }
                            </p>
                            <div className="card-actions">
                                <Link
                                    href={ `/product/${ product.id }` }
                                    className="w-full btn btn-outline ">
                                    Order Now
                                </Link>
                            </div>
                        </div>
                    </div>
                )) }
            </div>
        </section>
    );
}

export async function Ceremony() {
    const testimonials = await testimonialLandingPage()

    return (
        <section id="testimonials" className="card card-compact mt-20 ">
            <div className="card-body   ">
                <h2 className="text-title"> Customers Say </h2>
                <div className="grid grid-cols-1 space-y-2">
                    { testimonials.map((testimonial, index) => (
                        <div
                            key={ testimonial.id }
                            className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                &#34;{ testimonial.desc }&#34;
                            </p>
                            <p className="font-bold">{ testimonial.name }</p>
                        </div>
                    )) }
                </div>
            </div>
        </section>

    );
}