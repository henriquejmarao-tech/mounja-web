export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col px-6 pb-6 pt-6">
      <main className="flex flex-1 flex-col items-center justify-center text-center">
        {/* Pílula rosa */}
        <span className="mb-6 inline-block rounded-full bg-pink-50 px-4 py-2 text-xs font-bold tracking-wide text-[#ff4d8f]">
          PARA MULHERES QUE USAM OZEMPIC, MOUNJARO OU WEGOVY
        </span>

        {/* Headline — LCP element */}
        <h1 className="mb-4 text-[28px] font-bold leading-tight tracking-tight text-black">
          Você está usando uma caneta cara demais para acompanhar tudo no
          improviso.
        </h1>

        {/* Subtítulo */}
        <p className="mb-8 max-w-[340px] text-base leading-relaxed text-gray-500">
          Calcule seu Índice de Constância no Tratamento e descubra onde sua
          jornada com GLP-1 pode estar ficando desorganizada.
        </p>

        {/* CTA */}
        <a
          href="/quiz"
          className="mb-10 block w-full rounded-2xl py-4 text-center text-lg font-bold text-white shadow-lg transition-opacity hover:opacity-90 active:opacity-80"
          style={{
            backgroundImage: "linear-gradient(to right, #ff4d8f, #b84dff)",
          }}
        >
          Calcular meu índice
        </a>

        {/* Rodapé */}
        <footer className="mt-6 space-y-2 text-center text-xs leading-relaxed text-gray-400">
          <p>
            A Mounjá não substitui acompanhamento médico. Consulte sempre um
            profissional de saúde.
          </p>
          <p>© Mounjá 2026</p>
        </footer>
      </main>
    </div>
  );
}
