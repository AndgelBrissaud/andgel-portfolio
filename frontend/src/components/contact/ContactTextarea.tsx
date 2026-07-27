export default function ContactTextarea() {


    return (


        <div

            className="
                group

                relative
            "

        >






            <label

                className="
                    block

                    mb-3

                    text-[11px]

                    uppercase

                    tracking-[0.35em]

                    text-text-muted

                    transition-colors

                    duration-500

                    group-focus-within:text-accent
                "

            >

                Message

            </label>








            <textarea

                rows={6}

                placeholder="Décrivez votre projet..."

                className="
                    peer

                    w-full

                    resize-none

                    bg-transparent

                    border-0

                    border-b

                    border-white/15

                    px-0

                    py-3

                    text-base

                    text-text

                    outline-none

                    leading-relaxed

                    transition-all

                    duration-500

                    placeholder:text-text-muted

                    focus:border-accent
                "

            />








            {/* ligne lumineuse */}

            <span

                className="
                    absolute

                    bottom-0

                    left-0

                    h-px

                    w-0

                    bg-accent

                    transition-all

                    duration-700

                    peer-focus:w-full
                "

            />





        </div>


    );


}