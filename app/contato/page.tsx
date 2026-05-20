export default function ContatoPage() {
  return (
    <main className="px-6 py-10">
      <a href="/vendas" className="text-sm font-medium text-[#ff4d8f]">
        Voltar
      </a>

      <h1 className="mt-8 text-3xl font-bold tracking-tight text-gray-900">
        Contato
      </h1>

      <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600">
        <p>
          Para dúvidas sobre acesso, pagamento, cancelamento ou uso da Mounjá,
          fale com a equipe pelo WhatsApp.
        </p>

        <a
          href="https://wa.me/551153043585?text=Oi%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20a%20Mounj%C3%A1"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-full bg-[#25D366] px-6 py-4 text-center text-base font-bold text-white"
        >
          Falar no WhatsApp
        </a>
      </div>
    </main>
  );
}
