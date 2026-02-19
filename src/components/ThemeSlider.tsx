import React from "react";
import styled, { keyframes } from "styled-components";
import { useTheme } from "../ThemeContext";
import { getTokens } from "../themeTokens";

// ── Animations ─────────────────────────────────────────────

const thumbGlow = keyframes`
    0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.35); }
    50%       { box-shadow: 0 0 8px 3px rgba(16, 185, 129, 0.18); }
`;

// ── Styled ─────────────────────────────────────────────────

const Track = styled.button<{ $dark: boolean; $borderMid: string }>`
    position: relative;
    width: 52px;
    height: 28px;
    border-radius: 14px;
    border: 1px solid ${({ $borderMid }) => $borderMid};
    background: ${({ $dark }) =>
    $dark ? "rgba(16,185,129,0.12)" : "rgba(255,210,80,0.12)"};
    cursor: pointer;
    flex-shrink: 0;
    outline: none;
    transition: background 0.3s ease, border-color 0.3s ease;

    &:focus-visible {
        box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.4);
    }
`;

const Thumb = styled.span<{ $dark: boolean }>`
    position: absolute;
    top: 3px;
    left: ${({ $dark }) => ($dark ? "3px" : "25px")};
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${({ $dark }) =>
    $dark
        ? "linear-gradient(135deg,#10b981,#059669)"
        : "linear-gradient(135deg,#fbbf24,#f59e0b)"};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.22);
    transition: left 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease;
    animation: ${thumbGlow} 3s ease infinite;
`;

// ── Component ──────────────────────────────────────────────

const ThemeSlider: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const t = getTokens(theme);
    const isDark = theme === "dark";

    return (
        <Track
            $dark={isDark}
    $borderMid={t.borderMid}
    onClick={toggleTheme}
    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
    <Thumb $dark={isDark}>
        {isDark ? "🌙" : "☀️"}
        </Thumb>
        </Track>
);
};

export default ThemeSlider;