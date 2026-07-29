import type { ServerProject } from "../../../types/server";

import ServerStatusBadge from "./ServerStatusBadge";
import ServerProjectActions from "./ServerProjectActions";

interface Props {
  project: ServerProject;

  onRefresh: () => void;

  onSelectCompose: (project: ServerProject) => void;

  onSelectLogs: (
    project: ServerProject,
    type: "frontend" | "backend"
  ) => void;
}

export default function ServerProjectCard({
  project,
  onRefresh,
  onSelectCompose,
  onSelectLogs,
}: Props) {
  return (
    <div className="admin-card">

      <div className="admin-card-header">

        <div>
          <h3>{project.name}</h3>

          <p>{project.path}</p>
        </div>

        <ServerStatusBadge status={project.status} />
      </div>

      <div className="admin-card-body">

        <p>
          <strong>Frontend :</strong>{" "}
          {project.frontend_container ?? "Non détecté"}
        </p>

        <p>
          <strong>Backend :</strong>{" "}
          {project.backend_container ?? "Non détecté"}
        </p>

      </div>

      <ServerProjectActions
        project={project}
        onRefresh={onRefresh}
        onCompose={() => onSelectCompose(project)}
        onFrontendLogs={() => onSelectLogs(project, "frontend")}
        onBackendLogs={() => onSelectLogs(project, "backend")}
      />

    </div>
  );
}