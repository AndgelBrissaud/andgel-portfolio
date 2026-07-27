import {
    useState
} from "react";



interface Option {


    id:number;


    name:string;


}



interface PremiumSelectProps {


    label:string;


    value:number | "";


    onChange:(value:number)=>void;


    options:Option[];


    placeholder?:string;


    required?:boolean;


}









export default function PremiumSelect({


    label,


    value,


    onChange,


    options,


    placeholder="Sélectionner une catégorie",


    required=false


}:PremiumSelectProps){



    const [

        focused,

        setFocused

    ] = useState(false);









    const active =

        focused ||

        value !== "";









    return (

        <div

            className="
                relative
                w-full
                pt-2
            "

        >





            <label

                className={`
                    block
                    mb-3
                    text-sm
                    tracking-wide
                    transition-all
                    duration-300

                    ${
                        active

                        ? "text-accent"

                        : "text-text-soft"
                    }
                `}

            >

                {label}

            </label>









            <select


                value={value}


                required={required}


                onChange={(event)=>


                    onChange(

                        Number(

                            event.target.value

                        )

                    )


                }


                onFocus={()=>


                    setFocused(true)


                }


                onBlur={()=>


                    setFocused(false)


                }


                className="
                    w-full
                    bg-transparent
                    border-none
                    outline-none
                    text-text
                    py-3
                    cursor-pointer
                "

            >


                <option

                    value=""

                    className="bg-black text-white"

                >

                    {placeholder}

                </option>





                {

                    options.map(

                        option=>(

                            <option

                                key={option.id}

                                value={option.id}

                                className="
                                    bg-black
                                    text-white
                                "

                            >

                                {option.name}

                            </option>

                        )

                    )

                }


            </select>









            <div

                className="
                    absolute
                    bottom-0
                    left-0
                    h-px
                    w-full
                    bg-white/10
                    overflow-hidden
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
                            focused

                            ? "w-full"

                            : "w-0"
                        }
                    `}

                />


            </div>





        </div>

    );

}