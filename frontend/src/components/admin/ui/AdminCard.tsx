import type { ReactNode } from "react";

interface Props{

    children: ReactNode;

}

export default function AdminCard({

    children

}:Props){

    return(

        <div

            className="
                rounded-3xl
                border
                border-white/10
                bg-surface
                p-8
                shadow-shadow-soft
            "

        >

            {children}

        </div>

    );

}