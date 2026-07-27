import {
    useState
} from "react";


import type {
    ReactNode
} from "react";





interface PremiumFieldProps {


    label:string;


    description?:string;


    children:ReactNode;


    active?:boolean;


}









export default function PremiumField({

    label,

    description,

    children,

    active=false

}:PremiumFieldProps){



    const [

        focused,

        setFocused

    ] = useState(false);





    const isActive =

        focused ||

        active;









    return (

        <div

            className="
                relative
                w-full
            "

            onFocus={()=>setFocused(true)}

            onBlur={()=>setFocused(false)}

        >









            <label

                className={`
                    block
                    mb-2
                    text-sm
                    tracking-wide
                    transition-colors
                    duration-300

                    ${
                        isActive
                        ? "text-accent"
                        : "text-text-soft"
                    }
                `}

            >

                {label}

            </label>









            {

                description &&

                <p

                    className="
                        mb-2
                        text-xs
                        text-text-muted
                    "

                >

                    {description}

                </p>

            }









            <div

                className="
                    relative
                    w-full
                "

            >

                {children}

            </div>









            <div

                className="
                    absolute
                    bottom-0
                    left-0
                    h-px
                    w-full
                    overflow-hidden
                    bg-white/10
                "

            >


                <div

                    className={`
                        h-full
                        bg-accent
                        transition-all
                        duration-500
                        ease-out

                        ${
                            isActive
                            ? "w-full"
                            : "w-0"
                        }
                    `}

                />


            </div>





        </div>

    );

}