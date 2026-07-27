type LoaderProps = {

  size?: "sm" | "md" | "lg";

  fullScreen?: boolean;

};



export default function Loader({

  size = "md",

  fullScreen = false,

}: LoaderProps) {



  const sizes = {


    sm: "w-8 h-8 border-2",

    md: "w-14 h-14 border-2",

    lg: "w-20 h-20 border-4",


  };




  const loader = (

    <div

      className={`

        ${sizes[size]}

        rounded-full

        border-accent

        border-t-transparent

        animate-spin

      `}

    />

  );





  if (fullScreen) {


    return (

      <div

        className="

          fixed

          inset-0

          z-[2000]

          flex

          items-center

          justify-center

          bg-background

        "

      >

        <div

          className="

            flex

            flex-col

            items-center

            gap-6

          "

        >


          {loader}



          <p

            className="

              text-accent

              uppercase

              tracking-[0.3em]

              text-sm

            "

          >

            Chargement

          </p>


        </div>


      </div>

    );


  }





  return loader;


}