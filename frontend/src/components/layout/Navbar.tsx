import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../context/useAuth";


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

    const location = useLocation();
    const navigate = useNavigate();
    const auth = useAuth();

    const isAdminPath =
        location.pathname.startsWith("/admin") ||
        // support HashRouter where pathname may be "/" and hash contains the route
        (location.hash && location.hash.startsWith("#/admin"));

    const adminLinks = [
        { label: "Dashboard", path: "/admin" },
        { label: "Projets", path: "/admin/projects" },
        { label: "Photos", path: "/admin/photos" },
        { label: "Serveur", path: "/admin/server" },
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

                <nav className="hidden md:flex items-center gap-6">
                    {isAdminPath ? (
                        <>
                            {adminLinks.map((link) => (
                                <button key={link.path} onClick={() => navigate(link.path)} className="text-sm px-3 py-2 rounded-md bg-white/5 text-white hover:bg-white/10">
                                    {link.label}
                                </button>
                            ))}
                            <button onClick={() => { auth.logout(); navigate('/login'); }} className="ml-4 text-sm rounded-md px-3 py-2 bg-red-500/10 text-red-300 hover:bg-red-500/20">Déconnexion</button>
                        </>
                    ) : (
                        links.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) => `relative text-sm uppercase tracking-[0.2em] transition duration-300 ${isActive ? 'text-accent' : 'text-text-soft hover:text-accent'}`}
                            >
                                {link.label}
                            </NavLink>
                        ))
                    )}
                </nav>







                {/* Bouton mobile */}

                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden p-2"
                    aria-label="Menu"
                    aria-expanded={open}
                    aria-controls="mobile-menu"
                >
                    <span className="sr-only">Ouvrir le menu</span>
                    <div className={`w-7 h-7 relative flex items-center justify-center`}> 
                        <span className={`block absolute w-6 h-[2px] bg-text transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-1.5'}`} />
                        <span className={`block absolute w-6 h-[2px] bg-text transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
                        <span className={`block absolute w-6 h-[2px] bg-text transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-1.5'}`} />
                    </div>
                </button>




            </div>








            {/* Menu mobile */}


            {/* Menu mobile: overlay */}
            <div
                id="mobile-menu"
                className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            >
                {/* backdrop */}
                <button
                    aria-hidden
                    onClick={() => setOpen(false)}
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
                />

                {/* panel */}
                <div className={`relative h-full flex items-center justify-center p-6`}> 
                    <nav className={`bg-background/95 w-full max-w-md rounded-xl p-6 transform transition-transform ${open ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
                        <div className="flex justify-end">
                            <button aria-label="Fermer" className="p-2" onClick={() => setOpen(false)}>✕</button>
                        </div>

                        <ul className="mt-2 flex flex-col gap-4">
                            {isAdminPath ? (
                                <>
                                    {adminLinks.map((link) => (
                                        <li key={link.path}>
                                            <button
                                                onClick={() => {
                                                    navigate(link.path);
                                                    setOpen(false);
                                                }}
                                                className="block w-full text-center text-lg py-3 rounded text-accent font-semibold"
                                            >
                                                {link.label}
                                            </button>
                                        </li>
                                    ))}

                                    <li>
                                        <button
                                            onClick={() => {
                                                auth.logout();
                                                navigate('/login');
                                                setOpen(false);
                                            }}
                                            className="block w-full text-center text-lg py-3 rounded text-red-300"
                                        >
                                            Déconnexion
                                        </button>
                                    </li>
                                </>
                            ) : (
                                links.map((link) => (
                                    <li key={link.path}>
                                        <NavLink
                                            to={link.path}
                                            onClick={() => setOpen(false)}
                                            className={({isActive}) => `block w-full text-center text-lg py-3 rounded ${isActive ? 'text-accent font-semibold' : 'text-text-soft hover:text-accent'}`}
                                        >
                                            {link.label}
                                        </NavLink>
                                    </li>
                                ))
                            )}
                        </ul>
                    </nav>
                </div>
            </div>



        </header>

    );

}