import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


import Layout from "../components/layout/Layout";


import LoginForm from "../components/admin/LoginForm";









export default function AppRouter(){


    return (

        <BrowserRouter>


            <Routes>



                {/* LOGIN ADMIN */}

                <Route

                    path="/login"

                    element={<LoginForm />}

                />







                {/* SITE PUBLIC + ADMIN */}

                <Route

                    path="/*"

                    element={<Layout />}

                />





            </Routes>


        </BrowserRouter>

    );

}