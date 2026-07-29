import { Link } from "react-router-dom";

import SectionTitle from "../components/ui/SectionTitle";

import useProjects from "../hooks/useProjects";

import { getImageUrl } from "../services/api";

export default function Projects() {
  const {
    projects,

    loading,

    error,
  } = useProjects();

  return (
    <main
      className="
                min-h-screen
                bg-background
                text-text
            "
    >
      {/* HEADER */}

      <section
        className="
                    pt-24
                    pb-10
                "
      >
        <div
          className="
                        mx-auto
                        max-w-6xl
                        px-6
                    "
        >
          <SectionTitle
            eyebrow="Portfolio"
            title="Mes projets"
            description="
                            Une sélection de projets mêlant développement,
                            design et expériences numériques.
                        "
          />
        </div>
      </section>

      {/* LOADING */}

      {loading && (
        <section
          className="
                            flex
                            min-h-[300px]
                            items-center
                            justify-center
                            text-sm
                            text-text-muted
                        "
        >
          Chargement des projets...
        </section>
      )}

      {/* ERROR */}

      {error && (
        <section
          className="
                            flex
                            min-h-[300px]
                            items-center
                            justify-center
                            text-sm
                            text-red-400
                        "
        >
          {error}
        </section>
      )}

      {/* EMPTY */}

      {!loading && !error && projects.length === 0 && (
        <section className="flex min-h-[300px] items-center justify-center">
          <div className="text-center px-6">
            <h3 className="text-xl font-semibold mb-2">Aucun projet pour le moment</h3>
            <p className="text-sm text-text-muted mb-4">Je travaille actuellement sur de nouveaux projets. N'hésitez pas à me contacter pour discuter d'une collaboration.</p>
            <Link to="/contact" className="inline-block text-accent hover:text-accent-light">Contactez‑moi →</Link>
          </div>
        </section>
      )}

      {/* PROJECTS */}

      {!loading && !error && projects.length > 0 && (
        <section
          className="
                            pb-16
                        "
        >
          <div
            className="
                                mx-auto
                                max-w-6xl
                                px-6
                            "
          >
            <div
              className="
                                    grid
                                    grid-cols-1
                                    gap-6
                                    md:grid-cols-2
                                "
            >
              {projects.map((project) => (
                <article
                  key={project.id}
                  className="
                                                    group
                                                    flex
                                                    flex-col
                                                    overflow-hidden
                                                    rounded-radius-lg
                                                    border
                                                    border-white/10
                                                    bg-surface
                                                    transition-all
                                                    duration-duration-base
                                                    hover:border-accent/50
                                                    hover:-translate-y-1
                                                "
                >
                  {/* IMAGE */}

                  <div
                    className="
                                                        relative
                                                        aspect-[16/9]
                                                        overflow-hidden
                                                    "
                  >
                    <img
                      src={getImageUrl(project.image)}
                      alt={project.title}
                      className="
                                                            h-full
                                                            w-full
                                                            object-cover
                                                            transition-transform
                                                            duration-duration-slow
                                                            group-hover:scale-105
                                                        "
                    />

                    <div
                      className="
                                                            pointer-events-none
                                                            absolute
                                                            inset-0
                                                            bg-gradient-to-t
                                                            from-black/60
                                                            via-transparent
                                                            to-transparent
                                                        "
                    />
                  </div>

                  {/* CONTENT */}

                  <div
                    className="
                                                        flex
                                                        flex-1
                                                        flex-col
                                                        p-5
                                                    "
                  >
                    {project.category && (
                      <p
                        className="
                                                                    text-xs
                                                                    uppercase
                                                                    tracking-[0.25em]
                                                                    text-accent
                                                                "
                      >
                        {project.category}
                      </p>
                    )}

                    <h2
                      className="
                                                            mt-3
                                                            font-title
                                                            text-2xl
                                                            leading-tight
                                                        "
                    >
                      {project.title}
                    </h2>

                    <p
                      className="
                                                            mt-3
                                                            line-clamp-3
                                                            text-sm
                                                            leading-relaxed
                                                            text-text-soft
                                                        "
                    >
                      {project.description}
                    </p>

                    <div
                      className="
                                                            mt-auto
                                                            flex
                                                            items-center
                                                            justify-between
                                                            gap-4
                                                            border-t
                                                            border-white/10
                                                            pt-5
                                                        "
                    >
                      <div
                        className="
                                                                flex
                                                                flex-wrap
                                                                gap-2
                                                            "
                      >
                        {project.technical

                          ?.slice(0, 3)

                          .map((tech) => (
                            <span
                              key={tech}
                              className="
                                                                                    rounded-radius-full
                                                                                    border
                                                                                    border-white/10
                                                                                    px-3
                                                                                    py-1
                                                                                    text-[11px]
                                                                                    text-text-muted
                                                                                "
                            >
                              {tech}
                            </span>
                          ))}
                      </div>

                      {project.slug && (
                        <Link
                          to={`/projects/${project.slug}`}
                          className="
                                                                        shrink-0
                                                                        text-sm
                                                                        text-accent
                                                                        transition-colors
                                                                        hover:text-accent-light
                                                                    "
                        >
                          Découvrir →
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
