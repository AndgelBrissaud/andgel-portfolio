import { StrictMode } from "react";

import { createRoot } from "react-dom/client";


import "./styles/global.css";

import "./i18n/config";


import App from "./App";


import AuthProvider from "./context/AuthProvider";
import { ToastProvider } from "./context/ToastContext";
import Toaster from "./components/ui/Toaster";





const rootElement = document.getElementById("root");





if (!rootElement) {

    throw new Error(

        "Impossible de trouver l'élément root."

    );

}







createRoot(rootElement).render(
    <StrictMode>
        <AuthProvider>
            <ToastProvider>
                <App />
                <Toaster />
            </ToastProvider>
        </AuthProvider>
    </StrictMode>
);