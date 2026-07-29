import { useCallback, useEffect, useState } from "react";

import AdminSection from "../../components/admin/layout/AdminSection";

import ServerProjectsList from "../../components/admin/server/ServerProjectsList";
import ComposeEditor from "../../components/admin/server/ComposeEditor";
import LogsViewer from "../../components/admin/server/LogsViewer";

import serverManagementApi from "../../services/serverManagement.api";

import type { ServerProject } from "../../types/server";

export default function AdminServer() {
  const [projects, setProjects] = useState<ServerProject[]>([]);

  const [loading, setLoading] = useState(true);

  const [selectedComposeProject, setSelectedComposeProject] =
    useState<ServerProject | null>(null);

  const [selectedLogs, setSelectedLogs] = useState<{
    project: ServerProject;
    type: "frontend" | "backend";
  } | null>(null);

  const [composeContent, setComposeContent] = useState("");

  const [composeLoading, setComposeLoading] = useState(false);

  const [composeSaving, setComposeSaving] = useState(false);

  const [logsContent, setLogsContent] = useState("");

  const [logsLoading, setLogsLoading] = useState(false);

  const [systemInfo, setSystemInfo] = useState<import("../../types/server").SystemInfo | null>(null);
  const [systemLoading, setSystemLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const loadProjects = useCallback(async () => {
    try {
      setLoading(true);

      const data = await serverManagementApi.getProjects();

      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {

    let cancelled = false;

    async function refreshProjects(){

      if(cancelled){
        return;
      }

      await loadProjects();

    }

    void Promise.resolve().then(refreshProjects);

    const interval = window.setInterval(() => {

      void Promise.resolve().then(refreshProjects);

    },10000);

    return () => {

      cancelled = true;

      window.clearInterval(interval);

    };

  }, [loadProjects]);

  useEffect(() => {
    if (!selectedComposeProject) return;

    const projectId = selectedComposeProject.id;

    async function loadCompose() {
      try {
        setComposeLoading(true);

        const compose = await serverManagementApi.getCompose(projectId);

        setComposeContent(compose);
      } catch (error) {
        console.error(error);
      } finally {
        setComposeLoading(false);
      }
    }

    void Promise.resolve().then(loadCompose);
  }, [selectedComposeProject]);

  useEffect(() => {
    if (!selectedLogs) return;

    const projectId = selectedLogs.project.id;
    const logType = selectedLogs.type;

    async function loadLogs() {
      try {
        setLogsLoading(true);

        const logs = await serverManagementApi.getProjectLogs(projectId, logType);

        setLogsContent(logs);
      } catch (error) {
        console.error(error);
      } finally {
        setLogsLoading(false);
      }
    }

    void Promise.resolve().then(loadLogs);
  }, [selectedLogs]);

  useEffect(() => {
    let cancelled = false;

    async function loadSystem() {
      try {
        if (!cancelled) {
          setSystemLoading(true);
        }

        const info = await serverManagementApi.getSystemInfo();

        if (!cancelled) {
          setSystemInfo(info);
          setLastUpdate(new Date());
        }

      } catch (error) {

        console.error(error);

      } finally {

        if (!cancelled) {
          setSystemLoading(false);
        }

      }
    }

    void Promise.resolve().then(loadSystem);

    const interval = window.setInterval(() => {

      void Promise.resolve().then(loadSystem);

    }, 5000);

    return () => {

      cancelled = true;

      window.clearInterval(interval);

    };

  }, []);

  async function saveCompose(content: string) {
    if (!selectedComposeProject) return;

    const projectId = selectedComposeProject.id;

    try {
      setComposeSaving(true);

      await serverManagementApi.updateCompose(projectId, content);

      setComposeContent(content);

      alert("docker-compose enregistré.");
    } catch (error) {
      console.error(error);

      alert(error instanceof Error ? error.message : "Erreur");
    } finally {
      setComposeSaving(false);
    }
  }

  return (
    <>
      <AdminSection
        title="Gestion du serveur"
        subtitle="
          Surveillance et administration
          des services du portfolio.
        "
      >
        <div className="mb-4 flex items-center justify-end">
          <button
            type="button"
            className="btn-primary"
            onClick={async () => {
              const name = window.prompt("Nom du projet (ex: mon-projet)");
              if (!name) return;

              const path = window.prompt("Chemin du projet sur le serveur (ex: /opt/docker/mon-projet)");
              if (!path) return;

              try {
                await serverManagementApi.addProject(name, path);

                await loadProjects();

                alert("Projet ajouté");
              } catch (error) {
                console.error(error);
                alert(error instanceof Error ? error.message : "Erreur");
              }
            }}
          >
            ➕ Ajouter un projet
          </button>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">Ressources serveur</h4>

          {systemLoading || !systemInfo ? (
            <div className="text-text-muted">Chargement des ressources...</div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-surface p-4">
                <p className="text-sm text-text-muted">Mémoire</p>
                <p className="mt-2 font-title text-xl">
                  {Math.round(systemInfo.memory.used / (1024 * 1024))} Mo / {Math.round(systemInfo.memory.total / (1024 * 1024))} Mo
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-surface p-4">
                <p className="text-sm text-text-muted">Disque (/) </p>
                <p className="mt-2 font-title text-xl">
                  {systemInfo.disk ? `${Math.round(systemInfo.disk.used / (1024 * 1024 * 1024))} Go / ${Math.round(systemInfo.disk.total / (1024 * 1024 * 1024))} Go` : "N/A"}
                </p>
              </div>
              </div>

              <p className="text-xs text-text-muted mt-2">
                Mise à jour : {lastUpdate ? lastUpdate.toLocaleTimeString() : "-"}
              </p>
            </>
          )}
        </div>
        <div
          className="
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          <ServerCard
            title="Projets"
            value={loading ? "..." : String(projects.length)}
            description="Projets Docker enregistrés."
          />

          <ServerCard
            title="Docker"
            value={projects.length ? "Connecté" : "Aucun projet"}
            description="Etat du moteur Docker."
          />

          <ServerCard
            title="Frontend"
            value={`${projects.filter((p) => p.frontend_container).length} services`}
            description="Containers frontend détectés."
          />

          <ServerCard
            title="Backend"
            value={`${projects.filter((p) => p.backend_container).length} services`}
            description="Containers backend détectés."
          />
        </div>
      </AdminSection>
      <AdminSection
        title="Projets Docker"
        subtitle="
          Gestion des applications installées
          sur le serveur.
        "
      >
        {loading ? (
          <div
            className="
              rounded-2xl
              border
              border-white/10
              bg-surface
              p-8
              text-center
              text-text-muted
            "
          >
            Chargement des projets...
          </div>
        ) : (
          <ServerProjectsList
            projects={projects}
            onRefresh={loadProjects}
            onSelectCompose={(project) => {
              setSelectedComposeProject(project);
            }}
            onSelectLogs={(project, type) => {
              setSelectedLogs({
                project,
                type,
              });
            }}
          />
        )}
      </AdminSection>

      {selectedComposeProject && (
        <AdminSection
          title="Docker Compose"
          subtitle={selectedComposeProject.name}
        >
          <ComposeEditor
            content={composeContent}
            loading={composeLoading}
            saving={composeSaving}
            onSave={saveCompose}
          />
        </AdminSection>
      )}

      {selectedLogs && (
        <AdminSection
          title="Logs Docker"
          subtitle={`${selectedLogs.project.name} · ${selectedLogs.type}`}
        >
          <LogsViewer
            logs={logsContent}
            loading={logsLoading}
          />
        </AdminSection>
      )}
    </>
  );
}

interface ServerCardProps {
  title: string;

  value: string;

  description: string;
}

function ServerCard({ title, value, description }: ServerCardProps) {
  return (
    <article
      className="
        rounded-2xl
        border
        border-white/10
        bg-surface
        p-6
      "
    >
      <p
        className="
          text-xs
          uppercase
          tracking-[0.25em]
          text-accent
        "
      >
        {title}
      </p>

      <h3
        className="
          mt-4
          font-title
          text-3xl
        "
      >
        {value}
      </h3>

      <p
        className="
          mt-3
          text-sm
          text-text-muted
        "
      >
        {description}
      </p>
    </article>
  );
}
