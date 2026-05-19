"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

const TOTAL_QUESTIONS = 6;

const PROGRESS_MAP: Record<string, number> = {
  lead: 83,
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Extract question number or named segment from /quiz/X
  const segment = pathname.split("/").pop() ?? "";
  const mapped = PROGRESS_MAP[segment];
  const numeric = parseInt(segment, 10);
  const progress =
    mapped !== undefined
      ? mapped
      : isNaN(numeric)
        ? 0
        : Math.round((numeric / TOTAL_QUESTIONS) * 100);

  return (
    <div className="flex min-h-dvh flex-col px-6 pb-6 pt-6">
      {/* Logo */}
      <div className="flex justify-center">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-full"
          style={{
            backgroundImage: "linear-gradient(to right, #ff4d8f, #b84dff)",
          }}
        >
          <Image
            src="/logo.png"
            alt="Mounjá"
            width={48}
            height={48}
            className="h-11 w-11 rounded-full object-contain"
            priority
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${progress}%`,
            backgroundImage: "linear-gradient(to right, #ff4d8f, #b84dff)",
          }}
        />
      </div>

      {/* Page content */}
      <main className="flex flex-1 flex-col pt-8">{children}</main>
    </div>
  );
}
