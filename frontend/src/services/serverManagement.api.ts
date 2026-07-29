import api from "./api";

import type {
  AddProjectResponse,
  ProjectStatus,
  ServerActionResponse,
  ServerProject,
} from "../types/server";


class ServerManagementApi {


  async getProjects(): Promise<ServerProject[]> {

    const { data } =
      await api.get<ServerProject[]>(
        "/server/projects",
      );

    return data;

  }





  async addProject(
    name: string,

    path: string,
  ): Promise<AddProjectResponse> {


    const { data } =
      await api.post<AddProjectResponse>(
        "/server/projects",

        {
          name,

          path,
        },
      );


    return data;

  }





  async getProjectStatus(
    id: number,
  ): Promise<ProjectStatus> {


    const { data } =
      await api.get<ProjectStatus>(
        `/server/projects/${id}/status`,
      );


    return data;

  }





  async pullProject(
    id: number,
  ): Promise<ServerActionResponse> {


    const { data } =
      await api.post<ServerActionResponse>(
        `/server/projects/${id}/pull`,
      );


    return data;

  }





  async upProject(
    id: number,
  ): Promise<ServerActionResponse> {


    const { data } =
      await api.post<ServerActionResponse>(
        `/server/projects/${id}/up`,
      );


    return data;

  }





  async downProject(
    id: number,
  ): Promise<ServerActionResponse> {


    const { data } =
      await api.post<ServerActionResponse>(
        `/server/projects/${id}/down`,
      );


    return data;

  }





  async restartProject(
    id: number,
  ): Promise<ServerActionResponse> {


    const { data } =
      await api.post<ServerActionResponse>(
        `/server/projects/${id}/restart`,
      );


    return data;

  }





  async getCompose(
    id: number,
  ): Promise<string> {


    const { data } =
      await api.get<string>(
        `/server/projects/${id}/compose`,

        {
          responseType: "text",
        },
      );


    return data;

  }





  async updateCompose(
    id: number,

    content: string,
  ): Promise<ServerActionResponse> {


    const { data } =
      await api.put<ServerActionResponse>(
        `/server/projects/${id}/compose`,

        {
          content,
        },
      );


    return data;

  }





  async getLogs(
    container: string,
  ): Promise<string> {


    const { data } =
      await api.get<string>(
        `/server/logs/${container}`,

        {
          responseType: "text",
        },
      );


    return data;

  }





  async getProjectLogs(
    id: number,

    type: "frontend" | "backend",
  ): Promise<string> {


    const { data } =
      await api.get<string>(
        `/server/projects/${id}/logs/${type}`,

        {
          responseType: "text",
        },
      );


    return data;

  }


}


export default new ServerManagementApi();