import type { ReactNode } from "react";

import useAuth from "../context/useAuth";

import LoginForm from "../components/admin/LoginForm";





interface ProtectedRouteProps {

    children: ReactNode;

}







export default function ProtectedRoute({

    children

}: ProtectedRouteProps) {



    const {

        isAuthenticated,

        isLoading

    } = useAuth();









    if (isLoading) {

        return (

            <div

                className="
                    min-h-screen
                    flex
                    items-center
                    justify-center

                    text-text-soft
                "

            >

                Chargement...

            </div>

        );

    }









    if (!isAuthenticated) {

        return (

            <main

                className="
                    min-h-screen

                    bg-background

                    flex
                    items-center
                    justify-center

                    px-6
                "

            >

                <LoginForm />

            </main>

        );

    }









    return children;

}