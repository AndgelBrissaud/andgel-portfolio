import {
  useState
} from "react";

import {
  ChevronLeft,
  ChevronRight
} from "lucide-react";



type CarouselItem = {

  id: string | number;

  image: string;

  title?: string;

  description?: string;

};



type CarouselProps = {

  items: CarouselItem[];

};




export default function Carousel({

  items

}: CarouselProps) {



  const [current, setCurrent] = useState(0);



  const previous = () => {


    setCurrent(

      current === 0

        ? items.length - 1

        : current - 1

    );


  };




  const next = () => {


    setCurrent(

      current === items.length - 1

        ? 0

        : current + 1

    );


  };




  if (!items.length) {

    return null;

  }





  return (

    <div

      className="

        relative

        w-full

        overflow-hidden

        rounded-3xl

        bg-surface

        shadow-[var(--shadow-soft)]

      "

    >



      <div

        className="

          relative

          aspect-[16/9]

        "

      >



        <img

          src={items[current].image}

          alt={

            items[current].title ??

            "Image carousel"

          }

          className="

            w-full

            h-full

            object-cover

            transition-all

            duration-700

            ease-[var(--ease-luxury)]

          "

        />



        <div

          className="

            absolute

            inset-0

            bg-gradient-to-t

            from-black/80

            via-black/20

            to-transparent

          "

        />





        <div

          className="

            absolute

            bottom-8

            left-8

            right-8

          "

        >


          {

            items[current].title &&

            (

              <h3

                className="

                  font-title

                  text-3xl

                  text-text

                  mb-2

                "

              >

                {items[current].title}

              </h3>

            )

          }





          {

            items[current].description &&

            (

              <p

                className="

                  text-text-soft

                  max-w-xl

                "

              >

                {items[current].description}

              </p>

            )

          }


        </div>



      </div>





      <button

        onClick={previous}

        aria-label="Image précédente"

        className="

          absolute

          left-5

          top-1/2

          -translate-y-1/2

          flex

          items-center

          justify-center

          w-12

          h-12

          rounded-full

          bg-black/40

          backdrop-blur

          border

          border-white/10

          text-text

          transition-all

          duration-300

          hover:bg-accent

          hover:text-background

        "

      >

        <ChevronLeft size={22}/>

      </button>







      <button

        onClick={next}

        aria-label="Image suivante"

        className="

          absolute

          right-5

          top-1/2

          -translate-y-1/2

          flex

          items-center

          justify-center

          w-12

          h-12

          rounded-full

          bg-black/40

          backdrop-blur

          border

          border-white/10

          text-text

          transition-all

          duration-300

          hover:bg-accent

          hover:text-background

        "

      >

        <ChevronRight size={22}/>

      </button>







      <div

        className="

          absolute

          bottom-5

          left-1/2

          -translate-x-1/2

          flex

          gap-2

        "

      >


        {

          items.map((item,index)=>(

            <button

              key={item.id}

              onClick={() => setCurrent(index)}

              aria-label={`Afficher image ${index+1}`}

              className={`

                h-2

                rounded-full

                transition-all

                duration-300

                ${

                  current === index

                  ?

                  "w-8 bg-accent"

                  :

                  "w-2 bg-white/40"

                }

              `}

            />


          ))

        }


      </div>



    </div>

  );

}