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

export default function ResultadoPage() {
  const router = useRouter();
  const [data, setData] = useState<{
    nome: string;
    index: number;
  } | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      const q1 = localStorage.getItem("quiz_q1") ?? "";
      const q2 = localStorage.getItem("quiz_q2") ?? "";
      const q3 = localStorage.getItem("quiz_q3") ?? "";
      const q4 = localStorage.getItem("quiz_q4") ?? "";
      const q5 = localStorage.getItem("quiz_q5") ?? "";
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
      const index = Math.round(avg * 10) / 10;

      setData({
        nome: lead.nome || "Amiga",
        index,
      });
      localStorage.setItem("quiz_score", index.toFixed(1));
    });
  }, []);

  if (!data) return null;

  const faixa = getFaixa(data.index);
  const cards = [
    "Você começou bem — agora precisa de constância",
    "Sua motivação existe — mas precisa de rotina",
    "Seu progresso precisa aparecer — mesmo quando a balança não ajuda",
  ];

  return (
    <div className="flex min-h-dvh flex-col px-6 pb-8 pt-10">
      {/* Header */}
      <div className="text-center">
        <p className="text-sm text-gray-400">Índice de Constância no Tratamento</p>
        <h1 className="mt-2 text-2xl font-bold leading-tight text-black">
          {data.nome}, seu Índice de Constância é
        </h1>
        <p
          className="mt-2 text-[72px] font-bold leading-none"
          style={{ color: faixa.cor }}
        >
          {data.index.toFixed(1)}
        </p>
        <p className="mt-2 text-base text-gray-500">
          Você está no caminho — mas ainda pode estar acompanhando seu
          tratamento no improviso.
        </p>
      </div>

      {/* Divisor */}
      <div className="my-8 h-px w-full bg-gray-100" />

      {/* Cards */}
      <div className="flex flex-col gap-4">
        {cards.map((card) => (
          <div
            key={card}
            className="rounded-2xl border border-gray-100 p-4 shadow-sm"
          >
            <span className="text-sm font-medium leading-snug text-gray-700">
              {card}
            </span>
          </div>
        ))}
      </div>

      {/* Frase de transição */}
      <p className="mt-8 text-center text-base italic text-gray-600">
        &ldquo;O GLP-1 ajuda no corpo. A Mounjá ajuda você a não perder o fio
        da jornada.&rdquo;
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
        Quero organizar meu tratamento
      </button>

      {/* Rodapé */}
      <p className="mt-6 text-center text-xs text-gray-300">
        A Mounjá não substitui acompanhamento médico.
      </p>
    </div>
  );
}
