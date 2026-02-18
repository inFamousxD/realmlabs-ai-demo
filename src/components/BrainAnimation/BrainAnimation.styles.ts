import styled, {keyframes} from "styled-components";

// ── Keyframes ──────────────────────────────────────────────

const cursorBlink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
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