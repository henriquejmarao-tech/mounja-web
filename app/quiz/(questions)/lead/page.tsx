"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LeadPage() {
  const [nome, setNome] = useState("");
  const router = useRouter();

  const canContinue = nome.trim() !== "";

  function handleContinue() {
    if (!canContinue) return;
    localStorage.setItem("quiz_lead", JSON.stringify({ nome: nome.trim() }));
    router.push("/quiz/6");
  }

  return (
    <>
      <h2 className="mb-2 text-2xl font-bold leading-snug tracking-tight text-black">
        Seu resultado está pronto.
      </h2>

      <p className="mb-8 text-base leading-relaxed text-gray-500">
        Como posso te chamar?
      </p>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Nome
          </label>
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="rounded-xl border-2 border-gray-200 px-4 py-4 text-base outline-none transition-all focus:border-[#ff4d8f]"
          />
        </div>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={!canContinue}
        className="mt-8 w-full rounded-2xl py-4 text-center text-lg font-bold text-white shadow-lg transition-opacity hover:opacity-90 active:opacity-80 disabled:opacity-40"
        style={{
          backgroundImage: "linear-gradient(to right, #ff4d8f, #b84dff)",
        }}
      >
        Ver meu índice
      </button>

      <p className="mt-4 text-center text-xs text-gray-300">
        A Mounjá não substitui acompanhamento médico.
      </p>
    </>
  );
}
