import {
    useEffect,
    useRef,
    useState
} from "react";


import {
    useNavigate
} from "react-router-dom";


import useAuth from "../../context/useAuth";


import PremiumField from "../ui/PremiumField";









export default function LoginForm(){



    const {
        login
    } = useAuth();



    const navigate = useNavigate();





    const passwordRef = useRef<HTMLInputElement>(null);









    const [
        password,
        setPassword
    ] = useState("");





    const [
        error,
        setError
    ] = useState("");





    const [
        loading,
        setLoading
    ] = useState(false);









    useEffect(()=>{

        passwordRef.current?.focus();

    },[]);









    async function handleSubmit(

        event:React.FormEvent<HTMLFormElement>

    ){


        event.preventDefault();


        setError("");

        setLoading(true);





        try{


            await login(password);



            navigate(

                "/admin",

                {
                    replace:true
                }

            );


        }


        catch(error){



            setError(

                error instanceof Error

                ?

                error.message

                :

                "Mot de passe incorrect"

            );


        }


        finally{


            setLoading(false);


        }


    }









    return (

        <main

            className="
                relative
                flex
                min-h-screen
                w-full
                items-center
                justify-center
                overflow-hidden
                bg-background
                px-4
                sm:px-6
            "

        >





            <div

                className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-30
                "

            >



                <div

                    className="
                        absolute
                        -right-40
                        -top-40
                        h-96
                        w-96
                        rounded-full
                        bg-accent/20
                        blur-3xl
                    "

                />





                <div

                    className="
                        absolute
                        -bottom-40
                        -left-40
                        h-96
                        w-96
                        rounded-full
                        bg-accent/10
                        blur-3xl
                    "

                />



            </div>









            <form

                onSubmit={handleSubmit}

                className="
                    relative
                    z-10
                    w-full
                    max-w-sm
                    space-y-6
                    rounded-radius-lg
                    border
                    border-white/10
                    bg-surface/80
                    p-6
                    shadow-shadow-soft
                    backdrop-blur-xl
                    sm:p-8
                "

            >





                <header

                    className="
                        text-center
                    "

                >



                    <p

                        className="
                            text-[11px]
                            uppercase
                            tracking-[0.35em]
                            text-accent
                        "

                    >

                        Administration

                    </p>





                    <h1

                        className="
                            mt-3
                            font-title
                            text-3xl
                            text-text
                        "

                    >

                        Espace privé

                    </h1>





                    <p

                        className="
                            mt-3
                            text-sm
                            leading-relaxed
                            text-text-soft
                        "

                    >

                        Connectez-vous pour gérer vos projets et contenus.

                    </p>



                </header>









                {

                    error && (

                        <div

                            className="
                                rounded-radius-md
                                border
                                border-red-400/30
                                bg-red-400/10
                                px-3
                                py-2
                                text-center
                                text-xs
                                text-red-300
                            "

                        >

                            {error}

                        </div>

                    )

                }









                <PremiumField

                    label="Mot de passe"

                    active={Boolean(password)}

                >



                    <input

                        ref={passwordRef}

                        type="password"

                        value={password}

                        onChange={(event)=>

                            setPassword(

                                event.target.value

                            )

                        }

                        placeholder="Votre mot de passe"

                        required

                        className="
                            w-full
                            rounded-radius-md
                            border
                            border-white/10
                            bg-background
                            px-4
                            py-3
                            text-sm
                            text-text
                            outline-none
                            transition
                            focus:border-accent
                            focus:ring-1
                            focus:ring-accent
                        "

                    />



                </PremiumField>









                <button

                    type="submit"

                    disabled={loading}

                    className="
                        w-full
                        rounded-radius-full
                        bg-accent
                        px-5
                        py-3
                        text-sm
                        font-medium
                        text-background
                        transition-all
                        hover:bg-accent-light
                        hover:-translate-y-0.5
                        disabled:pointer-events-none
                        disabled:opacity-50
                    "

                >

                    {

                        loading

                        ?

                        "Connexion..."

                        :

                        "Accéder au tableau de bord"

                    }


                </button>









                <p

                    className="
                        text-center
                        text-[11px]
                        uppercase
                        tracking-[0.25em]
                        text-text-muted
                    "

                >

                    Interface sécurisée

                </p>





            </form>



        </main>

    );

}