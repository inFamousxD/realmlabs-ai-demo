import styled, { createGlobalStyle, keyframes } from "styled-components";

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

// ── Keyframes ──────────────────────────────────────────────

const cursorBlink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`;

// ── Layout ─────────────────────────────────────────────────

export const App = styled.div`
  display: flex;
  height: 100vh;
`;

// ── Sidebar ────────────────────────────────────────────────

export const Sidebar = styled.aside`
  width: 400px;
  min-width: 400px;
  background: #0b0d18;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #181b2c;
  position: relative;
  z-index: 10;
`;

export const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 18px 13px;
  border-bottom: 1px solid #181b2c;
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const LogoText = styled.span`
  color: #fff;
  font-size: 17px;
  font-weight: 700;
  letter-spacing: -0.3px;

  em {
    font-weight: 300;
    font-style: normal;
  }
`;

export const HeaderButtons = styled.div`
  display: flex;
  gap: 6px;
`;

export const HeaderBtn = styled.button`
  background: #141626;
  border: 1px solid #20243a;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #5a5e7a;
  transition: color 0.2s, border-color 0.2s;

  &:hover {
    color: #aaa;
    border-color: #363a58;
  }
`;

export const ModelRow = styled.div`
  padding: 10px 18px;
  border-bottom: 1px solid #181b2c;
`;

export const ModelPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #141626;
  border: 1px solid #20243a;
  border-radius: 20px;
  padding: 5px 13px;
  color: #bbb;
  font-size: 13px;
  cursor: pointer;
`;

export const CtrlRow = styled.div`
  padding: 8px 18px;
  border-bottom: 1px solid #181b2c;
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

export const CtrlPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #141626;
  border: 1px solid #20243a;
  border-radius: 14px;
  padding: 4px 10px;
  color: #777;
  font-size: 12px;
  cursor: pointer;
`;

export const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 11px;
`;

export const EmptyRing = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 2px solid #22c55e;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #22c55e;
  font-size: 24px;
`;

export const EmptyTitle = styled.p`
  color: #dde;
  font-weight: 600;
  font-size: 14px;
`;

export const EmptySub = styled.p`
  color: #404460;
  font-size: 12.5px;
  text-align: center;
  line-height: 1.5;
`;

export const InputArea = styled.div`
  padding: 12px 16px;
  border-top: 1px solid #181b2c;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  background: #141626;
  border: 1px solid #20243a;
  border-radius: 12px;
  padding: 9px 14px;
  gap: 10px;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: #22c55e33;
  }

  input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #ccc;
    font-size: 13.5px;
    font-family: inherit;

    &::placeholder {
      color: #363852;
    }
  }
`;

export const SendBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #22c55e;
  padding: 0;
  display: flex;
`;

// ── Main Viz ───────────────────────────────────────────────

export const MainViz = styled.main`
  flex: 1;
  background: #0c0e1c;
  position: relative;
  overflow: hidden;
`;

export const VizCanvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

export const SentenceBubble = styled.div`
  position: absolute;
  left: 52%;
  top: 46%;
  transform: translate(-40%, -50%);
  background: rgba(36, 40, 64, 0.92);
  backdrop-filter: blur(14px);
  border-radius: 26px;
  padding: 14px 28px;
  font-size: 17px;
  color: #d8d8ee;
  border: 1px solid rgba(255, 255, 255, 0.06);
  z-index: 20;
  pointer-events: none;
  white-space: nowrap;
  min-height: 50px;
  display: flex;
  align-items: center;
`;

export const CursorBlink = styled.span`
  display: inline-block;
  width: 2px;
  height: 1.1em;
  background: #22c55e;
  margin-left: 3px;
  vertical-align: middle;
  animation: ${cursorBlink} 0.65s step-end infinite;
`;

export interface TagProps {
    $x: number;
    $y: number;
    $color: string;
    $glow: string;
    $offset: number;
    $show: boolean;
}

export const Tag = styled.div<TagProps>`
  position: absolute;
  z-index: 30;
  border-radius: 20px;
  padding: 8px 15px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 6px;
  pointer-events: none;
  left: ${({ $x }) => $x}px;
  top: ${({ $y, $offset }) => $y - 52 - $offset * 6}px;
  background: ${({ $color }) => $color};
  box-shadow: ${({ $glow }) => `0 4px 18px ${$glow}44`};
  opacity: ${({ $show }) => ($show ? 1 : 0)};
  transform: ${({ $show }) => ($show ? "translateX(-50%) translateY(-4px)" : "translateX(-50%) translateY(0)")};
  transition: opacity 0.25s ease, transform 0.25s ease;
`;