import type {

    PhotoCategory

} from "../../types/photo";







interface Props {


    categories:PhotoCategory[];


    selected:number | null;


    onChange:(id:number|null)=>void;


}









export default function PhotoCategoryFilter({

    categories,

    selected,

    onChange

}:Props){



    return (

        <div

            className="
                flex
                flex-wrap
                gap-3
            "

        >



            <button

                onClick={()=>onChange(null)}

                className={

                    `
                    rounded-full
                    px-4
                    py-2
                    text-sm
                    ${
                        selected===null
                        ?
                        "bg-accent text-black"
                        :
                        "border border-white/10 text-white/70"
                    }
                    `

                }

            >

                Toutes

            </button>







            {

                categories.map(

                    category=>(

                        <button

                            key={category.id}

                            onClick={()=>onChange(category.id)}

                            className={

                                `
                                rounded-full
                                px-4
                                py-2
                                text-sm
                                ${
                                    selected===category.id
                                    ?
                                    "bg-accent text-black"
                                    :
                                    "border border-white/10 text-white/70"
                                }
                                `

                            }

                        >

                            {category.name}

                        </button>

                    )

                )

            }



        </div>

    );

}