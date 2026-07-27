type ColorCardProps = {

  color: string;

  name: string;

  hex: string;

  description?: string;

};



export default function ColorCard({

  color,

  name,

  hex,

  description,

}: ColorCardProps) {



  return (

    <article

      className="

        group

        overflow-hidden

        rounded-3xl

        bg-surface

        border

        border-white/10

        shadow-[var(--shadow-soft)]

        transition-all

        duration-500

        ease-[var(--ease-luxury)]

        hover:-translate-y-2

        hover:shadow-[var(--shadow-gold)]

      "

    >



      <div

        className="

          h-48

          w-full

          transition-transform

          duration-700

          ease-[var(--ease-luxury)]

          group-hover:scale-105

        "

        style={{

          backgroundColor: color

        }}

      />





      <div

        className="

          p-6

        "

      >



        <h3

          className="

            font-title

            text-2xl

            text-text

            mb-2

          "

        >

          {name}

        </h3>





        <p

          className="

            text-accent

            uppercase

            tracking-[0.18em]

            text-sm

            mb-3

          "

        >

          {hex}

        </p>





        {

          description &&

          (

            <p

              className="

                text-text-soft

                text-sm

              "

            >

              {description}

            </p>

          )

        }



      </div>



    </article>

  );

}