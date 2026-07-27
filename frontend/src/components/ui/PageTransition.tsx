import {
    AnimatePresence,
    motion
} from "framer-motion";


import {
    useLocation
} from "react-router-dom";


import type {
    ReactNode
} from "react";





export default function PageTransition({

    children

}:{
    children:ReactNode;
}) {



    const location = useLocation();





    return (


        <AnimatePresence
            mode="wait"
        >


            <motion.div

                key={location.pathname}


                initial={{

                    opacity:0,

                    filter:"blur(5px)",

                    scale:0.99

                }}


                animate={{

                    opacity:1,

                    filter:"blur(0px)",

                    scale:1

                }}


                exit={{

                    opacity:0,

                    filter:"blur(5px)",

                    scale:1.01

                }}


                transition={{

                    duration:0.7,

                    ease:[
                        0.22,
                        1,
                        0.36,
                        1
                    ]

                }}

            >


                {children}


            </motion.div>


        </AnimatePresence>


    );

}