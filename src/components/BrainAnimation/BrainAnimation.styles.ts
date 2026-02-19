import styled, {keyframes} from "styled-components";

// ── Keyframes ──────────────────────────────────────────────

const cursorBlink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`;

// ── Main Viz ───────────────────────────────────────────────
export const MainViz = styled.main`
    flex: 1;
    background: #080a14;
    position: relative;
    overflow: hidden;
    font-family: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;

    @media (max-width: 768px) {
        display: none;
    }
    
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
        pointer-events: none;
        z-index: 0;
    }

    > * {
        position: relative;
        z-index: 1;
    }

    display: flex;
    vertical-align: center;

    .brain-animation {
        border: 1px dashed rgba(255, 255, 255, 0.1);
        border-radius: 50%;

        padding: 50px;

        width: 75vh;
        height: 75vh;

        margin: auto;
        vertical-align: center;

        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
    }
    
    .tsparticles {
        opacity: .5;
    }
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