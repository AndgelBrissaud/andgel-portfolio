import {
    useEffect,
    useState
} from "react";

import {
    createPortal
} from "react-dom";



interface ImageLightboxProps {

    images:string[];

    title:string;

}







export default function ImageLightbox({

    images,

    title

}:ImageLightboxProps){



    const [

        active,

        setActive

    ] = useState<number | null>(null);




    const [

        closing,

        setClosing

    ] = useState(false);




    const [

        changing,

        setChanging

    ] = useState(false);




    const [

        direction,

        setDirection

    ] = useState<"next"|"prev">("next");




    const [

        imageKey,

        setImageKey

    ] = useState(0);









    function open(index:number){


        setActive(index);


    }









    function close(){


        setClosing(true);



        setTimeout(()=>{


            setActive(null);

            setClosing(false);


        },350);


    }









    function navigate(

        value:number

    ){


        if(active === null){

            return;

        }





        setDirection(

            value > 0

            ?

            "next"

            :

            "prev"

        );





        setChanging(true);





        setTimeout(()=>{



            let next = active + value;





            if(next < 0){

                next = images.length - 1;

            }





            if(next >= images.length){

                next = 0;

            }





            setActive(next);



            setImageKey(

                previous => previous + 1

            );





            setTimeout(()=>{


                setChanging(false);


            },80);





        },220);


    }









    useEffect(()=>{


        function keyboard(

            event:KeyboardEvent

        ){


            if(active === null){

                return;

            }





            if(event.key==="Escape"){

                close();

            }





            if(event.key==="ArrowLeft"){

                navigate(-1);

            }





            if(event.key==="ArrowRight"){

                navigate(1);

            }


        }






        window.addEventListener(

            "keydown",

            keyboard

        );





        return ()=>{


            window.removeEventListener(

                "keydown",

                keyboard

            );


        };


    },[active]);









    useEffect(()=>{


        document.body.style.overflow =

            active !== null

            ?

            "hidden"

            :

            "";





        return ()=>{


            document.body.style.overflow="";


        };


    },[active]);









    return (

        <>





            {/* THUMBNAILS */}



            <div

                className="
                    grid
                    gap-6
                    md:grid-cols-2
                "

            >



                {

                    images.map(

                        (image,index)=>(


                            <div

                                key={image}

                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-white/10
                                "

                            >



                                <img

                                    src={image}

                                    alt={title}

                                    className="
                                        aspect-video
                                        w-full
                                        object-cover
                                        transition
                                        duration-700
                                        group-hover:scale-105
                                    "

                                />





                                <div

                                    className="
                                        absolute
                                        inset-0
                                        flex
                                        items-center
                                        justify-center
                                        bg-black/50
                                        opacity-0
                                        transition
                                        duration-300
                                        group-hover:opacity-100
                                    "

                                >



                                    <button

                                        type="button"

                                        onClick={()=>open(index)}

                                        className="
                                            rounded-full
                                            border
                                            border-white/20
                                            bg-black/40
                                            px-7
                                            py-3
                                            text-sm
                                            tracking-wide
                                            text-white
                                            backdrop-blur-xl
                                            transition
                                            hover:bg-white
                                            hover:text-black
                                        "

                                    >

                                        Voir

                                    </button>



                                </div>


                            </div>


                        )

                    )

                }


            </div>









            {

                active !== null && createPortal(



                    <div

                        className={`
                            fixed
                            inset-0
                            z-[9999]
                            flex
                            items-center
                            justify-center
                            bg-black/90
                            backdrop-blur-xl
                            p-6

                            transition-all
                            duration-500
                            ease-[cubic-bezier(.22,1,.36,1)]

                            ${
                                closing

                                ?

                                "opacity-0"

                                :

                                "opacity-100"

                            }
                        `}

                    >





                        <div

                            className={`
                                flex
                                max-h-[90vh]
                                w-full
                                max-w-6xl
                                flex-col
                                rounded-3xl
                                border
                                border-white/10
                                bg-black/60
                                p-6
                                shadow-2xl

                                transition-all
                                duration-500
                                ease-[cubic-bezier(.22,1,.36,1)]

                                ${
                                    closing

                                    ?

                                    "translate-y-8 scale-[0.96] blur-sm"

                                    :

                                    "translate-y-0 scale-100 blur-0"

                                }
                            `}

                        >









                            {/* HEADER */}



                            <div

                                className="
                                    mb-5
                                    flex
                                    items-center
                                    justify-between
                                "

                            >



                                <div>


                                    <p

                                        className="
                                            text-xs
                                            uppercase
                                            tracking-[0.3em]
                                            text-white/40
                                        "

                                    >

                                        Galerie

                                    </p>



                                    <p

                                        className="
                                            mt-1
                                            text-sm
                                            text-white/80
                                        "

                                    >

                                        {title}

                                    </p>


                                </div>





                                <button

                                    type="button"

                                    onClick={close}

                                    className="
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-white/10
                                        text-xl
                                        text-white/60
                                        transition
                                        hover:border-white/30
                                        hover:text-white
                                    "

                                >

                                    ×

                                </button>



                            </div>









                            {/* IMAGE */}



                            <div

                                className="
                                    flex
                                    flex-1
                                    items-center
                                    justify-center
                                    overflow-hidden
                                "

                            >



                                <img

                                    key={imageKey}

                                    src={images[active]}

                                    alt={title}

                                    className={`

                                        max-h-[70vh]
                                        max-w-full

                                        rounded-xl

                                        object-contain


                                        transition-all
                                        duration-500

                                        ease-[cubic-bezier(.22,1,.36,1)]


                                        ${
                                            changing

                                            ?

                                            direction==="next"

                                            ?

                                            "translate-x-12 opacity-0 scale-[0.96] blur-sm"

                                            :

                                            "-translate-x-12 opacity-0 scale-[0.96] blur-sm"


                                            :

                                            "translate-x-0 opacity-100 scale-100 blur-0"

                                        }

                                    `}

                                />



                            </div>









                            {/* FOOTER */}



                            <div

                                className="
                                    mt-6
                                    flex
                                    items-center
                                    justify-center
                                    gap-8
                                "

                            >



                                <button

                                    onClick={()=>navigate(-1)}

                                    className="
                                        text-white/50
                                        transition
                                        hover:text-white
                                    "

                                >

                                    ←

                                </button>





                                <span

                                    className="
                                        text-xs
                                        tracking-[0.3em]
                                        text-white/40
                                    "

                                >

                                    {active+1} / {images.length}

                                </span>





                                <button

                                    onClick={()=>navigate(1)}

                                    className="
                                        text-white/50
                                        transition
                                        hover:text-white
                                    "

                                >

                                    →

                                </button>



                            </div>





                        </div>



                    </div>,


                    document.body


                )

            }


        </>

    );

}