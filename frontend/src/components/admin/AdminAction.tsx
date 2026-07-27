type AdminActionProps = {

    text:string;

};









export default function AdminAction({

    text

}:AdminActionProps){



    return (

        <button

            type="button"

            className="
                group
                relative
                flex
                w-full
                items-center
                justify-between
                border
                border-white/10
                bg-transparent
                px-4
                py-3
                text-left
                transition-all
                duration-300
                hover:border-accent/40
                hover:bg-white/[0.03]
            "

        >



            <span

                className="
                    text-sm
                    text-text-soft
                    transition-colors
                    duration-300
                    group-hover:text-text
                "

            >

                {text}

            </span>









            <span

                className="
                    relative
                    flex
                    h-4
                    w-4
                    items-center
                    justify-center
                "

            >



                <span

                    className="
                        absolute
                        h-px
                        w-3
                        bg-accent
                        transition-transform
                        duration-300
                        group-hover:rotate-90
                    "

                />



                <span

                    className="
                        h-px
                        w-3
                        bg-accent
                    "

                />


            </span>









            <span

                className="
                    absolute
                    bottom-0
                    left-0
                    h-px
                    w-0
                    bg-accent
                    transition-all
                    duration-500
                    group-hover:w-full
                "

            />



        </button>

    );

}