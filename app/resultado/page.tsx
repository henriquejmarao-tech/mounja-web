"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

function getFaixa(index: number) {
  if (index <= 5.4) return { titulo: "Momento delicado da jornada", cor: "#FF3B30" };
  if (index <= 7.4) return { titulo: "No caminho certo, falta consistência", cor: "#FF6B00" };
  return { titulo: "Engajada e consciente", cor: "#b84dff" };
}

function getCard1(q1: string) {
  if (q1 === "Há mais de 6 meses")
    return { emoji: "⏳", text: "Você já usa GLP-1 há bastante tempo — e sabe que algo ainda falta" };
  if (q1 === "Entre 3 e 6 meses")
    return { emoji: "⏳", text: "Você está no meio da jornada — o momento mais crítico" };
  if (q1 === "Entre 1 e 3 meses")
    return { emoji: "⏳", text: "Você está no começo — e já está buscando fazer certo" };
  return { emoji: "⏳", text: "Você acabou de começar — e já está um passo à frente" };
}

function getCard2(q5: string) {
  if (q5.startsWith("Alta"))
    return { emoji: "🔥", text: "Sua motivação está alta — e precisa ser alimentada" };
  if (q5.startsWith("Oscilando"))
    return { emoji: "🎢", text: "Sua motivação oscila — nos dias ruins, você precisa de apoio" };
  if (q5.startsWith("Baixa"))
    return { emoji: "😔", text: "Você está cansada — e isso é mais comum do que parece" };
  return { emoji: "🆘", text: "Você está pensando em desistir — não faça isso sozinha" };
}

function getCard3(q6: string) {
  if (q6.includes("lembrar"))
    return { emoji: "📋", text: "Você precisa de organização — para não perder o fio do tratamento" };
  if (q6.includes("julgam") || q6.includes("julgar"))
    return { emoji: "🤍", text: "Você precisa de acolhimento — alguém que entenda sem julgar" };
  if (q6.includes("evoluindo"))
    return { emoji: "📈", text: "Você precisa ver progresso — para acreditar que está funcionando" };
  return { emoji: "🎉", text: "Você precisa de celebração — cada passo merece ser reconhecido" };
}

export default function ResultadoPage() {
  const router = useRouter();
  const [data, setData] = useState<{
    nome: string;
    index: number;
    q1: string;
    q5: string;
    q6: string;
  } | null>(null);

  useEffect(() => {
    const q1 = localStorage.getItem("quiz_q1") ?? "";
    const q2 = localStorage.getItem("quiz_q2") ?? "";
    const q3 = localStorage.getItem("quiz_q3") ?? "";
    const q4 = localStorage.getItem("quiz_q4") ?? "";
    const q5 = localStorage.getItem("quiz_q5") ?? "";
    const q6 = localStorage.getItem("quiz_q6") ?? "";

    const leadRaw = localStorage.getItem("quiz_lead");
    const lead = leadRaw ? JSON.parse(leadRaw) : { nome: "" };

    const scores = [
      SCORES.quiz_q1[q1] ?? 5,
      SCORES.quiz_q2[q2] ?? 5,
      SCORES.quiz_q3[q3] ?? 5,
      SCORES.quiz_q4[q4] ?? 5,
      SCORES.quiz_q5[q5] ?? 5,
    ];

    const avg = scores.reduce((a, b) => a + b, 0) / scores.length;

    setData({
      nome: lead.nome || "Amiga",
      index: Math.round(avg * 10) / 10,
      q1,
      q5,
      q6,
    });
  }, []);

  if (!data) return null;

  const faixa = getFaixa(data.index);
  const cards = [
    getCard1(data.q1),
    getCard2(data.q5),
    getCard3(data.q6),
  ];

  return (
    <div className="flex min-h-dvh flex-col px-6 pb-8 pt-10">
      {/* Header */}
      <div className="text-center">
        <p className="text-sm text-gray-400">Seu Índice de Prontidão Emocional</p>
        <p className="mt-2 text-xl font-bold text-black">{data.nome},</p>
        <p
          className="mt-2 text-[72px] font-bold leading-none"
          style={{ color: faixa.cor }}
        >
          {data.index.toFixed(1)}
        </p>
        <p className="mt-2 text-base text-gray-500">{faixa.titulo}</p>
      </div>

      {/* Divisor */}
      <div className="my-8 h-px w-full bg-gray-100" />

      {/* Cards */}
      <div className="flex flex-col gap-4">
        {cards.map((card) => (
          <div
            key={card.text}
            className="flex items-start gap-3 rounded-2xl border border-gray-100 p-4 shadow-sm"
          >
            <span className="text-2xl">{card.emoji}</span>
            <span className="text-sm leading-snug text-gray-700">
              {card.text}
            </span>
          </div>
        ))}
      </div>

      {/* Frase de transição */}
      <p className="mt-8 text-center text-base italic text-gray-600">
        &ldquo;O GLP-1 age no seu corpo. A Mounjá cuida da sua mente.&rdquo;
      </p>

      {/* CTA */}
      <button
        type="button"
        onClick={() => router.push("/vendas")}
        className="mt-6 w-full rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-opacity hover:opacity-90 active:opacity-80"
        style={{
          backgroundImage: "linear-gradient(to right, #ff4d8f, #b84dff)",
        }}
      >
        Quero conhecer a Mounjá →
      </button>

      {/* Rodapé */}
      <p className="mt-6 text-center text-xs text-gray-300">
        A Mounjá não substitui acompanhamento médico.
      </p>
    </div>
  );
}
