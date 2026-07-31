import type { ReactNode } from "react";

interface Props{

    children: ReactNode;

}

export default function AdminCard({

    children

}:Props){

    return (
        <div className="admin-card">
            <div className="card-content">{children}</div>
        </div>
    );

}