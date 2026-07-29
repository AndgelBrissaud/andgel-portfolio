import type {
    AdminSection
} from "../../../pages/Admin";

import { NavLink } from "react-router-dom";





interface AdminHeaderProps {


    activeSection:AdminSection;


    onNavigate:(

        section:AdminSection
                <nav className="flex items-center gap-3">
                    <NavLink to="/" className="text-sm text-text-soft hover:text-accent px-3 py-2 rounded-md">Accueil</NavLink>

                    <div className="h-6 w-px bg-white/5" />

                    <div className="flex flex-wrap gap-3">
                        {
                            items.map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => onNavigate(item.id)}
                                    className={
                                        `rounded-xl px-4 py-2 text-sm transition ${activeSection === item.id ? 'bg-accent text-black' : 'bg-white/5 text-white hover:bg-white/10'}`
                                    }
                                >
                                    {item.label}
                                </button>
                            ))
                        }
                    </div>
                </nav>

            id:"server",

            label:"Serveur"

        }


    ];









    return (
import type { AdminSection } from "../../../pages/Admin";

interface AdminHeaderProps {
    activeSection: AdminSection;
    onNavigate: (section: AdminSection) => void;
    onLogout: () => void;
}

const labels: Record<AdminSection, string> = {
    dashboard: "Dashboard",
    projects: "Projets",
    photos: "Photos",
    server: "Serveur",
};

export default function AdminHeader({ activeSection, onNavigate, onLogout }: AdminHeaderProps) {
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