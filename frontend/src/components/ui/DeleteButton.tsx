interface DeleteButtonProps {

    onClick:()=>void;

    label?:string;

}



export default function DeleteButton({

    onClick,

    label="Supprimer"

}:DeleteButtonProps){


    return (

        <button

            type="button"

            onClick={onClick}

            aria-label={label}

            className="
                absolute
                right-2
                top-2
                z-20
                flex
                h-5
                w-5
                items-center
                justify-center
                rounded-full
                border
                border-white/20
                bg-black/40
                backdrop-blur-md
                text-white/70
                opacity-0
                scale-90
                transition-all
                duration-300
                group-hover:opacity-100
                group-hover:scale-100
                hover:bg-red-500/80
                hover:text-white
            "

        >

            <svg

                viewBox="0 0 24 24"

                fill="none"

                stroke="currentColor"

                strokeWidth="2"

                className="
                    h-2.5
                    w-2.5
                "

            >

                <path

                    strokeLinecap="round"

                    strokeLinejoin="round"

                    d="
                        M6 6
                        L18 18
                        M18 6
                        L6 18
                    "

                />

            </svg>


        </button>

    );

}