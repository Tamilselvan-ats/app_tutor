import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CT TITAN | Exam Prep for Advanced Programming Practice",
  description: "Production-grade Class Test (CT) examination weapon for Advanced Programming Practice (Units 3 & 4). Maximize CT marks with AI predictions, question bank, exam simulator, and one-night revision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-titan-bg text-slate-100 min-h-screen selection:bg-amber-500/30 selection:text-amber-200">
        {children}
      </body>
    </html>
  );
}
