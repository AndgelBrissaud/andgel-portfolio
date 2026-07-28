import {
    useState
} from "react";
import type { ReactNode } from "react";



interface PremiumInputProps {


    label:string;


    value:string;


    onChange:(value:string)=>void;


    placeholder?:string;


    type?:string;


    textarea?:boolean;


    rows?:number;


    required?:boolean;
    end?: ReactNode;


}









export default function PremiumInput({


    label,


    value,


    onChange,


    placeholder,


    type="text",


    textarea=false,


    rows=5,


    required=false,
    end


}:PremiumInputProps){



    const [

        focused,

        setFocused

    ] = useState(false);









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
                        focused || value

                        ? "text-accent"

                        : "text-text-soft"
                    }
                `}

            >

                {label}

            </label>









            {

                textarea

                ?


                (

                    <div className="relative">

                        <textarea

                            value={value}

                            onChange={(event)=>

                                onChange(

                                    event.target.value

                                )

                            }


                            onFocus={()=>

                                setFocused(true)

                            }


                            onBlur={()=>

                                setFocused(false)

                            }


                            placeholder={placeholder}


                            rows={rows}


                            required={required}


                            className={`
                                w-full
                                resize-none
                                bg-transparent
                                border-none
                                outline-none
                                text-text
                                placeholder:text-text-muted
                                py-3
                                ${end ? 'pr-12' : ''}
                            `}

                        />

                        {end && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
                                {end}
                            </div>
                        )}

                    </div>

                )

                :


                (

                    <div className="relative flex items-center">

                        <input

                            type={type}


                            value={value}


                            onChange={(event)=>

                                onChange(

                                    event.target.value

                                )

                            }


                            onFocus={()=>

                                setFocused(true)

                            }


                            onBlur={()=>

                                setFocused(false)

                            }


                            placeholder={placeholder}


                            required={required}


                            className={`
                                w-full
                                bg-transparent
                                border-none
                                outline-none
                                text-text
                                placeholder:text-text-muted
                                py-3
                                ${end ? 'pr-12' : ''}
                            `}

                        />

                        {end && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex items-center">
                                {end}
                            </div>
                        )}

                    </div>

                )

            }









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