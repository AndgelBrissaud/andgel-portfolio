import PremiumField from "../../ui/PremiumField";

import DeleteButton from "../../ui/DeleteButton";



interface PhotoUploaderProps {


    file: File | null;


    setFile: (

        file: File | null

    ) => void;


}







export default function PhotoUploader({

    file,

    setFile

}: PhotoUploaderProps) {





    function handleChange(

        event: React.ChangeEvent<HTMLInputElement>

    ) {


        const selected = event.target.files?.[0];



        if (!selected) {

            return;

        }



        setFile(selected);


    }









    const preview = file

        ? URL.createObjectURL(file)

        : "";









    return (

        <PremiumField

            label="Image"

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

                                alt="Aperçu photographie"

                                className="
                                    aspect-video
                                    w-full
                                    object-cover
                                    transition-transform
                                    duration-500
                                    group-hover:scale-[1.03]
                                "

                            />







                            <DeleteButton

                                onClick={()=>setFile(null)}

                                label="Supprimer l'image"

                            />







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

                        file ? (

                            <span

                                className="
                                    max-w-[220px]
                                    truncate
                                    text-xs
                                    text-text-muted
                                "

                            >

                                {file.name}

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