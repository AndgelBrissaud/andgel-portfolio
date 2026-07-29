import Header from "../components/layout/Header";

import PortfolioSection from "../components/sections/PortfolioSection";


export default function Home() {


    return (

        <main className="bg-background text-text">


            <Header />



            {/* INTRODUCTION — résumé technique */}

            <section className="py-20 md:py-28">

                <div className="mx-auto max-w-5xl px-6 text-center">


                    <p className="mb-5 text-xs uppercase tracking-[0.4em] text-accent">

                        Développeur Full Stack · Passionné de photographie

                    </p>

                    <h2 className="font-title text-4xl md:text-6xl leading-tight">

                        Interfaces performantes. Images soignées.

                    </h2>

                    <p className="mt-6 mx-auto max-w-2xl text-text-soft leading-relaxed">

                        Je conçois et développe des expériences web robustes et performantes. À côté du développement, je pratique la photographie avec le même souci du détail.

                    </p>

                </div>

            </section>



            <PortfolioSection />



        </main>

    );

}
