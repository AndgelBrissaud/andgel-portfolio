export interface ServerContainer {
  id: string;

  name: string;

  image: string;

  state: string;

  status: string;
}

export interface ServerProject {
  id: number;

  name: string;

  path: string;

  compose_file: string;

  frontend_container: string | null;

  backend_container: string | null;

  status: "running" | "stopped";

  created_at: string;
}

export interface ProjectStatus {
  project_id: number;

  name: string;

  status: "running" | "stopped";

  containers: ServerContainer[];

  frontend: {
    name: string;

    running: boolean;
  } | null;

  backend: {
    name: string;

    running: boolean;
  } | null;
}

export interface ServerActionResponse {
  success: boolean;

  message?: string;
}

export interface AddProjectResponse {
  created: boolean;

  message: string;

  project: ServerProject;
}

export interface ComposeValidationError {
  valid: boolean;

  errors: string[];
}