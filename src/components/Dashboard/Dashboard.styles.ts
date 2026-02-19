import styled, { createGlobalStyle } from "styled-components";
import type { ThemeTokens } from "../../themeTokens";

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

    *, *::before, *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background: #0b0d18;
        font-family: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
        overflow: hidden;
        height: 100vh;
        transition: background 0.35s ease;
    }
`;

// ── Layout ─────────────────────────────────────────────────

export const App = styled.div<{ $t: ThemeTokens }>`
    display: flex;
    height: 100vh;
    background: ${({ $t }) => $t.appBg};
    transition: background 0.35s ease;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;