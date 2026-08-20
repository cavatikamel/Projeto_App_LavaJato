import FluxoSenha from "./FluxoSenha.jsx";

/** /auth/convite — aceite do convite recebido por e-mail e definição da senha inicial. */
export default function AceitarConvite() {
  return (
    <FluxoSenha
      titulo="Defina sua senha"
      subtitulo="Crie a senha para acessar sua conta LavaPrime."
      ctaLabel="Definir senha"
      sucessoTitulo="Senha definida com sucesso."
      sucessoTexto="Agora abra o aplicativo LavaPrime e entre com seu e-mail e sua nova senha."
    />
  );
}
