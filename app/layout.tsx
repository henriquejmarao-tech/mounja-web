import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClarityScript } from "@/components/clarity";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mounjá — Índice de Constância no Tratamento",
  description:
    "Calcule seu índice e organize sua rotina de acompanhamento com GLP-1.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={inter.className}>
      {/* GTM-TMPGTDNC */}
      <body className="min-h-dvh bg-gray-50">
        <ClarityScript />
        <div className="mx-auto min-h-dvh max-w-[430px] bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}
