import {
  useEffect,
  useRef,
  useState
} from "react";


export default function useScrollAnimation() {


  const ref = useRef<HTMLElement | null>(null);


  const [isVisible, setIsVisible] = useState(false);



  useEffect(() => {


    const element = ref.current;


    if (!element) {

      return;

    }



    const observer = new IntersectionObserver(

      ([entry]) => {


        if (entry.isIntersecting) {


          setIsVisible(true);


          observer.unobserve(element);


        }


      },

      {
        threshold: 0.15
      }

    );



    observer.observe(element);



    return () => {

      observer.disconnect();

    };


  }, []);



  return {

    ref,

    isVisible

  };

}