import { photoIjazah, photoKtp, TEmployeeDB } from "@/interface/entity/employee.model";
import Image from "next/image";
import React from "react";
import { url_fastapi } from "@/config/nextPublicBaseUrl";

export function EmployeePhotos({ employee }: { employee: TEmployeeDB }) {
    const isPhotoKtp = employee?.photoKtp ? `${ url_fastapi }${ employee?.photoKtp }` : photoKtp
    const isPhotoIjazah = employee?.photoIjazah ? `${ url_fastapi }${ employee?.photoIjazah }` : photoIjazah
    return (
        <div className="card card-body  bg-white items-center sm:items-start max-w-4xl">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">

                <section>
                    <h3 className="font-semibold mb-2">Ktp</h3>
                    <Image src={ isPhotoKtp }
                           alt="image photoKtp"
                           width={ 300 }
                           height={ 400 }
                        // className={ "aspect-[4/3] " }
                    />
                </section>
                <section>
                    <h3 className="font-semibold mb-2">Ijazah</h3>
                    <Image
                        src={ isPhotoIjazah }
                        alt="image photoKtp"
                        width={ 3000 }
                        height={ 4000 }
                        // className={
                        //     // "w-[21cm] h-[33cm]"
                        //     'aspect-[3/4]'
                        // }
                    />
                </section>
            </div>
        </div>
    );
}
