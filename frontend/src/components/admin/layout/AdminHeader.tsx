import type { AdminSection } from "../../../pages/Admin";

interface AdminHeaderProps {
    activeSection: AdminSection;
    onLogout: () => void;
}

const labels: Record<AdminSection, string> = {
    dashboard: "Dashboard",
    projects: "Projets",
    photos: "Photos",
    server: "Serveur",
};

export default function AdminHeader({ activeSection, onLogout }: AdminHeaderProps) {
    return (
        <header className="border-b border-white/10 bg-background px-6 py-4">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
                <div>
                    <h2 className="font-title text-xl">{labels[activeSection]}</h2>
                </div>

                <div className="flex items-center gap-3">
                    <button onClick={onLogout} className="rounded-xl bg-red-500/10 px-4 py-2 text-sm text-red-300 hover:bg-red-500/20">Déconnexion</button>
                </div>
            </div>
        </header>
    );
}
