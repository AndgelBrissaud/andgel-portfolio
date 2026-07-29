import { useEffect, useRef } from "react";

interface Props {
  logs: string;

  loading?: boolean;

  height?: number;
}

export default function LogsViewer({
  logs,
  loading = false,
  height = 450,
}: Props) {
  const containerRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.scrollTop =
      containerRef.current.scrollHeight;
  }, [logs]);

  if (loading) {
    return (
      <div className="logs-viewer-loading">
        Chargement des logs...
      </div>
    );
  }

  return (
    <pre
      ref={containerRef}
      className="logs-viewer"
      style={{
        height,
        overflowY: "auto",
      }}
    >
      {logs || "Aucun log disponible."}
    </pre>
  );
}