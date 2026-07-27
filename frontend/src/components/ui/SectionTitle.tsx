type SectionTitleProps = {

  eyebrow?: string;

  title: string;

  description?: string;

  align?: "left" | "center";

};



export default function SectionTitle({

  eyebrow,

  title,

  description,

  align = "center",

}: SectionTitleProps) {



  return (

    <div

      className={`

        max-w-3xl

        ${

          align === "center"

          ?

          "mx-auto text-center"

          :

          "text-left"

        }

      `}

    >



      {

        eyebrow &&

        (

          <div

            className={`

              flex

              items-center

              gap-4

              mb-6

              ${

                align === "center"

                ?

                "justify-center"

                :

                "justify-start"

              }

            `}

          >


            <span

              className="

                h-px

                w-12

                bg-accent

              "

            />



            <span

              className="

                text-accent

                uppercase

                tracking-[0.35em]

                text-xs

              "

            >

              {eyebrow}

            </span>



            <span

              className="

                h-px

                w-12

                bg-accent

              "

            />


          </div>

        )

      }







      <h2

        className="

          font-title

          text-4xl

          md:text-5xl

          text-text

          leading-tight

        "

      >

        {title}

      </h2>







      {

        description &&

        (

          <p

            className="

              mt-6

              text-text-soft

              text-lg

              leading-relaxed

            "

          >

            {description}

          </p>

        )

      }



    </div>

  );

}