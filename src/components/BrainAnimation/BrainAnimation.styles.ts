import styled from "styled-components";
import { noiseBg } from "../../themeTokens";
import type { ThemeTokens } from "../../themeTokens";


// ── Main Viz ───────────────────────────────────────────────

export const MainViz = styled.main<{ $t: ThemeTokens }>`
    flex: 1;
    background: ${({ $t }) => $t.vizBg};
    position: relative;
    overflow: hidden;
    font-family: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
    transition: background 0.35s ease;

    @media (max-width: 768px) {
        display: none;
    }

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: ${({ $t }) => noiseBg($t.noiseOp)};
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
        border: 1px dashed ${({ $t }) => $t.borderMid};
        border-radius: 50%;
        padding: 50px;
        width: 75vh;
        height: 75vh;
        margin: auto;
        vertical-align: center;
        backdrop-filter: blur(2px);
        -webkit-backdrop-filter: blur(2px);
        transition: border-color 0.35s ease;
    }

    .tsparticles {
        opacity: .5;
    }
`;

export interface TagProps {
    $x: number;
    $y: number;
    $color: string;
    $glow: string;
    $offset: number;
    $show: boolean;
}