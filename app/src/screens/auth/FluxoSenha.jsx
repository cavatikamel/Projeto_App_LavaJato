import { useEffect, useState } from "react";
import {
  authConfigurado,
  estabelecerSessaoDoLink,
  definirSenha,
  encerrarSessao,
  limparUrl,
} from "../../lib/supabaseAuth.js";

/**
 * Tela isolada de definição de senha, compartilhada pelos fluxos de CONVITE e RECUPERAÇÃO.
 * Só processa: link recebido → sessão temporária (em memória) → definir senha → signOut.
 * Não faz login persistente, não mostra code/token e não os registra em console.
 */
const POLITICA_MIN = 8;

export default function FluxoSenha({ titulo, subtitulo, ctaLabel, sucessoTitulo, sucessoTexto }) {
  const [estado, setEstado] = useState("carregando"); // carregando | invalido | form | processando | sucesso
  const [senha, setSenha] = useState("");
  const [confirma, setConfirma] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    let vivo = true;
    (async () => {
      if (!authConfigurado) {
        if (vivo) setEstado("invalido");
        return;
      }
      const r = await estabelecerSessaoDoLink();
      // Limpa a URL logo após processar (sucesso ou falha): não deixa code/token no histórico.
      limparUrl();
      if (!vivo) return;
      setEstado(r.ok ? "form" : "invalido");
    })();
    return () => {
      vivo = false;
    };
  }, []);

  const validar = () => {
    if (!senha || !confirma) return "Preencha os dois campos de senha.";
    if (senha.length < POLITICA_MIN) return `A senha deve ter pelo menos ${POLITICA_MIN} caracteres.`;
    if (senha !== confirma) return "As senhas não coincidem.";
    return "";
  };

  const enviar = async (e) => {
    e.preventDefault();
    const v = validar();
    if (v) {
      setErro(v);
      return;
    }
    setErro("");
    setEstado("processando");
    const r = await definirSenha(senha);
    if (r.ok) {
      await encerrarSessao(); // não deixa sessão ativa no navegador
      limparUrl();
      setSenha("");
      setConfirma("");
      setEstado("sucesso");
    } else {
      setErro(r.erro || "Não foi possível salvar a senha.");
      setEstado("form");
    }
  };

  return (
    <div style={S.page}>
      <div style={S.card}>
        <div style={S.brand}>
          <img
            src="/assets/brand/lavaprime-lockup.png"
            alt="LavaPrime"
            style={{ height: 40 }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        </div>

        {estado === "carregando" && (
          <div style={S.estado}>
            <div style={S.spinner} />
            <p style={S.sub}>Validando o link…</p>
          </div>
        )}

        {estado === "invalido" && (
          <div style={S.estado}>
            <div style={{ fontSize: 34 }}>⚠️</div>
            <h1 style={S.titulo}>Link inválido ou expirado</h1>
            <p style={S.sub}>
              Este link é inválido ou expirou. Solicite um novo convite ou uma nova redefinição de senha.
            </p>
          </div>
        )}

        {estado === "sucesso" && (
          <div style={S.estado}>
            <div style={{ fontSize: 34, color: "var(--positive-text)" }}>✓</div>
            <h1 style={S.titulo}>{sucessoTitulo}</h1>
            <p style={S.sub}>{sucessoTexto}</p>
          </div>
        )}

        {(estado === "form" || estado === "processando") && (
          <form onSubmit={enviar} style={{ display: "grid", gap: 12 }}>
            <h1 style={S.titulo}>{titulo}</h1>
            <p style={S.sub}>{subtitulo}</p>

            <label style={S.label}>
              Nova senha
              <input
                type="password"
                style={S.input}
                value={senha}
                autoComplete="new-password"
                onChange={(e) => setSenha(e.target.value)}
                disabled={estado === "processando"}
              />
            </label>

            <label style={S.label}>
              Confirmar senha
              <input
                type="password"
                style={S.input}
                value={confirma}
                autoComplete="new-password"
                onChange={(e) => setConfirma(e.target.value)}
                disabled={estado === "processando"}
              />
            </label>

            {erro && <div style={S.erro}>{erro}</div>}

            <button type="submit" style={S.btn} disabled={estado === "processando"}>
              {estado === "processando" ? "Salvando…" : ctaLabel || "Salvar senha"}
            </button>
            <p style={S.dica}>Mínimo de {POLITICA_MIN} caracteres.</p>
          </form>
        )}
      </div>
      <style>{spin}</style>
    </div>
  );
}

const spin = `@keyframes lp-auth-spin { to { transform: rotate(360deg); } }`;

const S = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    boxSizing: "border-box",
    background: "linear-gradient(160deg, #08283b 0%, #0b3348 55%, #113c54 100%)",
    fontFamily: "Inter, system-ui, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "var(--surface, #fff)",
    borderRadius: 20,
    padding: "28px 24px",
    boxShadow: "0 18px 50px rgba(0,0,0,0.28)",
    textAlign: "center",
    boxSizing: "border-box",
  },
  brand: { marginBottom: 14 },
  titulo: { margin: "2px 0", fontSize: 22, color: "var(--text-primary, #0f2230)", fontWeight: 700, textWrap: "balance" },
  sub: { margin: "0 0 6px", color: "var(--text-secondary, #5f7380)", fontSize: 14, lineHeight: 1.5 },
  label: {
    textAlign: "left",
    display: "grid",
    gap: 6,
    fontSize: 13,
    fontWeight: 600,
    color: "var(--text-secondary, #5f7380)",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px 12px",
    borderRadius: 10,
    border: "1px solid var(--soft-line, #c9dce5)",
    fontSize: 15,
    fontFamily: "inherit",
    color: "var(--text-primary, #0f2230)",
    background: "#fff",
  },
  erro: {
    textAlign: "left",
    color: "var(--danger-text, #9d3232)",
    background: "var(--danger-bg, #fdecec)",
    borderRadius: 10,
    padding: "8px 12px",
    fontSize: 13.5,
  },
  btn: {
    marginTop: 4,
    border: "none",
    borderRadius: 999,
    padding: "12px 20px",
    background: "var(--prime, #0b3348)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 15,
    cursor: "pointer",
  },
  dica: { margin: 0, fontSize: 12, color: "var(--text-muted, #7f95a1)" },
  estado: { display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "10px 4px" },
  spinner: {
    width: 22,
    height: 22,
    borderRadius: "50%",
    border: "3px solid rgba(11,51,72,0.18)",
    borderTopColor: "var(--water, #22b8ea)",
    animation: "lp-auth-spin 0.8s linear infinite",
  },
};
