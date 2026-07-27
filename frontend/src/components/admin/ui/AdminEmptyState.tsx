interface Props{

    message:string;

}

export default function AdminEmptyState({

    message

}:Props){

    return(

        <div

            className="
                flex
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-white/10
                py-20
                text-text-muted
            "

        >

            {message}

        </div>

    );

}