import db from "../config/database.js";

import dockerUtils from "../utils/docker.utils.js";

import composeUtils from "../utils/compose.utils.js";

import projectDetectionUtils from "../utils/projectDetection.utils.js";

import composeValidationUtils from "../utils/composeValidation.utils.js";

import logsUtils from "../utils/logs.utils.js";

import pathUtils from "path";

export interface ServerProject {
  id: number;

  name: string;

  path: string;

  compose_file: string;

  frontend_container: string | null;

  backend_container: string | null;

  status: string;

  created_at: string;
}

class ServerManagementService {
  async getProjects(): Promise<ServerProject[]> {
    const projects = db
      .prepare(
        `

            SELECT *

            FROM server_projects

            ORDER BY id DESC

        `,
      )

      .all() as ServerProject[];

    const containers = await dockerUtils.getContainers();

    for (const project of projects) {
      const projectName = project.name.toLowerCase();

      const related = containers.filter((container) =>
        container.name

          .toLowerCase()

          .includes(projectName),
      );

      project.status = related.some(
        (container) => container.state === "running",
      )
        ? "running"
        : "stopped";
    }

    return projects;
  }

  async addProject(data: {
    name: string;

    path: string;
  }) {
    const projectPath = pathUtils.resolve(data.path);

    if (!projectPath.startsWith("/opt/docker/")) {
      throw new Error("Chemin projet interdit");
    }

    if (!(await composeUtils.exists(projectPath))) {
      throw new Error("Le dossier projet n'existe pas");
    }

    if (!(await composeUtils.hasComposeFile(projectPath))) {
      throw new Error("docker-compose.yml introuvable");
    }

    const projectName = data.name

      .toLowerCase()

      .trim();

    const existing = db
      .prepare(
        `

            SELECT *

            FROM server_projects

            WHERE path = ?

            OR name = ?

        `,
      )

      .get(
        projectPath,

        projectName,
      ) as ServerProject | undefined;

    const detected = await projectDetectionUtils.detect(projectName);

    if (existing) {
      db.prepare(
        `

                UPDATE server_projects

                SET

                    frontend_container = ?,

                    backend_container = ?,

                    updated_at = CURRENT_TIMESTAMP

                WHERE id = ?

            `,
      )

        .run(
          detected.frontend_container ?? null,

          detected.backend_container ?? null,

          existing.id,
        );

      return {
        created: false,

        message: "Projet déjà existant, liaison récupérée",

        project: await this.getProject(existing.id),
      };
    }

    const result = db
      .prepare(
        `

            INSERT INTO server_projects

            (

                name,

                path,

                frontend_container,

                backend_container

            )

            VALUES

            (

                ?,

                ?,

                ?,

                ?

            )

        `,
      )

      .run(
        projectName,

        projectPath,

        detected.frontend_container ?? null,

        detected.backend_container ?? null,
      );

    return {
      created: true,

      message: "Projet ajouté avec détection Docker",

      project: await this.getProject(Number(result.lastInsertRowid)),
    };
  }

  private async validateComposeBeforeAction(projectPath: string) {
    const compose = await composeUtils.read(projectPath);

    const validation = composeValidationUtils.validate(compose);

    if (!validation.valid) {
      throw new Error(validation.errors.join("\n"));
    }
  }

  async pullProject(id: number) {
    const project = await this.getProject(id);

    return composeUtils.pull(project.path);
  }

  async upProject(id: number) {
    const project = await this.getProject(id);

    await this.validateComposeBeforeAction(project.path);

    return composeUtils.up(project.path);
  }

  async downProject(id: number) {
    const project = await this.getProject(id);

    return composeUtils.down(project.path);
  }

  async restartProject(id: number) {
    const project = await this.getProject(id);

    await this.validateComposeBeforeAction(project.path);

    return composeUtils.restart(project.path);
  }

  async getCompose(id: number) {
    const project = await this.getProject(id);

    return composeUtils.read(project.path);
  }

  async updateCompose(
    id: number,

    content: string,
  ) {
    const project = await this.getProject(id);

    const validation = composeValidationUtils.validate(content);

    if (!validation.valid) {
      throw new Error(validation.errors.join("\n"));
    }

    await composeUtils.write(
      project.path,

      content,
    );

    return true;
  }

  async getLogs(container: string) {
    return logsUtils.get(
      container,

      {
        lines: 200,
      },
    );
  }

  async getProjectLogs(
    id: number,

    type: "frontend" | "backend",
  ) {
    const project = await this.getProject(id);

    const container =
      type === "frontend"
        ? project.frontend_container
        : project.backend_container;

    if (!container) {
      throw new Error("Container non configuré pour ce service");
    }

    return logsUtils.get(
      container,

      {
        lines: 200,
      },
    );
  }

  async getProject(id: number): Promise<ServerProject> {
    const project = db
      .prepare(
        `

            SELECT *

            FROM server_projects

            WHERE id = ?

        `,
      )

      .get(id) as ServerProject | undefined;

    if (!project) {
      throw new Error("Projet introuvable");
    }

    return project;
  }

    async getProjectStatus(
    id:number
  ){

    const project = await this.getProject(
      id
    );


    const containers = await dockerUtils.getContainers();


    const related = containers.filter(
      container =>
        container.name
          .toLowerCase()
          .includes(
            project.name.toLowerCase()
          )
    );


    const running = related.filter(
      container =>
        container.state === "running"
    );


    return {

      project_id:project.id,

      name:project.name,

      status:
        running.length > 0
          ? "running"
          : "stopped",

      containers:related.map(
        container => ({
          name:container.name,
          image:container.image,
          state:container.state,
          status:container.status
        })
      ),

      frontend:
        project.frontend_container
          ? {
              name:project.frontend_container,
              running:
                running.some(
                  c =>
                    c.name === project.frontend_container
                )
            }
          : null,


      backend:
        project.backend_container
          ? {
              name:project.backend_container,
              running:
                running.some(
                  c =>
                    c.name === project.backend_container
                )
            }
          : null

    };

  }
}

export default new ServerManagementService();
