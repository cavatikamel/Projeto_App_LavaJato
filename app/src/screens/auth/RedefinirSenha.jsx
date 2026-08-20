import FluxoSenha from "./FluxoSenha.jsx";

/** /auth/redefinir-senha — redefinição de senha a partir do link de recuperação do Supabase. */
export default function RedefinirSenha() {
  return (
    <FluxoSenha
      titulo="Redefina sua senha"
      subtitulo="Escolha uma nova senha para sua conta LavaPrime."
      ctaLabel="Redefinir senha"
      sucessoTitulo="Senha redefinida com sucesso."
      sucessoTexto="Agora abra o aplicativo LavaPrime e entre novamente com seu e-mail e sua nova senha."
    />
  );
}
