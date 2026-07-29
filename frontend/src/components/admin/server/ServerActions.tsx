import Button from "../../ui/Button";

interface Props {
  onPull: () => void;
  onUp: () => void;
  onDown: () => void;
  onRestart: () => void;
  loading?: boolean;
}

export default function ServerActions({
  onPull,
  onUp,
  onDown,
  onRestart,
  loading = false,
}: Props) {
  return (
    <div className="server-actions">
      <Button onClick={onPull} disabled={loading} compact className="server-action">⬇ Pull</Button>

      <Button onClick={onUp} disabled={loading} compact className="server-action">▶ Démarrer</Button>

      <Button onClick={onDown} disabled={loading} compact className="server-action">■ Arrêter</Button>

      <Button onClick={onRestart} disabled={loading} compact className="server-action">↻ Redémarrer</Button>
    </div>
  );
}