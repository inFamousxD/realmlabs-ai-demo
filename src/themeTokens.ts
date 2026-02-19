import type { Theme } from "./ThemeContext";

// ── Token Interface ────────────────────────────────────────

export interface ThemeTokens {
    // Backgrounds
    appBg: string;
    sidebarBg: string;
    vizBg: string;
    inputBg: string;
    pillBg: string;
    bubbleBg: string;
    msgBotBg: string;
    emptyRingBg: string;
    dropdownBg: string;
    hoverBg: string;

    // Borders
    borderSubtle: string;
    borderMid: string;
    borderAccent: string;
    inputBorderFocus: string;

    // Text
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    textFaint: string;
    textPlaceholder: string;

    // Accents
    accent: string;
    accentGrad: string;
    accentDim: string;
    accentBorder: string;
    accentFocus: string;
    accentGlow: string;

    // Noise texture opacity (for paper grain effect)
    noiseOp: string;

    brainStroke: string;

    particleColor: string;
    particleLinkColor: string;
}

// ── Dark Tokens ────────────────────────────────────────────

export const darkTokens: ThemeTokens = {
    appBg: "#080a14",
    sidebarBg: "#080a14",
    vizBg: "#080a14",
    inputBg: "rgba(255,255,255,0.03)",
    pillBg: "rgba(255,255,255,0.03)",
    bubbleBg: "rgba(36,40,64,0.93)",
    msgBotBg: "rgba(255,255,255,0.06)",
    emptyRingBg: "rgba(16,185,129,0.04)",
    dropdownBg: "rgba(12,14,28,0.4)",
    hoverBg: "rgba(255,255,255,0.05)",

    borderSubtle: "rgba(255,255,255,0.045)",
    borderMid: "rgba(255,255,255,0.08)",
    borderAccent: "rgba(16,185,129,0.22)",
    inputBorderFocus: "rgba(16,185,129,0.3)",

    // Bumped up from original for better legibility
    textPrimary: "rgba(255,255,255,0.95)",
    textSecondary: "rgba(255,255,255,0.85)",
    textMuted: "rgba(255,255,255,0.70)",
    textFaint: "rgba(255,255,255,0.40)",
    textPlaceholder: "rgba(255,255,255,0.20)",

    accent: "#10b981",
    accentGrad: "linear-gradient(135deg,#10b981 0%,#059669 100%)",
    accentDim: "rgba(16,185,129,0.08)",
    accentBorder: "rgba(16,185,129,0.22)",
    accentFocus: "rgba(16,185,129,0.3)",
    accentGlow: "rgba(16,185,129,0.25)",

    noiseOp: "0.050",

    brainStroke: "#b1b3f4",

    particleColor: "#ffffff30",
    particleLinkColor: "#ffffff30",
};

// ── Light Tokens ───────────────────────────────────────────

export const lightTokens: ThemeTokens = {
    // Warm parchment palette — paper-like, not flat white
    appBg: "#a6a2a1",
    sidebarBg: "#eeebe4",
    vizBg: "#e9e5dd",
    inputBg: "rgba(0,0,0,0.04)",
    pillBg: "rgba(0,0,0,0.035)",
    bubbleBg: "rgba(238,235,228,0.97)",
    msgBotBg: "rgba(0,0,0,0.05)",
    emptyRingBg: "rgba(5,150,105,0.06)",
    dropdownBg: "rgba(242,239,232,0.4)",
    hoverBg: "rgba(0,0,0,0.045)",

    borderSubtle: "rgba(0,0,0,0.07)",
    borderMid: "rgba(0,0,0,0.10)",
    borderAccent: "rgba(5,150,105,0.25)",
    inputBorderFocus: "rgba(5,150,105,0.28)",

    // Dark ink on warm ground
    textPrimary: "rgba(18,18,24,0.93)",
    textSecondary: "rgba(22,22,30,0.72)",
    textMuted: "rgba(22,22,30,0.50)",
    textFaint: "rgba(22,22,30,0.32)",
    textPlaceholder: "rgba(22,22,30,0.30)",

    // Slightly deeper green for legibility on light bg
    accent: "#059669",
    accentGrad: "linear-gradient(135deg,#10b981 0%,#059669 100%)",
    accentDim: "rgba(5,150,105,0.07)",
    accentBorder: "rgba(5,150,105,0.25)",
    accentFocus: "rgba(5,150,105,0.28)",
    accentGlow: "rgba(5,150,105,0.20)",

    noiseOp: "0.05",

    brainStroke: "#080a14",

    particleColor: "#00000018",
    particleLinkColor: "#00000018",
};

// ── Helper ─────────────────────────────────────────────────

export function getTokens(theme: Theme): ThemeTokens {
    return theme === "dark" ? darkTokens : lightTokens;
}

// ── Noise SVG helper ───────────────────────────────────────

export function noiseBg(op: string): string {
    return `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='${op}'/%3E%3C/svg%3E")`;
}