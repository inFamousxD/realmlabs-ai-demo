import { animate, svg, stagger } from "animejs";
import type { JSAnimation } from "animejs";

const ALL_IDS = [
    "a", "b", "c", "d", "e", "f", "g", "h",
    "i", "j", "k", "l", "m", "n", "o", "p",
];

function pickRandom<T>(arr: T[], n: number): T[] {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, n);
}

export class BrainAnimator {
    private svgEl: SVGSVGElement;
    private overlayGroup: SVGGElement;
    private anim: JSAnimation | null = null;
    private loopTimer: number | null = null;
    private destroyed = false;

    constructor(svgEl: SVGSVGElement) {
        this.svgEl = svgEl;

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", "brain-electricity");
        svgEl.appendChild(g);
        this.overlayGroup = g;
    }

    start(): void {
        this.runCycle();
    }

    private runCycle(): void {
        if (this.destroyed) return;
        this.clearCycle();

        const ids = pickRandom(ALL_IDS, 10);
        const clones: SVGPathElement[] = [];

        // Check if the defs paths sit inside a transformed <g>
        // and replicate that transform on the overlay group
        const samplePath = this.svgEl.querySelector<SVGPathElement>(
            `defs #${ids[0]}`
        );
        if (samplePath) {
            const parentG = samplePath.closest("g[transform]");
            if (parentG && parentG.closest("defs")) {
                const t = parentG.getAttribute("transform");
                if (t) this.overlayGroup.setAttribute("transform", t);
            }
        }

        for (const id of ids) {
            const src = this.svgEl.querySelector<SVGPathElement>(`defs #${id}`);
            if (!src) continue;

            const clone = src.cloneNode(true) as SVGPathElement;
            clone.removeAttribute("id");
            clone.setAttribute("fill", "none");
            clone.setAttribute("stroke", "#10b981");
            clone.setAttribute("stroke-width", "1.2");
            clone.setAttribute("stroke-linecap", "round");
            clone.setAttribute("opacity", "0.9");

            this.overlayGroup.appendChild(clone);
            clones.push(clone);
        }

        if (!clones.length) return;

        const drawables = clones.flatMap((c) => svg.createDrawable(c));

        this.anim = animate(drawables, {
            draw: ["0 0", "0 .10", ".90 1", "1 1"],
            ease: "linear",
            duration: 1600,
            delay: stagger(120),
        });

        const totalDuration = 1600 + 120 * (drawables.length - 1) + 500;
        this.loopTimer = window.setTimeout(() => this.runCycle(), totalDuration);
    }

    private clearCycle(): void {
        if (this.anim) {
            try {
                this.anim.revert();
            } catch {
                this.anim.pause();
            }
            this.anim = null;
        }
        if (this.loopTimer !== null) {
            clearTimeout(this.loopTimer);
            this.loopTimer = null;
        }
        // Reset overlay transform for next cycle
        this.overlayGroup.removeAttribute("transform");
        while (this.overlayGroup.firstChild) {
            this.overlayGroup.removeChild(this.overlayGroup.firstChild);
        }
    }

    stop(): void {
        this.clearCycle();
    }

    destroy(): void {
        this.destroyed = true;
        this.clearCycle();
        this.overlayGroup.remove();
    }
}