type ColorSwatchProps = {

  color: string;

  name: string;

  hex: string;

  size?: "sm" | "md" | "lg";

};



export default function ColorSwatch({

  color,

  name,

  hex,

  size = "md",

}: ColorSwatchProps) {



  const sizes = {


    sm: "w-12 h-12",

    md: "w-20 h-20",

    lg: "w-32 h-32",


  };




  return (

    <div

      className="

        flex

        items-center

        gap-4

        group

      "

    >



      <div

        className={`

          ${sizes[size]}

          rounded-full

          border

          border-white/10

          shadow-[var(--shadow-soft)]

          transition-all

          duration-500

          ease-[var(--ease-luxury)]

          group-hover:scale-110

          group-hover:shadow-[var(--shadow-gold)]

        `}

        style={{

          backgroundColor: color

        }}

      />





      <div>


        <h4

          className="

            font-title

            text-lg

            text-text

          "

        >

          {name}

        </h4>





        <p

          className="

            text-sm

            uppercase

            tracking-[0.15em]

            text-accent

          "

        >

          {hex}

        </p>



      </div>



    </div>

  );

}