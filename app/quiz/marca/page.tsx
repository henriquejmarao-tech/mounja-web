"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const FEATURES = [
  { emoji: "📱", text: "Registra tudo em segundos" },
  { emoji: "🥗", text: "Entende sua alimentação sem julgamento" },
  { emoji: "📸", text: "Vê sua evolução com seus próprios olhos" },
];

export default function MarcaPage() {
  const router = useRouter();

  return (
    <div
      className="flex min-h-dvh flex-col items-center justify-center px-6 py-10"
      style={{
        backgroundImage: "linear-gradient(to bottom, #ff4d8f, #b84dff)",
      }}
    >
      {/* Logo grande */}
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
        <Image
          src="/logo.png"
          alt="Mounjá"
          width={80}
          height={80}
          className="h-20 w-20 rounded-full object-contain"
        />
      </div>

      {/* Features */}
      <div className="mt-8 flex flex-col gap-4">
        {FEATURES.map((f) => (
          <div key={f.text} className="flex items-center gap-3">
            <span className="text-2xl">{f.emoji}</span>
            <span className="text-base font-medium text-white">{f.text}</span>
          </div>
        ))}
      </div>

      {/* Frases principais */}
      <h2 className="mt-10 text-center text-2xl font-bold text-white">
        Sua companheira de tratamento.
      </h2>
      <p className="mt-2 text-center text-lg text-white/80">
        No seu bolso, todo dia.
      </p>

      {/* Botão */}
      <button
        type="button"
        onClick={() => router.push("/quiz/4")}
        className="mt-12 rounded-full bg-white px-12 py-4 text-lg font-bold text-pink-500 shadow-lg transition-opacity hover:opacity-90 active:opacity-80"
      >
        Continuar
      </button>
    </div>
  );
}
