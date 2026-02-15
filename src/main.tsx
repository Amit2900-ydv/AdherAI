import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { PatientProvider } from "./app/context/PatientContext.tsx";
import { AuthProvider } from "./app/context/AuthContext.tsx";
import { LanguageProvider } from "./app/context/LanguageContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <LanguageProvider>
      <PatientProvider>
        <App />
      </PatientProvider>
    </LanguageProvider>
  </AuthProvider>
);