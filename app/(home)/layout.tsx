import { Geist, Geist_Mono, Unbounded } from "next/font/google";
import ScrollFX from "@/components/shared/ScrollFX";
import "../site.css";

const display = Unbounded({ subsets: ["latin"], variable: "--font-display" });
const body = Geist({ subsets: ["latin"], variable: "--font-body" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`site ${display.variable} ${body.variable} ${mono.variable}`}>
      {children}
      <ScrollFX />
    </div>
  );
}
