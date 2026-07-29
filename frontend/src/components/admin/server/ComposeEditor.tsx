import {
    useState
} from "react";



interface Props {

    content:string;

    loading?:boolean;

    saving?:boolean;

    onSave:(content:string)=>void;

    readOnly?:boolean;

}







export default function ComposeEditor({

    content,

    loading = false,

    saving = false,

    onSave,

    readOnly = false

}:Props){



    const [
        value,
        setValue
    ] = useState(content);







    if(loading){


        return (

            <div className="compose-editor-loading">

                Chargement du docker-compose...

            </div>

        );


    }







    return (

        <div className="compose-editor">


            <textarea

                className="compose-editor-textarea"

                value={value}

                onChange={(event)=>{

                    setValue(

                        event.target.value

                    );

                }}

                readOnly={readOnly}

                spellCheck={false}

                placeholder="docker-compose.yml"

            />







            {
                !readOnly && (

                    <div className="compose-editor-actions">


                        <button

                            type="button"

                            onClick={()=>{

                                onSave(value);

                            }}

                            disabled={saving}

                        >

                            {
                                saving

                                ?

                                "Enregistrement..."

                                :

                                "Enregistrer"

                            }


                        </button>


                    </div>

                )
            }


        </div>

    );

}