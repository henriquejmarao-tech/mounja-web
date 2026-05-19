"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const OPTIONS = [
  "Que me ajude a lembrar e registrar tudo",
  "Que entenda quando eu escorrego na alimentação, sem me julgar",
  "Que me mostre que estou evoluindo mesmo quando não percebo",
  "Que comemore cada conquista comigo, por menor que seja",
];

export default function QuizQuestion6() {
  const [selected, setSelected] = useState<number | null>(null);
  const router = useRouter();

  function handleContinue() {
    if (selected === null) return;
    localStorage.setItem("quiz_q6", OPTIONS[selected]);
    router.push("/loading-resultado");
  }

  return (
    <>
      <span className="mb-2 text-xs font-semibold tracking-wide text-gray-400">
        PERGUNTA 6 DE 6
      </span>

      <h2 className="mb-8 text-2xl font-bold leading-snug tracking-tight text-black">
        Se você tivesse uma amiga que entende tudo sobre GLP-1 e está no seu
        bolso todo dia, o que você mais precisaria dela?
      </h2>

      <div className="flex flex-col gap-3">
        {OPTIONS.map((option, i) => {
          const isSelected = selected === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setSelected(i)}
              className="relative rounded-xl border-2 px-4 py-4 text-left text-base font-medium transition-all"
              style={
                isSelected
                  ? {
                      borderColor: "transparent",
                      backgroundImage:
                        "linear-gradient(white, white), linear-gradient(to right, #ff4d8f, #b84dff)",
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                    }
                  : {
                      borderColor: "#e5e7eb",
                    }
              }
            >
              {option}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <button
          type="button"
          onClick={handleContinue}
          className="mt-8 w-full rounded-2xl py-4 text-center text-lg font-bold text-white shadow-lg transition-opacity hover:opacity-90 active:opacity-80"
          style={{
            backgroundImage: "linear-gradient(to right, #ff4d8f, #b84dff)",
          }}
        >
          Ver meu resultado
        </button>
      )}
    </>
  );
}
