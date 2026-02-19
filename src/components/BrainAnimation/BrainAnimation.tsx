import React, { useEffect, useRef } from "react";
import Brain from "./Brain";
import { animate, stagger, svg } from "animejs";
import { MainViz } from "./BrainAnimation.styles";
import Particles from "./Particle";
import { useTheme } from "../../ThemeContext";
import { getTokens } from "../../themeTokens";

// ── Component ──────────────────────────────────────────────

const BrainAnimation: React.FC = () => {
    const brainSvgRef = useRef<SVGSVGElement>(null);
    const { theme } = useTheme();
    const t = getTokens(theme);

    useEffect(() => {
        animate(svg.createDrawable("path"), {
            draw: ["0 0", "0 1", "0 1", "0 1", "0 1", "1 1"],
            ease: "inOutExpo",
            duration: 5000,
            delay: stagger(5, { from: "center" }),
            loop: true,
            alternate: true,
        });
    }, []);

    return (
        <MainViz $t={t}>
            <Particles
                key={theme}   // remounts when theme changes, picks up new colors
                particleColor={t.particleColor}
                particleLinkColor={t.particleLinkColor}
            />
            <div className="brain-animation">
                <Brain svgRef={brainSvgRef} STROKE2={t.brainStroke} />
            </div>
        </MainViz>
    );
};

export default BrainAnimation;