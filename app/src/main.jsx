import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../styles.css";

// Roteamento mínimo por pathname (sem react-router). As páginas de autenticação são carregadas
// sob demanda (code-split) — o @supabase/supabase-js só entra no bundle das rotas /auth/*.
const AceitarConvite = lazy(() => import("./screens/auth/AceitarConvite.jsx"));
const RedefinirSenha = lazy(() => import("./screens/auth/RedefinirSenha.jsx"));

function Raiz() {
  const path = window.location.pathname;
  if (path.startsWith("/auth/convite")) {
    return (
      <Suspense fallback={null}>
        <AceitarConvite />
      </Suspense>
    );
  }
  if (path.startsWith("/auth/redefinir-senha")) {
    return (
      <Suspense fallback={null}>
        <RedefinirSenha />
      </Suspense>
    );
  }
  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<Raiz />);
