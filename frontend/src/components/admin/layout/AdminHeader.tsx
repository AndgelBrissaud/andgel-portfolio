import type {
    AdminSection
} from "../../../pages/Admin";





interface AdminHeaderProps {


    activeSection:AdminSection;


    onNavigate:(

        section:AdminSection

    )=>void;


    onLogout:()=>void;


}









export default function AdminHeader({

    activeSection,

    onNavigate,

    onLogout

}:AdminHeaderProps){



    const items:{


        id:AdminSection;


        label:string;


    }[] = [


        {

            id:"dashboard",

            label:"Dashboard"

        },


        {

            id:"projects",

            label:"Projets"

        },


        {

            id:"photos",

            label:"Photos"

        },


        {

            id:"server",

            label:"Serveur"

        }


    ];









    return (

        <header

            className="
                border-b
                border-white/10
                bg-background
                px-6
                py-5
            "

        >



            <div

                className="
                    mx-auto
                    flex
                    max-w-7xl
                    items-center
                    justify-between
                    gap-6
                "

            >



                <nav

                    className="
                        flex
                        flex-wrap
                        gap-3
                    "

                >



                    {

                        items.map(item=>(


                            <button

                                key={item.id}

                                onClick={()=>{

                                    onNavigate(

                                        item.id

                                    );

                                }}

                                className={

                                    `
                                    rounded-xl
                                    px-5
                                    py-3
                                    text-sm
                                    transition

                                    ${
                                        activeSection === item.id

                                        ?

                                        "bg-accent text-black"

                                        :

                                        "bg-white/5 text-white hover:bg-white/10"

                                    }
                                    `

                                }

                            >

                                {item.label}

                            </button>


                        ))

                    }



                </nav>









                <button

                    onClick={onLogout}

                    className="
                        rounded-xl
                        bg-red-500/10
                        px-5
                        py-3
                        text-sm
                        text-red-300
                        transition
                        hover:bg-red-500/20
                    "

                >

                    Déconnexion

                </button>



            </div>



        </header>

    );

}