import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";


export default function Navbar() {


    const [scrolled, setScrolled] = useState(false);

    const [open, setOpen] = useState(false);



    useEffect(() => {


        const handleScroll = () => {

            setScrolled(window.scrollY > 50);

        };


        window.addEventListener(
            "scroll",
            handleScroll
        );


        return () => {

            window.removeEventListener(
                "scroll",
                handleScroll
            );

        };


    }, []);





    const links = [

        {
            label:"Accueil",
            path:"/"
        },

        {
            label:"À propos",
            path:"/about"
        },

        {
            label:"Projets",
            path:"/projects"
        },

        {
            label:"Photographie",
            path:"/photography"
        },

        {
            label:"Contact",
            path:"/contact"
        }

    ];






    return (

        <header

            className={`
                fixed
                top-0
                left-0
                w-full
                z-50
                transition-all
                duration-500

                ${
                    scrolled

                    ? 
                    "bg-background/80 backdrop-blur-xl border-b border-white/10"

                    :

                    "bg-transparent"

                }
            `}

        >




            <div

                className="
                    max-w-[1280px]
                    mx-auto
                    px-6
                    h-24
                    flex
                    items-center
                    justify-between
                "

            >





                {/* Logo */}


                <NavLink

                    to="/"

                    className="
                        group
                        flex
                        items-center
                        justify-center
                    "

                >

                    <span

                        className="
                            font-title
                            text-3xl
                            text-accent
                            transition
                            duration-300
                            group-hover:text-accent-light
                        "

                    >

                        PA

                    </span>


                </NavLink>







                {/* Menu desktop */}


                <nav

                    className="
                        hidden
                        md:flex
                        items-center
                        gap-10
                    "

                >


                    {

                        links.map((link)=>(


                            <NavLink

                                key={link.path}

                                to={link.path}

                                className={({isActive})=>
                                    
                                    `
                                    relative
                                    text-sm
                                    uppercase
                                    tracking-[0.2em]
                                    transition
                                    duration-300

                                    ${
                                        isActive

                                        ?

                                        "text-accent"

                                        :

                                        "text-text-soft hover:text-accent"

                                    }

                                    `
                                }

                            >

                                {link.label}


                            </NavLink>


                        ))

                    }


                </nav>







                {/* Bouton mobile */}


                <button

                    onClick={() => setOpen(!open)}

                    className="
                        md:hidden
                        flex
                        flex-col
                        gap-2
                        p-2
                    "

                    aria-label="Menu"

                >

                    <span

                        className={`
                            block
                            w-7
                            h-px
                            bg-text
                            transition

                            ${
                                open
                                ?
                                "rotate-45 translate-y-2"

                                :

                                ""

                            }
                        `}

                    />


                    <span

                        className={`
                            block
                            w-7
                            h-px
                            bg-text
                            transition

                            ${
                                open
                                ?
                                "-rotate-45"

                                :

                                ""

                            }
                        `}

                    />


                </button>




            </div>








            {/* Menu mobile */}


            <div

                className={`
                    md:hidden
                    overflow-hidden
                    transition-all
                    duration-500

                    ${
                        open

                        ?

                        "max-h-screen opacity-100"

                        :

                        "max-h-0 opacity-0"

                    }

                    bg-background/95
                    backdrop-blur-xl
                `}

            >


                <nav

                    className="
                        flex
                        flex-col
                        gap-8
                        px-6
                        py-10
                    "

                >


                    {

                        links.map((link)=>(


                            <NavLink

                                key={link.path}

                                to={link.path}

                                onClick={() => setOpen(false)}

                                className="
                                    text-text-soft
                                    uppercase
                                    tracking-[0.2em]
                                    text-sm
                                    hover:text-accent
                                    transition
                                "

                            >

                                {link.label}


                            </NavLink>


                        ))

                    }


                </nav>


            </div>



        </header>

    );

}