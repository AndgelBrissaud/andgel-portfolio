import Header from "../components/layout/Header";

import ExpertiseSection from "../components/sections/ExpertiseSection";

import PortfolioSection from "../components/sections/PortfolioSection";

import ContactSection from "../components/sections/ContactSection";





export default function Home() {


    return (

        <main

            className="
                bg-background
                text-text
            "

        >



            <Header />







            {/* INTRODUCTION */}

            <section

                className="
                    py-20
                    md:py-28
                "

            >


                <div

                    className="
                        mx-auto
                        max-w-5xl
                        px-6
                        text-center
                    "

                >



                    <p

                        className="
                            mb-5
                            text-xs
                            uppercase
                            tracking-[0.4em]
                            text-accent
                        "

                    >

                        Développeur Full Stack · Photographe

                    </p>





                    <h2

                        className="
                            font-title
                            text-4xl
                            md:text-6xl
                            leading-tight
                        "

                    >

                        Des expériences numériques
                        pensées comme des œuvres.

                    </h2>





                    <p

                        className="
                            mt-8
                            mx-auto
                            max-w-3xl
                            text-text-soft
                            leading-relaxed
                        "

                    >

                        Je conçois des interfaces modernes,
                        élégantes et performantes en associant
                        développement web, design et photographie.

                    </p>



                </div>


            </section>








            <ExpertiseSection />



            <PortfolioSection />



            <ContactSection />





        </main>

    );

}