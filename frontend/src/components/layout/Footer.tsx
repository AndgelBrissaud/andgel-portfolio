import { motion } from "framer-motion";



export default function Footer() {


  const currentYear = new Date().getFullYear();



  return (


    <footer
      className="
        bg-background
        text-text
        pt-6
        pb-4
      "
    >



      {/* Ligne décorative */}


      <motion.div

        initial={{
          scaleX:0
        }}

        whileInView={{
          scaleX:1
        }}

        viewport={{
          once:true
        }}

        transition={{
          duration:0.8
        }}

        className="
          h-px
          w-full
          origin-left
          bg-accent
          opacity-50
          mb-5
        "

      />






      <div
        className="
          mx-auto
          max-w-6xl
          px-6
        "
      >





        <div
          className="
            flex
            flex-col
            md:flex-row
            items-center
            justify-between
            gap-4
          "
        >





          {/* IDENTITE */}


          <div
            className="
              text-center
              md:text-left
            "
          >


            <h2
              className="
                font-title
                text-xl
              "
            >

              Andgel Brissaud

            </h2>


            <p
              className="
                mt-1
                text-xs
                text-text-muted
              "
            >

              Développeur Full Stack · Photographe

            </p>


          </div>









          {/* NAVIGATION */}



          <nav
            className="
              flex
              items-center
              gap-5
              text-sm
            "
          >



            <a
              href="/projects"
              className="
                text-text-soft
                hover:text-accent
                transition
              "
            >

              Projets

            </a>



            <a
              href="/photography"
              className="
                text-text-soft
                hover:text-accent
                transition
              "
            >

              Photos

            </a>



            <a
              href="/contact"
              className="
                text-text-soft
                hover:text-accent
                transition
              "
            >

              Contact

            </a>



          </nav>









          {/* RESEAUX */}



          <div
            className="
              flex
              items-center
              gap-4
              text-sm
            "
          >



            <a

              href="https://www.instagram.com/andgel_photo/?hl=fr"

              target="_blank"

              rel="noopener noreferrer"

              className="
                text-text-muted
                hover:text-accent
                transition
              "

            >

              Instagram

            </a>





            <a

              href="https://github.com/AndgelBrissaud"

              target="_blank"

              rel="noopener noreferrer"

              className="
                text-text-muted
                hover:text-accent
                transition
              "

            >

              Github

            </a>





            <a

              href="https://www.linkedin.com/in/andgel-brissaud-89746225a/"

              target="_blank"

              rel="noopener noreferrer"

              className="
                text-text-muted
                hover:text-accent
                transition
              "

            >

              LinkedIn

            </a>



          </div>





        </div>









        {/* COPYRIGHT */}



        <div
          className="
            mt-4
            pt-3
            border-t
            border-white/10
            flex
            justify-between
            text-xs
            text-text-muted
          "
        >


          <p>

            © {currentYear} Andgel Brissaud

          </p>



          <p>

            React · TypeScript · Tailwind

          </p>


        </div>




      </div>




    </footer>


  );

}