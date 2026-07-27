import { Link } from "react-router-dom";


type ButtonProps = {

    children: React.ReactNode;

    to?: string;

    href?: string;

    variant?: "primary" | "secondary";

    className?: string;

};





export default function Button({

    children,

    to,

    href,

    className=""

}:ButtonProps){



    const style = `

        group

        relative

        inline-flex

        items-center

        justify-center

        h-14

        px-12

        overflow-hidden

        border

        border-white/15

        bg-[#0b0d10]

        text-sm

        uppercase

        tracking-[0.3em]

        text-white

        transition-all

        duration-500

        hover:border-white/40

        hover:-translate-y-1

        shadow-[0_20px_60px_rgba(0,0,0,.5)]

        ${className}

    `;



    const content=(

        <>


            {/* lumière qui traverse */}

            <span

                className="

                    absolute

                    inset-0

                    -translate-x-full

                    bg-gradient-to-r

                    from-transparent

                    via-white/10

                    to-transparent

                    transition-transform

                    duration-1000

                    group-hover:translate-x-full

                "

            />





            {/* contour lumineux */}

            <span

                className="

                    absolute

                    inset-0

                    opacity-0

                    transition-opacity

                    duration-500

                    group-hover:opacity-100

                    border

                    border-[#d8b56a]

                "

            />





            <span

                className="

                    relative

                    z-10

                    transition-colors

                    duration-500

                    group-hover:text-[#d8b56a]

                "

            >

                {children}

            </span>


        </>

    );




    if(to){

        return (

            <Link

                to={to}

                className={style}

            >

                {content}

            </Link>

        );

    }





    if(href){

        return (

            <a

                href={href}

                className={style}

            >

                {content}

            </a>

        );

    }




    return (

        <button className={style}>

            {content}

        </button>

    );


}