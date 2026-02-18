import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: #0b0d18;
    font-family: 'Inter', -apple-system, sans-serif;
    overflow: hidden;
    height: 100vh;
  }
`;

// ── Layout ─────────────────────────────────────────────────

export const App = styled.div`
  display: flex;
  height: 100vh;
`;
