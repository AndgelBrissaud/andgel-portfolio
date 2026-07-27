import {
    Routes,
    Route,
    useLocation
} from "react-router-dom";


import {
    AnimatePresence,
    motion
} from "framer-motion";


import Navbar from "./Navbar";
import Footer from "./Footer";


import Home from "../../pages/Home";
import About from "../../pages/About";
import Projects from "../../pages/Projects";
import ProjectDetail from "../../pages/ProjectDetails";
import Photography from "../../pages/Photography";
import Contact from "../../pages/Contact";
import Admin from "../../pages/Admin";


import ProtectedRoute from "../../router/ProtectedRoute";









export default function Layout() {


    const location = useLocation();





    return (

        <div
            className="
                min-h-screen
                flex
                flex-col
                bg-background
                text-text
            "
        >



            <Navbar />







            <main
                className="
                    flex-1
                    pt-24
                    overflow-hidden
                "
            >



                <AnimatePresence
                    mode="wait"
                >



                    <motion.div

                        key={location.pathname}


                        initial={{

                            opacity:0,

                            filter:"blur(6px)",

                            scale:0.99

                        }}



                        animate={{

                            opacity:1,

                            filter:"blur(0px)",

                            scale:1

                        }}



                        exit={{

                            opacity:0,

                            filter:"blur(6px)",

                            scale:1.01

                        }}



                        transition={{

                            duration:0.6,

                            ease:[
                                0.22,
                                1,
                                0.36,
                                1
                            ]

                        }}

                    >



                        <Routes>



                            {/* PUBLIC */}



                            <Route

                                path="/"

                                element={<Home />}

                            />





                            <Route

                                path="/about"

                                element={<About />}

                            />





                            <Route

                                path="/projects"

                                element={<Projects />}

                            />





                            <Route

                                path="/projects/:slug"

                                element={<ProjectDetail />}

                            />





                            <Route

                                path="/photography"

                                element={<Photography />}

                            />





                            <Route

                                path="/contact"

                                element={<Contact />}

                            />









                            {/* ADMIN */}



                            <Route

                                path="/admin"

                                element={

                                    <ProtectedRoute>

                                        <Admin />

                                    </ProtectedRoute>

                                }

                            />





                        </Routes>



                    </motion.div>



                </AnimatePresence>



            </main>







            <Footer />



        </div>

    );

}