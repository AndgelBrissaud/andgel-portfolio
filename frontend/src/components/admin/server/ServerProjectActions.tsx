import { useState } from "react";

import Button from "../../ui/Button";

import serverManagementApi from "../../../services/serverManagement.api";

import type { ServerProject } from "../../../types/server";

interface Props {
  project: ServerProject;

  onRefresh: () => void;

  onCompose: () => void;

  onFrontendLogs: () => void;

  onBackendLogs: () => void;

  loading?: boolean;
}

export default function ServerProjectActions({
  project,
  onRefresh,
  onCompose,
  onFrontendLogs,
  onBackendLogs,
  loading = false,
}: Props) {
  const [actionLoading, setActionLoading] = useState(false);

  async function handleUp() {
    try {
      setActionLoading(true);

      await serverManagementApi.upProject(project.id);

      await onRefresh();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Erreur");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDown() {
    try {
      setActionLoading(true);

      await serverManagementApi.downProject(project.id);

      await onRefresh();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Erreur");
    } finally {
      setActionLoading(false);
    }
  }

  async function handleRestart() {
    try {
      setActionLoading(true);

      await serverManagementApi.restartProject(project.id);

      await onRefresh();
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Erreur");
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div className="server-actions">
      <Button onClick={onRefresh} disabled={loading || actionLoading} compact className="server-action">
        🔁 Rafraîchir
      </Button>

      <Button onClick={onCompose} disabled={loading || actionLoading} compact className="server-action">
        🛠️ Composer
      </Button>

      <Button onClick={onFrontendLogs} disabled={loading || actionLoading} compact className="server-action">
        📄 Frontend logs
      </Button>

      <Button onClick={onBackendLogs} disabled={loading || actionLoading} compact className="server-action">
        📄 Backend logs
      </Button>

      <Button onClick={handleUp} disabled={loading || actionLoading} compact className="server-action">
        ▶️ Démarrer
      </Button>

      <Button onClick={handleDown} disabled={loading || actionLoading} compact className="server-action">
        ⏹️ Arrêter
      </Button>

      <Button onClick={handleRestart} disabled={loading || actionLoading} compact className="server-action">
        🔄 Redémarrer
      </Button>
    </div>
  );
}
