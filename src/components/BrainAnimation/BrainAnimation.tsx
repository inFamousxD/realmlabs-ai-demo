import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Brain from "./Brain";
import { BrainAnimator } from "./BrainAnimator";

const MainViz = styled.main`
  flex: 1;
  background: #080a14;
  position: relative;
  overflow: hidden;
  font-family: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
  }

  > * {
    position: relative;
    z-index: 1;
  }
`;

const BrainAnimation: React.FC = () => {
    const brainSvgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const svgEl = brainSvgRef.current;
        if (!svgEl) return;

        const animator = new BrainAnimator(svgEl);
        animator.start();

        return () => animator.destroy();
    }, []);

    return (
        <MainViz>
            <Brain svgRef={brainSvgRef} />
        </MainViz>
    );
};

export default BrainAnimation;