import { i3x4, ijazah, ktp, TEmployeeDB } from "@/interface/entity/employee.model";
import Image from "next/image";
import React from "react";

export function EmployeePhotos({ employee }: { employee: TEmployeeDB }) {
    return (
        <div className="card card-body  bg-white items-center sm:items-start max-w-4xl">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-5">

                <section>
                    <h3 className="font-semibold mb-2">Ktp</h3>
                    <Image src={ employee?.photoKtp ?? ktp }
                           alt="image ktp"
                           width={ 300 }
                           height={ 400 }
                        // className={ "aspect-[4/3] " }
                    />
                </section>

                <section>
                    <h3 className="font-semibold mb-2">Photo 4x6</h3>
                    <Image src={ employee.photoKtp ?? i3x4 }
                           alt=""
                           width={ 300 }
                           height={ 400 }
                        // className={ "aspect-[4/6] " }
                    />
                </section>

                <section>
                    <h3 className="font-semibold mb-2">Ijazah</h3>
                    <Image
                        src={ employee?.photoIjasah ?? ijazah }
                        alt="image ktp"
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