import { Router } from "express";

import serverManagementController from "../controllers/serverManagement.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| AUTHENTIFICATION ADMIN
|--------------------------------------------------------------------------
*/

router.use(authMiddleware);

/*
|--------------------------------------------------------------------------
| PROJECTS
|--------------------------------------------------------------------------
*/

router.get("/projects", async (_req, res) => {
  try {
    const projects = await serverManagementController.getProjects();

    return res.json(projects);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Erreur récupération projets" });
  }
});

router.post("/projects", async (req, res) => {
  try {
    const { name, path } = req.body;

    const data = await serverManagementController.addProject({ name, path });

    return res.status(201).json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Erreur ajout projet" });
  }
});

router.get("/projects/:id/status", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Identifiant invalide" });
    }

    const status = await serverManagementController.getProjectStatus(id);

    return res.json(status);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Erreur récupération status" });
  }
});

/*
|--------------------------------------------------------------------------
| DOCKER COMPOSE ACTIONS
|--------------------------------------------------------------------------
*/

router.post("/projects/:id/pull", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Identifiant invalide" });
    }

    const result = await serverManagementController.pullProject(id);

    return res.json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Erreur pull projet" });
  }
});

router.post("/projects/:id/up", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Identifiant invalide" });
    }

    const result = await serverManagementController.upProject(id);

    return res.json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Erreur up projet" });
  }
});

router.post("/projects/:id/down", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Identifiant invalide" });
    }

    const result = await serverManagementController.downProject(id);

    return res.json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Erreur down projet" });
  }
});

router.post("/projects/:id/restart", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Identifiant invalide" });
    }

    const result = await serverManagementController.restartProject(id);

    return res.json(result);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Erreur restart projet" });
  }
});

/*
|--------------------------------------------------------------------------
| COMPOSE EDITOR
|--------------------------------------------------------------------------
*/

router.get("/projects/:id/compose", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) return res.status(400).json({ message: "Identifiant invalide" });

    const compose = await serverManagementController.getCompose(id);

    return res.type("text").send(compose);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Erreur récupération compose" });
  }
});

router.get("/system", async (_req, res) => {
  try {
    const info = await serverManagementController.getSystemInfo();

    return res.json(info);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Erreur récupération système" });
  }
});

router.put("/projects/:id/compose", async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) return res.status(400).json({ message: "Identifiant invalide" });

    const { content } = req.body;

    await serverManagementController.updateCompose(id, content);

    return res.json({ success: true });
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Erreur mise à jour compose" });
  }
});

/*
|--------------------------------------------------------------------------
| LOGS PROJECT
|--------------------------------------------------------------------------
*/

router.get("/projects/:id/logs/:type", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const type = req.params.type as "frontend" | "backend";

    if (Number.isNaN(id)) return res.status(400).json({ message: "Identifiant invalide" });

    const logs = await serverManagementController.getProjectLogs(id, type);

    return res.type("text").send(logs);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Erreur récupération logs" });
  }
});

/*
|--------------------------------------------------------------------------
| LOGS CONTAINER
|--------------------------------------------------------------------------
*/

router.get("/logs/:container", async (req, res) => {
  try {
    const container = req.params.container as string;

    const logs = await serverManagementController.getLogs(container);

    return res.type("text").send(logs);
  } catch (error) {
    console.error(error);

    return res.status(500).json({ message: "Erreur récupération logs" });
  }
});

export default router;
