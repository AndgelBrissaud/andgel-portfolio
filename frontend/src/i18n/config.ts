import i18n from "i18next";

import {
  initReactI18next
} from "react-i18next";

import LanguageDetector
  from "i18next-browser-languagedetector";



const resources = {


  fr: {

    translation: {

      navbar: {

        home: "Accueil",
        projects: "Projets",
        photography: "Photographie",
        about: "À propos",
        contact: "Contact"

      },


      common: {

        viewProject: "Voir le projet",
        technologies: "Technologies",
        gallery: "Galerie",
        equipment: "Matériel"

      },


      hero: {

        title:
          "Développeur & Photographe",

        subtitle:
          "Je crée des expériences numériques élégantes et immersives."

      }


    }

  },


  en: {

    translation: {


      navbar: {

        home: "Home",
        projects: "Projects",
        photography: "Photography",
        about: "About",
        contact: "Contact"

      },


      common: {

        viewProject: "View project",
        technologies: "Technologies",
        gallery: "Gallery",
        equipment: "Equipment"

      },


      hero: {

        title:
          "Developer & Photographer",

        subtitle:
          "I create elegant and immersive digital experiences."

      }


    }

  }


};



i18n

  .use(
    LanguageDetector
  )

  .use(
    initReactI18next
  )

  .init({

    resources,


    fallbackLng:
      "fr",


    supportedLngs: [
      "fr",
      "en"
    ],


    detection: {

      order: [
        "localStorage",
        "navigator"
      ],


      caches: [
        "localStorage"
      ],


      lookupLocalStorage:
        "andgel-language"

    },


    interpolation: {

      escapeValue:
        false

    }


  });



export default i18n;