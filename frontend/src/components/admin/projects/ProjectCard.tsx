import {

    Pencil,

    Trash2,

    Calendar,

    FolderOpen

} from "lucide-react";

import {

    getImageUrl,

    type Project

} from "../../../services/api";

interface Props{

    project:Project;

    onEdit:(project:Project)=>void;

    onDelete:(project:Project)=>void;

}

export default function ProjectCard({

    project,

    onEdit,

    onDelete

}:Props){

    return(

        <article

            className="
                group
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-surface
                transition-all
                duration-300
                hover:border-accent/40
                hover:shadow-2xl
            "

        >

            <div

                className="
                    grid
                    lg:grid-cols-[280px_1fr]
                "

            >

                <div

                    className="
                        relative
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
                            duration-500
                            group-hover:scale-105
                        "

                    />

                </div>

                <div

                    className="
                        flex
                        flex-col
                        p-8
                    "

                >

                    <div

                        className="
                            flex
                            items-start
                            justify-between
                            gap-6
                        "

                    >

                        <div>

                            <h3

                                className="
                                    font-title
                                    text-3xl
                                "

                            >

                                {project.title}

                            </h3>

                            <p

                                className="
                                    mt-4
                                    max-w-3xl
                                    leading-relaxed
                                    text-text-muted
                                "

                            >

                                {project.description}

                            </p>

                        </div>

                        <div

                            className="
                                flex
                                gap-3
                            "

                        >

                            <button

                                onClick={()=>onEdit(project)}

                                className="
                                    rounded-full
                                    border
                                    border-white/10
                                    p-3
                                    transition
                                    hover:border-accent
                                    hover:text-accent
                                "

                            >

                                <Pencil size={18}/>

                            </button>

                            <button

                                onClick={()=>onDelete(project)}

                                className="
                                    rounded-full
                                    border
                                    border-white/10
                                    p-3
                                    transition
                                    hover:border-red-500
                                    hover:text-red-400
                                "

                            >

                                <Trash2 size={18}/>

                            </button>

                        </div>

                    </div>

                    <div

                        className="
                            mt-8
                            flex
                            flex-wrap
                            gap-5
                            text-sm
                            text-text-muted
                        "

                    >

                        <div

                            className="
                                flex
                                items-center
                                gap-2
                            "

                        >

                            <Calendar size={16}/>

                            {project.year}

                        </div>

                        {

                            project.category &&

                            <div

                                className="
                                    flex
                                    items-center
                                    gap-2
                                "

                            >

                                <FolderOpen size={16}/>

                                {project.category}

                            </div>

                        }

                    </div>

                    <div

                        className="
                            mt-8
                            flex
                            flex-wrap
                            gap-2
                        "

                    >

                        {

                            project.technical.map(

                                tech=>(

                                    <span

                                        key={tech}

                                        className="
                                            rounded-full
                                            border
                                            border-white/10
                                            bg-white/5
                                            px-4
                                            py-2
                                            text-xs
                                            tracking-wide
                                            text-text-muted
                                        "

                                    >

                                        {tech}

                                    </span>

                                )

                            )

                        }

                    </div>

                </div>

            </div>

        </article>

    );

}