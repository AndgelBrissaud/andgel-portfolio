import PremiumField from "../../ui/PremiumField";

import DeleteButton from "../../ui/DeleteButton";



interface CoverUploaderProps {


    cover: File | null;


    setCover: (

        file: File | null

    ) => void;



    currentImage?: string;


}







export default function CoverUploader({

    cover,

    setCover,

    currentImage

}: CoverUploaderProps) {





    function handleChange(

        event: React.ChangeEvent<HTMLInputElement>

    ) {


        const file = event.target.files?.[0];



        if (!file) {

            return;

        }



        setCover(file);


    }









    const preview = cover

        ? URL.createObjectURL(cover)

        : currentImage || "";









    return (

        <PremiumField

            label="Image de couverture"

            active={Boolean(preview)}

        >



            <div

                className="
                    space-y-4
                "

            >







                {

                    preview && (

                        <div

                            className="
                                group
                                relative
                                overflow-hidden
                                rounded-2xl
                                border
                                border-white/10
                                bg-black/20
                            "

                        >



                            <img

                                src={preview}

                                alt="Couverture du projet"

                                className="
                                    aspect-video
                                    w-full
                                    object-cover
                                    transition-transform
                                    duration-500
                                    group-hover:scale-[1.03]
                                "

                            />







                            {

                                cover && (

                                    <DeleteButton

                                        onClick={()=>setCover(null)}

                                        label="Supprimer l'image"

                                    />

                                )

                            }







                            <div

                                className="
                                    pointer-events-none
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-black/40
                                    via-transparent
                                    to-transparent
                                "

                            />



                        </div>

                    )

                }









                <div

                    className="
                        flex
                        items-center
                        justify-between
                        gap-4
                    "

                >



                    <label

                        className="
                            cursor-pointer
                            text-sm
                            font-medium
                            text-accent
                            transition-colors
                            hover:text-accent-light
                        "

                    >

                        + Choisir une image



                        <input

                            type="file"

                            accept="image/*"

                            onChange={handleChange}

                            className="hidden"

                        />


                    </label>









                    {

                        cover ? (

                            <span

                                className="
                                    max-w-[180px]
                                    truncate
                                    text-xs
                                    text-text-muted
                                "

                            >

                                {cover.name}

                            </span>


                        )

                        :

                        currentImage ? (

                            <span

                                className="
                                    text-xs
                                    text-text-muted
                                "

                            >

                                Image actuelle

                            </span>


                        )

                        :

                        (

                            <span

                                className="
                                    text-xs
                                    text-text-muted
                                "

                            >

                                Aucun fichier

                            </span>


                        )

                    }



                </div>



            </div>



        </PremiumField>

    );

}