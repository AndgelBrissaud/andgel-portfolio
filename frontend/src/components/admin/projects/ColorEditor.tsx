import {
    useState
} from "react";


import PremiumField from "../../ui/PremiumField";





export interface ProjectColor {

    name:string;

    value:string;

}









interface ColorEditorProps {

    colors:ProjectColor[];

    setColors:(

        colors:ProjectColor[]

    )=>void;

}









function cleanHex(

    value:string

):string {


    return value

        .replace("#","")

        .replace(/[^0-9a-fA-F]/g,"")

        .slice(0,6)

        .toUpperCase();

}









function getPreview(

    value:string

):string {


    let hex = cleanHex(value);



    if(!hex){

        return "";

    }





    while(hex.length < 6){

        hex += "0";

    }





    return `#${hex}`;

}









export default function ColorEditor({


    colors,


    setColors


}:ColorEditorProps){



    const [

        name,

        setName

    ] = useState("");





    const [

        hex,

        setHex

    ] = useState("");









    const preview = getPreview(hex);









    function addColor(){



        if(

            !name.trim() ||

            !preview

        ){

            return;

        }







        setColors([

            ...colors,

            {

                name:name.trim(),

                value:preview

            }

        ]);







        setName("");

        setHex("");



    }









    function removeColor(

        index:number

    ){


        setColors(

            colors.filter(

                (_,i)=>

                    i !== index

            )

        );


    }









    return (

        <PremiumField

            label="Couleurs du projet"

            active={

                colors.length > 0 ||

                Boolean(preview)

            }

        >



            <div

                className="
                    space-y-3
                    py-1
                "

            >







                <div

                    className="
                        grid
                        grid-cols-[1fr_150px]
                        gap-4
                        items-center
                    "

                >





                    <input

                        value={name}

                        onChange={(event)=>

                            setName(

                                event.target.value

                            )

                        }

                        placeholder="Nom de la couleur"

                        className="
                            bg-transparent
                            py-2
                            text-sm
                            text-text
                            outline-none
                            placeholder:text-text-muted
                        "

                    />









                    <div

                        className="
                            flex
                            items-center
                            gap-2
                            transition-all
                            duration-300
                        "

                    >





                        <span

                            className="
                                h-4
                                w-4
                                rounded-full
                                border
                                border-white/20
                                shrink-0
                                transition-all
                                duration-500
                                ease-out
                            "

                            style={{

                                backgroundColor:

                                    preview || "transparent",


                                boxShadow:

                                    preview

                                    ? `0 0 10px ${preview}90`

                                    : "none",


                                transform:

                                    preview

                                    ? "scale(1.15)"

                                    : "scale(1)"

                            }}

                        />









                        <span

                            className="
                                text-text-muted
                                text-sm
                            "

                        >

                            #

                        </span>









                        <input

                            value={hex}

                            onChange={(event)=>

                                setHex(

                                    cleanHex(

                                        event.target.value

                                    )

                                )

                            }

                            maxLength={6}

                            placeholder="8B5A2B"

                            className="
                                w-full
                                bg-transparent
                                py-2
                                text-sm
                                uppercase
                                text-text
                                outline-none
                                placeholder:text-text-muted
                            "

                        />



                    </div>



                </div>









                <button

                    type="button"

                    onClick={addColor}

                    disabled={

                        !name.trim() ||

                        !preview

                    }

                    className="
                        text-xs
                        text-accent
                        transition-colors
                        hover:text-accent-light
                        disabled:opacity-30
                    "

                >

                    + Ajouter

                </button>









                {

                    colors.length > 0 &&

                    (

                        <div

                            className="
                                pt-3
                                space-y-2
                            "

                        >



                            {

                                colors.map(

                                    (color,index)=>(


                                        <div

                                            key={index}

                                            className="
                                                flex
                                                items-center
                                                justify-between
                                                text-xs
                                            "

                                        >



                                            <div

                                                className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                "

                                            >



                                                <span

                                                    className="
                                                        h-3
                                                        w-3
                                                        rounded-full
                                                        border
                                                        border-white/20
                                                    "

                                                    style={{

                                                        backgroundColor:

                                                            color.value

                                                    }}

                                                />





                                                <span

                                                    className="
                                                        text-text
                                                    "

                                                >

                                                    {color.name}

                                                </span>





                                                <span

                                                    className="
                                                        text-text-muted
                                                    "

                                                >

                                                    {color.value}

                                                </span>



                                            </div>









                                            <button

                                                type="button"

                                                onClick={()=>


                                                    removeColor(index)


                                                }

                                                className="
                                                    text-text-muted
                                                    hover:text-accent
                                                    transition-colors
                                                "

                                            >

                                                ×

                                            </button>



                                        </div>


                                    )

                                )

                            }


                        </div>

                    )

                }



            </div>



        </PremiumField>

    );

}