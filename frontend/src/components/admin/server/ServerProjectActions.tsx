import Button from "../../ui/Button";

interface Props {
  onRefresh: () => void;

  onCompose: () => void;

  onFrontendLogs: () => void;

  onBackendLogs: () => void;

  loading?: boolean;
}

export default function ServerProjectActions({
  onRefresh,
  onCompose,
  onFrontendLogs,
  onBackendLogs,
  loading = false,
}: Props) {
  return (
    <div className="server-actions">
      <Button onClick={onRefresh} disabled={loading} compact className="server-action">🔁 Rafraîchir</Button>

      <Button onClick={onCompose} disabled={loading} compact className="server-action">🛠️ Composer</Button>

      <Button onClick={onFrontendLogs} disabled={loading} compact className="server-action">📄 Frontend logs</Button>

      <Button onClick={onBackendLogs} disabled={loading} compact className="server-action">📄 Backend logs</Button>
    </div>
  );
}
