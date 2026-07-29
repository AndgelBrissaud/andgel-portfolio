import {
    useState
} from "react";


import PremiumField from "../../ui/PremiumField";
import Button from "../../ui/Button";





interface TechnologyInputProps {


    technologies:string[];


    setTechnologies:(
        technologies:string[]
    )=>void;


}









export default function TechnologyInput({


    technologies,


    setTechnologies


}:TechnologyInputProps){



    const [

        value,

        setValue

    ] = useState("");









    function addTechnology(){



        const technology = value.trim();





        if(

            !technology ||

            technologies.includes(technology)

        ){

            return;

        }







        setTechnologies([

            ...technologies,

            technology

        ]);







        setValue("");



    }









    function removeTechnology(

        technology:string

    ){


        setTechnologies(

            technologies.filter(

                item => item !== technology

            )

        );


    }









    function handleKeyDown(

        event:React.KeyboardEvent<HTMLInputElement>

    ){


        if(event.key === "Enter"){


            event.preventDefault();


            addTechnology();


        }


    }









    return (

        <PremiumField

            label="Technologies"

            description="Ajoutez les technologies utilisées pour ce projet"

            active={technologies.length > 0}

        >





            <div

                className="
                    flex
                    flex-wrap
                    gap-3
                    py-3
                "

            >





                {

                    technologies.map(

                        technology => (


                            <span

                                key={technology}

                                className="
                                    flex
                                    items-center
                                    gap-2
                                    rounded-radius-full
                                    border
                                    border-accent/30
                                    bg-accent/10
                                    px-4
                                    py-2
                                    text-sm
                                    text-accent
                                    transition-all
                                    duration-300
                                    hover:bg-accent/20
                                "

                            >


                                {technology}



                                <Button type="button" compact onClick={()=> removeTechnology(technology) } className="text-text-soft hover:text-accent">
                                    ×
                                </Button>


                            </span>


                        )

                    )

                }









                <input

                    value={value}

                    onChange={(event)=>

                        setValue(

                            event.target.value

                        )

                    }

                    onKeyDown={handleKeyDown}

                    placeholder="Ajouter une technologie"

                    className="
                        min-w-[220px]
                        flex-1
                        bg-transparent
                        py-2
                        text-text
                        outline-none
                        placeholder:text-text-muted
                    "

                />





            </div>









            <Button type="button" compact onClick={addTechnology} className="mt-3 text-sm text-accent">
                + Ajouter
            </Button>





        </PremiumField>

    );

}