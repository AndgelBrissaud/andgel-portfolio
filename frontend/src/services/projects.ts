import poussiere from "../data/projects/poussieredantan.json";
import portfolio from "../data/projects/portfolio.json";

import type { Project } from "../types/project";



export const projects: Project[] = [

  poussiere,

  portfolio

];




export function getProjectBySlug(
  slug: string
) {

  return projects.find(

    (project) =>
      project.slug === slug

  );

}