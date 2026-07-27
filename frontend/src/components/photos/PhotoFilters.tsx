import type {
    PhotoCategory
} from "../../types/photo";







interface PhotoFiltersProps {


    categories:PhotoCategory[];


    selected:string;


    onChange:(category:string)=>void;


}









export default function PhotoFilters({

    categories,

    selected,

    onChange

}:PhotoFiltersProps){



    return (

        <div

            className="
                mb-10
                flex
                flex-wrap
                justify-center
                gap-3
            "

        >



            <button

                type="button"

                onClick={() => onChange("")}

                className={`
                    rounded-full
                    border
                    px-5
                    py-2
                    text-sm
                    transition

                    ${
                        selected === ""

                        ?

                        "border-accent bg-accent text-black"

                        :

                        "border-white/10 text-white/60 hover:text-white"

                    }
                `}

            >

                Toutes

            </button>









            {
                categories.map(

                    category => (

                        <button

                            key={category.id}

                            type="button"

                            onClick={() =>

                                onChange(

                                    category.name

                                )

                            }

                            className={`
                                rounded-full
                                border
                                px-5
                                py-2
                                text-sm
                                transition

                                ${
                                    selected === category.name

                                    ?

                                    "border-accent bg-accent text-black"

                                    :

                                    "border-white/10 text-white/60 hover:text-white"

                                }
                            `}

                        >

                            {category.name}

                        </button>

                    )

                )
            }



        </div>

    );

}