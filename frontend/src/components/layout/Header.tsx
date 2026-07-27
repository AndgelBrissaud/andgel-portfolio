import {
    motion,
    useScroll,
    useTransform
} from "framer-motion";

import Button from "../ui/Button";





export default function Header() {


    const {
        scrollY
    } = useScroll();




    const videoY = useTransform(
        scrollY,
        [0,800],
        [0,120]
    );



    const contentY = useTransform(
        scrollY,
        [0,600],
        [0,-35]
    );





    return (


        <header

            className="
                relative

                min-h-[calc(100vh-80px)]

                overflow-hidden

                bg-background

                text-text

            "

        >







            {/* =========================
                VIDEO BACKGROUND
            ========================== */}



            <motion.video


                style={{
                    y:videoY
                }}


                autoPlay

                loop

                muted

                playsInline


                className="
                    absolute

                    inset-0

                    h-full

                    w-full

                    object-cover

                    scale-105

                    opacity-70

                "


            >

                <source

                    src="/videos/code-background.mp4"

                    type="video/mp4"

                />


            </motion.video>








            {/* =========================
                CINEMATIC MASK
            ========================== */}



            <div

                className="
                    absolute

                    inset-0

                    bg-background/30

                "

            />





            <div

                className="
                    absolute

                    inset-0

                    bg-gradient-to-r

                    from-background

                    via-background/55

                    to-transparent

                "

            />





            <div

                className="
                    absolute

                    inset-0

                    bg-gradient-to-t

                    from-background

                    via-transparent

                    to-background/30

                "

            />









            {/* =========================
                CONTENT
            ========================== */}



            <motion.div


                style={{
                    y:contentY
                }}


                className="
                    relative

                    z-10

                    flex

                    min-h-[calc(100vh-80px)]

                    items-center

                    mx-auto

                    max-w-[1400px]

                    px-8

                    pt-10

                "


            >





                <div

                    className="
                        max-w-5xl

                    "

                >







                    {/* CATEGORY */}



                    <motion.p


                        initial={{
                            opacity:0,
                            y:20
                        }}


                        animate={{
                            opacity:1,
                            y:0
                        }}


                        transition={{
                            duration:0.8
                        }}



                        className="
                            mb-8

                            flex

                            items-center

                            gap-4

                            text-xs

                            uppercase

                            tracking-[0.5em]

                            text-accent

                        "

                    >

                        <span

                            className="
                                h-px

                                w-14

                                bg-accent

                            "

                        />


                        Full Stack Developer


                        <span>
                            &
                        </span>


                        Creative Photographer



                    </motion.p>









                    {/* NAME */}



                    <motion.h1


                        initial={{
                            opacity:0,
                            y:45
                        }}


                        animate={{
                            opacity:1,
                            y:0
                        }}


                        transition={{
                            duration:1
                        }}



                        className="
                            font-title

                            text-[clamp(5rem,12vw,11rem)]

                            leading-[0.75]

                            tracking-[-0.04em]

                            drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]

                        "

                    >

                        Andgel

                        <br />

                        <span

                            className="
                                text-text-soft

                            "

                        >

                            Brissaud

                        </span>



                    </motion.h1>









                    {/* DESCRIPTION */}



                    <motion.div


                        initial={{
                            opacity:0,
                            y:30
                        }}


                        animate={{
                            opacity:1,
                            y:0
                        }}


                        transition={{
                            delay:0.35,

                            duration:0.9
                        }}


                        className="
                            mt-12

                            flex

                            items-center

                            gap-6

                        "

                    >



                        <div

                            className="
                                h-px

                                w-20

                                bg-accent

                            "

                        />



                        <p

                            className="
                                max-w-lg

                                text-lg

                                leading-relaxed

                                text-text-soft

                            "

                        >

                            Entre lignes de code et regards
                            photographiques, je construis des
                            expériences digitales avec une identité.


                        </p>



                    </motion.div>









                    {/* ACTIONS */}



                    <motion.div


                        initial={{
                            opacity:0,
                            y:25
                        }}


                        animate={{
                            opacity:1,
                            y:0
                        }}


                        transition={{
                            delay:0.6
                        }}



                        className="
                            mt-10

                            flex

                            gap-5

                        "

                    >



                        <Button

                            href="/projects"

                        >

                            Voir mes projets

                        </Button>





                        <Button

                            href="/contact"

                        >

                            Me contacter

                        </Button>



                    </motion.div>





                </div>




            </motion.div>







        </header>


    );


}