const socials = [

    {
        name: "Github",

        url: "https://github.com/AndgelBrissaud"

    },


    {
        name: "LinkedIn",

        url: "https://www.linkedin.com/in/andgel-brissaud-89746225a/"

    },


    {
        name: "Instagram",

        url: "https://www.instagram.com/andgel_photo/?hl=fr"

    }

];







export default function ContactSocials() {


    return (


        <div

            className="
                mt-14

                flex

                justify-center

                flex-wrap

                gap-10

                border-t

                border-white/10

                pt-8
            "

        >



            {socials.map((social) => (


                <a

                    key={social.name}

                    href={social.url}

                    target="_blank"

                    rel="noopener noreferrer"

                    className="
                        group

                        relative

                        text-xs

                        uppercase

                        tracking-[0.35em]

                        text-text-muted

                        transition-all

                        duration-500

                        hover:text-accent
                    "

                >


                    {social.name}





                    <span

                        className="
                            absolute

                            -bottom-2

                            left-0

                            h-px

                            w-0

                            bg-accent

                            transition-all

                            duration-700

                            group-hover:w-full
                        "

                    />



                </a>


            ))}



        </div>


    );


}