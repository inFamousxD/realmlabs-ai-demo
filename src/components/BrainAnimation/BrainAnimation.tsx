import React, { useEffect, useRef } from "react";
import Brain from "./Brain";
import { BrainAnimator } from "./BrainAnimator";

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
        <main style={{ flex: 1, background: "#0c0e1c", position: "relative", overflow: "hidden" }}>
            <Brain svgRef={brainSvgRef} />
        </main>
    );
};

export default BrainAnimation;