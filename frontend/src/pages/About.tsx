import SectionTitle from "../components/ui/SectionTitle";

export default function About() {
  return (
    <main
      className="
                relative

                overflow-hidden

                bg-background

                text-text

                min-h-screen
            "
    >
      {/* lumière générale */}

      <div
        className="
                    absolute

                    top-0

                    left-1/2

                    -translate-x-1/2

                    h-[500px]

                    w-[500px]

                    rounded-full

                    bg-accent/10

                    blur-[160px]

                    pointer-events-none
                "
      />

      {/* INTRO */}

      <section
        className="
                    relative

                    pt-36

                    pb-20
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
          <SectionTitle
            eyebrow="À propos de moi"
            title="Je suis Andgel — développeur & photographe"
            description={`Je suis développeur Full Stack et photographe. J'aime résoudre
                            des problèmes techniques tout en soignant l'esthétique des
                            interfaces. Ici je présente mon parcours, ma méthode et ce qui
                            m'anime au quotidien.`}
          />
        </div>
      </section>

      {/* PRESENTATION */}

      <section
        className="
                    relative

                    py-20
                "
      >
        <div
          className="
                        mx-auto

                        max-w-7xl

                        px-6

                        grid

                        grid-cols-1

                        lg:grid-cols-12

                        gap-12

                        items-center
                    "
        >
          {/* TEXTE */}

          <div
            className="
                            lg:col-span-6

                            max-w-xl
                        "
          >
            <p className="text-xs uppercase tracking-[0.45em] text-accent mb-4">
              Mon parcours
            </p>

            <h2
              className="
                                font-title

                                text-4xl

                                md:text-5xl

                                leading-[1.05]
                            "
            >
              Je transforme des idées en expériences digitales.
            </h2>

            <div
              className="
                                mt-6

                                space-y-4

                                text-text-soft

                                leading-relaxed
                            "
            >
              <p>
                Je conçois des applications web de bout en bout : architecture
                backend, UI réactive et optimisation des performances. J'attache
                autant d'importance au code propre qu'à l'expérience
                utilisateur.
              </p>

              <p>
                En parallèle, la photographie est mon terrain d'expérimentation
                visuelle — elle influence mon sens du cadrage, de la lumière et
                du détail dans mes interfaces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VALEURS: section retirée */}
    </main>
  );
}
