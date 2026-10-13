import { Inter, JetBrains_Mono } from "next/font/google";

/** Variable Inter — one file covers used weights; better CLS/LCP than multi-static cuts. */
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  adjustFontFallback: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-jetbrains",
  preload: false,
  adjustFontFallback: true,
});

export const fontVariableClassName = `${inter.variable} ${jetbrainsMono.variable}`;
export const fontBodyClassName = inter.className;
