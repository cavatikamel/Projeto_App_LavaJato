/* Cliente Supabase Auth ISOLADO — usado SOMENTE pelas páginas /auth/convite e /auth/redefinir-senha.
   É separado do cliente do QR (lib/supabase.js) e NÃO altera o fluxo QR.
   Segurança: PKCE, persistSession:false e storage 100% em memória → nenhum token/verifier chega a
   localStorage/sessionStorage. Nada de token/code é registrado em console. */
import { createClient } from "@supabase/supabase-js";

const SUPA_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPA_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Só consideramos configurado se a URL for realmente https:// e a anon key existir. Isso evita que uma
// env ausente/errada no build (que pode virar uma string inválida) chame createClient e quebre a página.
const urlValida = typeof SUPA_URL === "string" && /^https:\/\/[^ ]+/.test(SUPA_URL);
export const authConfigurado = Boolean(urlValida && SUPA_ANON);

// Storage exclusivamente em memória — garante que nada seja gravado no navegador.
const mem = new Map();
const memoryStorage = {
  getItem: (k) => (mem.has(k) ? mem.get(k) : null),
  setItem: (k, v) => { mem.set(k, v); },
  removeItem: (k) => { mem.delete(k); },
};

// Cria o cliente só se configurado; em qualquer falha, trata como não-configurado (a página mostra
// "link inválido" em vez de quebrar em tela branca).
function criarCliente() {
  if (!authConfigurado) return null;
  try {
    return createClient(SUPA_URL, SUPA_ANON, {
      auth: {
        flowType: "pkce",
        persistSession: false,
        detectSessionInUrl: true,
        autoRefreshToken: false,
        storage: memoryStorage,
      },
    });
  } catch {
    return null;
  }
}

export const supabaseAuth = criarCliente();

/** Remove code/token/type e demais parâmetros sensíveis da URL, sem recarregar a página. */
export function limparUrl() {
  try {
    const limpa = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, limpa);
  } catch {
    /* no-op */
  }
}

/**
 * Processa o retorno do Supabase Auth e estabelece uma sessão TEMPORÁRIA (só em memória).
 * Preferência PKCE (?code= → exchangeCodeForSession). Fallback para links server-side no formato
 * token_hash+type (verifyOtp). O fluxo implícito (#access_token) NÃO é suportado por decisão de segurança.
 * Retorna { ok, motivo }. Nunca registra code/token.
 */
export async function estabelecerSessaoDoLink() {
  if (!supabaseAuth) return { ok: false, motivo: "config" };

  try {
    // 1) detectSessionInUrl:true tenta trocar o ?code= automaticamente na criação do cliente;
    //    getSession() aguarda esse processamento.
    const atual = await supabaseAuth.auth.getSession();
    if (atual?.data?.session) return { ok: true };

    const href = new window.URL(window.location.href);
    const q = href.searchParams;
    const h = new URLSearchParams((href.hash || "").replace(/^#/, ""));

    // 2) PKCE explícito.
    const code = q.get("code");
    if (code) {
      const { data, error } = await supabaseAuth.auth.exchangeCodeForSession(code);
      if (!error && data?.session) return { ok: true };
    }

    // 3) Link server-side de convite/recuperação no formato token_hash + type.
    const tokenHash = q.get("token_hash");
    const type = q.get("type");
    if (tokenHash && type) {
      const { data, error } = await supabaseAuth.auth.verifyOtp({ token_hash: tokenHash, type });
      if (!error && data?.session) return { ok: true };
    }

    // 4) Fluxo implícito (token no hash) não é suportado.
    if (h.get("access_token")) return { ok: false, motivo: "implicito" };

    return { ok: false, motivo: "sem_sessao" };
  } catch {
    return { ok: false, motivo: "erro" };
  }
}

/** Define a nova senha do usuário autenticado pela sessão temporária. */
export async function definirSenha(senha) {
  if (!supabaseAuth) return { ok: false, erro: mensagemAmigavel() };
  const { error } = await supabaseAuth.auth.updateUser({ password: senha });
  if (error) return { ok: false, erro: mensagemAmigavel(error) };
  return { ok: true };
}

/** Encerra a sessão temporária — não deixa nada logado no navegador. */
export async function encerrarSessao() {
  try {
    await supabaseAuth?.auth.signOut();
  } catch {
    /* no-op */
  }
}

/** Converte erros do Supabase em mensagens amigáveis, sem vazar detalhes internos. */
export function mensagemAmigavel(error) {
  const msg = String(error?.message || "").toLowerCase();
  if (msg.includes("weak") || msg.includes("should be at least") || msg.includes("password"))
    return "A senha não atende à política mínima. Use pelo menos 8 caracteres.";
  if (msg.includes("expired") || msg.includes("invalid") || msg.includes("not found"))
    return "Este link é inválido ou expirou. Solicite um novo.";
  return "Não foi possível concluir. Tente novamente ou solicite um novo link.";
}
