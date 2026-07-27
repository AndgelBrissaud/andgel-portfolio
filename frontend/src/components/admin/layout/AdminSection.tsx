import type { ReactNode } from "react";

import AdminCard from "../ui/AdminCard";

interface Props{

    title:string;

    subtitle?:string;

    children:ReactNode;

}

export default function AdminSection({

    title,

    subtitle,

    children

}:Props){

    return(

        <section

            className="
                space-y-6
            "

        >

            <div>

                <h2

                    className="
                        font-title
                        text-3xl
                    "

                >

                    {title}

                </h2>

                {

                    subtitle &&

                    <p

                        className="
                            mt-2
                            text-text-muted
                        "

                    >

                        {subtitle}

                    </p>

                }

            </div>

            <AdminCard>

                {children}

            </AdminCard>

        </section>

    );

}