"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Shield } from "lucide-react";

/* ── Scoring (same as /resultado) ── */

const SCORES: Record<string, Record<string, number>> = {
  quiz_q1: {
    "Comecei há menos de 1 mês": 6,
    "Entre 1 e 3 meses": 7,
    "Entre 3 e 6 meses": 8,
    "Há mais de 6 meses": 9,
  },
  quiz_q2: {
    "Todo dia": 9,
    "Algumas vezes por semana": 7,
    Raramente: 5,
    "Nunca faço isso": 3,
  },
  quiz_q3: {
    "Melhorou bastante": 9,
    "Melhorou um pouco": 7,
    "Continua igual": 5,
    "Piorou em alguns momentos": 4,
  },
  quiz_q4: {
    "Sim, claramente": 9,
    "Sim, mas são pequenas e difíceis de ver": 7,
    "Ainda não percebi nada": 5,
    "Tenho dúvida se algo mudou": 4,
  },
  quiz_q5: {
    "Alta — estou comprometida": 9,
    "Oscilando — tem dias melhores e piores": 7,
    "Baixa — estou me sentindo cansada disso": 5,
    "Muito baixa — estou pensando em desistir": 3,
  },
};

function calcIndex(): {
  nome: string;
  index: number;
  faixa: string;
  cor: string;
} {
  if (typeof window === "undefined")
    return { nome: "Amiga", index: 7.0, faixa: "media", cor: "#FF6B00" };

  const leadRaw = localStorage.getItem("quiz_lead");
  const lead = leadRaw ? JSON.parse(leadRaw) : { nome: "" };
  const nome = lead.nome || "Amiga";

  const keys = ["quiz_q1", "quiz_q2", "quiz_q3", "quiz_q4", "quiz_q5"];
  const values = keys.map((k) => {
    const ans = localStorage.getItem(k) ?? "";
    return SCORES[k][ans] ?? 5;
  });

  const avg =
    Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;

  if (avg <= 5.4) return { nome, index: avg, faixa: "baixa", cor: "#FF3B30" };
  if (avg <= 7.4) return { nome, index: avg, faixa: "media", cor: "#FF6B00" };
  return { nome, index: avg, faixa: "alta", cor: "#b84dff" };
}

/* ── Screenshots / Features ── */

const FEATURES = [
  {
    img: "/screenshots/checkin.jpeg",
    pill: "30 SEGUNDOS POR DIA",
    pillBg: "bg-blue-50",
    pillText: "text-blue-600",
    title: "Check-in diário",
    desc: "Registra como aplicou, como comeu, como se sentiu. Sem complicação.",
  },
];

/* ── Pricing benefits ── */

const MENSAL_BENEFITS = [
  "Acesso completo ao app",
];

const TRIMESTRAL_BENEFITS = [
  "Acesso completo ao app",
  "Suporte prioritário no WhatsApp",
];

/* ── FAQ ── */

const FAQ_ITEMS = [
  {
    q: "A Mounjá substitui meu médico?",
    a: "Não. A Mounjá é uma companheira do seu tratamento, mas não substitui acompanhamento médico. Continue sempre consultando seu profissional de saúde.",
  },
  {
    q: "Preciso baixar algum app?",
    a: "Não. A Mounjá funciona direto no navegador do seu celular, como um app. Você adiciona à tela inicial e usa como se fosse um aplicativo nativo.",
  },
  {
    q: "Como recebo o acesso depois de pagar?",
    a: "Imediatamente após o pagamento, você recebe o link de acesso por email e mensagem no WhatsApp.",
  },
  {
    q: "E se eu não uso Ozempic, mas sim Mounjaro ou Wegovy?",
    a: "A Mounjá foi feita pra toda a família GLP-1. Funciona pra qualquer medicação dessa classe.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Sim. Sem fidelidade, sem multa. Cancele a qualquer momento direto pelo WhatsApp.",
  },
];

/* ── Component ── */

export default function VendasPage() {
  const [data, setData] = useState<ReturnType<typeof calcIndex> | null>(null);
  const [openFaq, setOpenFaq] = useState<Set<number>>(new Set());

  useEffect(() => {
    setData(calcIndex());
  }, []);

  function toggleFaq(i: number) {
    setOpenFaq((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  if (!data) return null;

  function getHeadline() {
    if (!data) return null;
    const indexSpan = (
      <span
        className="inline-block text-4xl font-black"
        style={{ color: data.cor }}
      >
        {data.index.toFixed(1)}
      </span>
    );

    if (data.faixa === "baixa")
      return (
        <>
          {data.nome}, seu índice {indexSpan} mostra algo que muitas mulheres
          ignoram
        </>
      );
    if (data.faixa === "media")
      return (
        <>
          {data.nome}, seu índice {indexSpan} revela onde está o problema
        </>
      );
    return (
      <>
        {data.nome}, seu índice {indexSpan} mostra que você está pronta — mas
        algo ainda falta
      </>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[420px] px-6">
      {/* ── BLOCO 1 — HERO ── */}
      <section className="py-12 text-center">
        <span className="inline-block rounded-full bg-pink-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#ff4d8f]">
          MOUNJÁ • SUA COMPANHEIRA NO GLP-1
        </span>

        <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-black">
          {getHeadline()}
        </h1>

        <div className="mt-5 border-l-4 border-pink-500 bg-pink-50/30 py-3 pl-4 text-left">
          <p className="text-base italic text-gray-700">
            O GLP-1 trata seu corpo. Mas ninguém te ensinou a cuidar da parte
            que mais importa: a sua mente.
          </p>
        </div>
      </section>



      {/* ── BLOCO 4 — COMO FUNCIONA ── */}
      <section className="-mx-6 bg-gray-50 px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#ff4d8f]">
          03 — POR DENTRO DA MOUNJÁ
        </p>

        <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-black">
          Veja como a Mounjá funciona
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Cada tela foi pensada pra ser usada em segundos, no meio da correria
          do dia.
        </p>

        <div className="mt-8 flex flex-col gap-12">
          {FEATURES.map((f) => (
            <div key={f.title} className="flex flex-col items-center">
              <Image
                src={f.img}
                alt={f.title}
                width={240}
                height={480}
                className="mx-auto max-w-[260px] w-full rounded-3xl border border-gray-200 shadow-xl"
                unoptimized
              />

              <span
                className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${f.pillBg} ${f.pillText}`}
              >
                {f.pill}
              </span>

              <h3 className="mt-2 text-center text-xl font-bold text-gray-900">
                {f.title}
              </h3>

              <p className="mt-2 mx-auto max-w-xs text-center text-sm leading-relaxed text-gray-600">
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BLOCO 5 — PROVA SOCIAL ── */}
      <section className="py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#ff4d8f]">
          04 — CONSTRUÍDA COM VOCÊ
        </p>

        <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-black">
          Feita ao lado de mulheres reais
        </h2>

        <div className="mt-6 rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 to-purple-50 p-6">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            className="opacity-30"
          >
            <path
              d="M25 30c0-5.5-4.5-10-10-10S5 24.5 5 30v10h10V30h-6c0-3.3 2.7-6 6-6s6 2.7 6 6H25zM55 30c0-5.5-4.5-10-10-10S35 24.5 35 30v10h10V30h-6c0-3.3 2.7-6 6-6s6 2.7 6 6H55z"
              fill="#ff4d8f"
            />
          </svg>

          <p className="mt-3 text-base font-medium leading-relaxed text-gray-700">
            A Mounjá está sendo construída diariamente ao lado de mulheres reais
            usando GLP-1 no Brasil. Cada feature nasce de uma conversa, cada
            palavra é testada com quem está na jornada.
          </p>

          <p className="mt-4 text-xs text-gray-400">— Equipe Mounjá</p>
        </div>
      </section>

      {/* ── BLOCO 6 — PREÇO ── */}
      <section id="precos" className="-mx-6 bg-gray-50 px-6 py-12">
        <p className="text-center text-sm font-semibold uppercase tracking-wider text-[#ff4d8f]">
          05 — ESCOLHA SEU PLANO
        </p>

        <h2 className="mt-2 text-center text-2xl font-bold leading-tight tracking-tight text-black">
          Comece agora
        </h2>

        <p className="mt-2 text-center text-sm text-gray-600">
          Sem fidelidade. Cancele quando quiser.
        </p>

        <div className="mt-8 flex flex-col gap-4">
          {/* Mensal */}
          <div className="rounded-2xl border-2 border-gray-200 bg-white p-6">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              PLANO MENSAL
            </p>

            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-gray-900">
                R$ 24,99
              </span>
              <span className="text-base text-gray-500">/mês</span>
            </div>

            <ul className="mt-4 space-y-2">
              {MENSAL_BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff4d8f] text-[10px] font-bold text-white">
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <a
              href="https://pay.kirvano.com/6eb4500b-44d7-436a-8644-27c578ef9fc6"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-full rounded-full border-2 border-gray-900 py-4 text-center text-lg font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
            >
              Assinar mensal
            </a>
          </div>

          {/* Trimestral */}
          <div className="relative rounded-2xl border-2 border-pink-500 bg-white p-6 shadow-xl">
            <span
              className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-white"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #ff4d8f, #b84dff)",
              }}
            >
              MAIS ESCOLHIDO
            </span>

            <p className="text-xs font-bold uppercase tracking-wider text-[#ff4d8f]">
              PLANO TRIMESTRAL
            </p>

            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-gray-900">
                R$ 49,99
              </span>
              <span className="text-base text-gray-500">/3 meses</span>
            </div>

            <p className="mt-1 text-sm text-gray-600">
              Equivale a R$ 16,66/mês
            </p>

            <span className="mt-2 inline-block rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-700">
              ECONOMIZE 33%
            </span>

            <ul className="mt-4 space-y-2">
              {TRIMESTRAL_BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#ff4d8f] text-[10px] font-bold text-white">
                    ✓
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <a
              href="https://pay.kirvano.com/9fe83f1a-0c80-49b5-874e-b8e204c50760"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block w-full rounded-full py-4 text-center text-lg font-semibold text-white shadow-lg transition hover:shadow-xl"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #ff4d8f, #b84dff)",
              }}
            >
              Assinar trimestral
            </a>
          </div>
        </div>
      </section>

      {/* ── BLOCO 7 — GARANTIA ── */}
      <section className="py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#ff4d8f]">
          06 — ZERO RISCO
        </p>

        <div className="mt-3 rounded-2xl border border-pink-200 bg-gradient-to-br from-pink-50 to-purple-50 p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
              <Shield className="h-8 w-8 text-[#ff4d8f]" strokeWidth={2} />
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-gray-900">
                Garantia de 14 dias
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-gray-700">
                Use a Mounjá por 14 dias. Se não sentir diferença, devolvemos
                100% do seu dinheiro. Sem perguntas, sem burocracia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOCO 8 — FAQ ── */}
      <section className="-mx-6 bg-gray-50 px-6 py-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-[#ff4d8f]">
          07 — DÚVIDAS COMUNS
        </p>

        <h2 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-black">
          Perguntas frequentes
        </h2>

        <div className="mt-6 flex flex-col gap-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openFaq.has(i);
            return (
              <div
                key={i}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="flex w-full items-center justify-between text-left"
                >
                  <span className="text-sm font-bold text-gray-900">
                    {item.q}
                  </span>
                  <span className="ml-3 shrink-0 text-xl text-pink-500">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <p className="mt-3 text-sm leading-relaxed text-gray-600">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── BLOCO 9 — CTA FINAL ── */}
      <section className="py-16 text-center">
        <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-900">
          Sua jornada com GLP-1 merece mais do que tentativa e erro.
        </h2>

        <p className="mt-4 text-base leading-relaxed text-gray-600">
          Junte-se às mulheres que estão transformando o tratamento em algo
          gentil consigo mesmas.
        </p>

        <a
          href="https://pay.kirvano.com/9fe83f1a-0c80-49b5-874e-b8e204c50760"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 block w-full rounded-full py-4 text-lg font-semibold text-white shadow-xl transition hover:shadow-2xl"
          style={{
            backgroundImage: "linear-gradient(to right, #ff4d8f, #b84dff)",
          }}
        >
          Quero começar agora →
        </a>

        <a
          href="#precos"
          className="mt-4 inline-block text-sm text-gray-500 underline"
        >
          Ver planos novamente
        </a>
      </section>

      {/* ── CARD WHATSAPP ── */}
      <section>
        <a
          href="https://wa.me/551153043585?text=Oi%2C%20tenho%20uma%20d%C3%BAvida%20sobre%20a%20Mounj%C3%A1%20%F0%9F%92%9C"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 rounded-2xl border border-green-200 bg-green-50 p-5 transition hover:shadow-md"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366]">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">
              Tem alguma dúvida?
            </p>
            <p className="mt-0.5 text-sm text-gray-600">
              Fale com a gente pelo WhatsApp
            </p>
          </div>
        </a>
      </section>

      {/* ── RODAPÉ ── */}
      <footer className="pb-8 pt-12 text-center">
        <p className="text-xs leading-relaxed text-gray-400">
          A Mounjá não substitui acompanhamento médico. Consulte sempre um
          profissional de saúde antes de tomar decisões sobre seu tratamento.
        </p>
        <p className="mt-2 text-xs text-gray-400">
          © Mounjá 2026 · Todos os direitos reservados
        </p>
      </footer>
    </main>
  );
}
