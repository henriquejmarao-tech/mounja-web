"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LeadPage() {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const router = useRouter();

  const canContinue = nome.trim() !== "" && whatsapp.trim() !== "";

  function handleContinue() {
    if (!canContinue) return;
    localStorage.setItem("quiz_lead", JSON.stringify({ nome, whatsapp }));
    router.push("/quiz/6");
  }

  return (
    <>
      <h2 className="mb-2 text-2xl font-bold leading-snug tracking-tight text-black">
        Antes de revelar seu índice...
      </h2>

      <p className="mb-8 text-base leading-relaxed text-gray-500">
        Quero te conhecer. Afinal, a Mounjá foi feita pra ser sua companheira —
        e companheira sabe o nome da outra. 💜
      </p>

      <div className="flex flex-col gap-5">
        {/* Nome */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Qual é o seu nome?
          </label>
          <input
            type="text"
            placeholder="Como posso te chamar?"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="rounded-xl border-2 border-gray-200 px-4 py-4 text-base outline-none transition-all focus:border-[#ff4d8f]"
          />
        </div>

        {/* WhatsApp */}
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">
            Seu WhatsApp
          </label>
          <input
            type="tel"
            placeholder="(11) 99999-9999"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
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
        Continuar
      </button>

      <p className="mt-4 text-center text-xs text-gray-300">
        Seus dados são privados. Não enviamos spam.
      </p>
    </>
  );
}
