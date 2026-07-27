import { motion } from "framer-motion";
import type { ReactNode } from "react";


interface FadeInProps {
    children: ReactNode;

    delay?: number;

    duration?: number;

    direction?: "up" | "down" | "left" | "right";

    distance?: number;

    className?: string;
}



export default function FadeIn({

    children,

    delay = 0,

    duration = 0.8,

    direction = "up",

    distance = 40,

    className = ""

}: FadeInProps) {



    const directions = {

        up: {
            y: distance,
            x: 0
        },

        down: {
            y: -distance,
            x: 0
        },

        left: {
            x: distance,
            y: 0
        },

        right: {
            x: -distance,
            y: 0
        }

    };



    return (

        <motion.div

            className={className}

            initial={{

                opacity: 0,

                ...directions[direction]

            }}


            whileInView={{

                opacity: 1,

                x: 0,

                y: 0

            }}


            viewport={{

                once: true,

                amount: 0.2

            }}


            transition={{

                duration,

                delay,

                ease: "easeOut"

            }}

        >

            {children}

        </motion.div>

    );

}