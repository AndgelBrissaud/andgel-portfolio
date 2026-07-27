import {

    useMemo,

    useState,

    type ReactNode

} from "react";



import {

    login as apiLogin,

    logout as apiLogout

} from "../services/api";



import {

    AuthContext,

    type AuthContextType

} from "./AuthContext";







interface Props {

    children: ReactNode;

}









export default function AuthProvider({

    children

}: Props) {





    const [

        isAuthenticated,

        setIsAuthenticated

    ] = useState<boolean>(

        () =>

            Boolean(

                localStorage.getItem(

                    "admin_token"

                )

            )

    );







    const [

        isLoading

    ] = useState(false);









    async function login(

        password:string

    ) {





        await apiLogin(

            password

        );





        setIsAuthenticated(

            true

        );

    }









    function logout() {


        apiLogout();



        setIsAuthenticated(

            false

        );

    }









    const value = useMemo<AuthContextType>(

        () => ({

            isAuthenticated,

            isLoading,

            login,

            logout

        }),

        [

            isAuthenticated,

            isLoading

        ]

    );









    return (

        <AuthContext.Provider

            value={value}

        >

            {children}

        </AuthContext.Provider>

    );

}