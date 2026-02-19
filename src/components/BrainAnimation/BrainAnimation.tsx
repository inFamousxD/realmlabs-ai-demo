import React, { useEffect, useRef } from "react";
// import styled from "styled-components";
import Brain from "./Brain";
import {animate, stagger, svg} from "animejs";
import {MainViz} from "./BrainAnimation.styles.ts";
// import { BrainAnimator } from "./BrainAnimator";

const BrainAnimation: React.FC = () => {
    const brainSvgRef = useRef<SVGSVGElement>(null);

    // useEffect(() => {
    //     const svgEl = brainSvgRef.current;
    //     if (!svgEl) return;
    //
    //     const animator = new BrainAnimator(svgEl);
    //     animator.start();
    //
    //     return () => animator.destroy();
    // }, []);

    useEffect(() => {
        animate(svg.createDrawable('path'), {
            draw: ['0 0', '0 1', '0 1', '0 1', '0 1', '1 1'],
            ease: 'easeInOut',
            duration: 5000,
            delay: stagger(5, { from: 'center' }),
            loop: true,
            alternate: true
        });
    }, []);

    return (
        <MainViz>
            <div className="brain-animation">
                <Brain svgRef={brainSvgRef} />
            </div>
        </MainViz>
    );
};

export default BrainAnimation;