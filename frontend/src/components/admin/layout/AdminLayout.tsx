import type { ReactNode } from "react";

interface AdminLayoutProps {

    children: ReactNode;

}

export default function AdminLayout({

    children

}: AdminLayoutProps){

    return (

        <main

            className="
                min-h-screen
                bg-background
                text-text
            "

        >

            <div

                className="
                    mx-auto
                    max-w-7xl
                    px-6
                    py-12
                    space-y-10
                "

            >

                {children}

            </div>

        </main>

    );

}