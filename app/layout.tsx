import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mounjá — Seu índice de prontidão para o GLP-1",
  description:
    "Descubra por que algumas mulheres respondem ao GLP-1 e outras não. Calcule seu índice agora.",
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
        <div className="mx-auto min-h-dvh max-w-[430px] bg-white">
          {children}
        </div>
      </body>
    </html>
  );
}
