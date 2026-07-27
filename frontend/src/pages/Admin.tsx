import {
    useNavigate
} from "react-router-dom";


import {
    useEffect,
    useState
} from "react";


import {
    isAuthenticated,
    logout
} from "../services/api";


import AdminLayout from "../components/admin/layout/AdminLayout";

import AdminHeader from "../components/admin/layout/AdminHeader";


import AdminDashboard from "./admin/AdminDashboard";

import AdminProjects from "./admin/AdminProjects";

import AdminPhotos from "./admin/AdminPhotos";

import AdminServer from "./admin/AdminServer";









export type AdminSection =

    | "dashboard"
    | "projects"
    | "photos"
    | "server";









export default function Admin(){


    const navigate = useNavigate();





    const [

        activeSection,

        setActiveSection

    ] = useState<AdminSection>("dashboard");





    const [

        authenticated,

        setAuthenticated

    ] = useState<boolean>(

        () => isAuthenticated()

    );









    useEffect(()=>{


        if(authenticated){

            return;

        }





        navigate(

            "/login",

            {
                replace:true
            }

        );


    },[authenticated,navigate]);









    function handleLogout(){


        logout();


        setAuthenticated(false);


        navigate(

            "/login",

            {
                replace:true
            }

        );


    }









    function renderContent(){


        switch(activeSection){



            case "projects":

                return <AdminProjects />;



            case "photos":

                return <AdminPhotos />;



            case "server":

                return <AdminServer />;



            default:

                return <AdminDashboard />;


        }


    }









    if(!authenticated){

        return null;

    }









    return (

        <AdminLayout>


            <AdminHeader

                activeSection={activeSection}

                onNavigate={setActiveSection}

                onLogout={handleLogout}

            />







            <main

                className="
                    bg-background
                    px-3
                    py-4
                    sm:px-4
                    lg:px-5
                    lg:py-5
                "

            >


                <div

                    className="
                        w-full
                        mx-auto
                    "

                >


                    {renderContent()}


                </div>


            </main>


        </AdminLayout>

    );

}