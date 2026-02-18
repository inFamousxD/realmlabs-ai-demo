import { createTimeline, animate, Timeline } from "animejs";

export interface AnimTag {
    label: string;
    color: string;
    glow: string;
}

const TAG_PATH_MAP: Record<string, string[]> = {
    violence: ["a", "b", "h", "i", "j", "p"],
    english:  ["e", "f", "m", "n"],
    french:   ["e", "f", "m", "n"],
    food:     ["c", "d", "k", "l"],
    default:  ["g", "o"],
};

function pathIdsForTag(label: string): string[] {
    const key = label.toLowerCase();
    console.log("key", key);
    return TAG_PATH_MAP[key] ?? TAG_PATH_MAP["default"];
}

export class BrainAnimator {
    private svg: SVGSVGElement;
    private overlayGroup: SVGGElement;
    private activeTimeline: Timeline | null = null;
    private idleAnims: ReturnType<typeof animate>[] = [];

    constructor(svg: SVGSVGElement) {
        this.svg = svg;

        const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.setAttribute("class", "brain-anim-overlay");
        svg.appendChild(g);
        this.overlayGroup = g;
    }

    animateTags(tags: AnimTag[]) {
        this.stopIdle();
        this.clearOverlay();

        type TraceEntry = { el: SVGPathElement; len: number; tagIdx: number; pathIdx: number };
        const traces: TraceEntry[] = [];

        tags.forEach((tag, tagIdx) => {
            pathIdsForTag(tag.label).forEach((id, pathIdx) => {
                const defPath = this.svg.querySelector<SVGPathElement>(`defs #${id}`);
                if (!defPath) return;

                const clone = defPath.cloneNode(true) as SVGPathElement;
                clone.removeAttribute("id");
                clone.setAttribute("fill", "none");
                clone.setAttribute("stroke", tag.color);
                clone.setAttribute("stroke-width", "1");
                clone.setAttribute("stroke-linecap", "round");
                clone.style.opacity = "0";
                clone.style.filter = `drop-shadow(0 0 5px ${tag.glow}) drop-shadow(0 0 14px ${tag.glow}88)`;

                this.overlayGroup.appendChild(clone);

                const len = clone.getTotalLength?.() ?? 200;
                clone.setAttribute("stroke-dasharray", `${len}`);
                clone.setAttribute("stroke-dashoffset", `${len}`);

                traces.push({ el: clone, len, tagIdx, pathIdx });
            });
        });

        if (!traces.length) return;

        const tl = createTimeline();
        this.activeTimeline = tl;

        traces.forEach(({ el, len, tagIdx, pathIdx }) => {
            const stagger = tagIdx * 150 + pathIdx * 70;

            tl
                .add(el, {
                    opacity: [0, 1],
                    duration: 80,
                    delay: stagger,
                    ease: "out",
                }, "<<")
                .add(el, {
                    strokeDashoffset: [len, 0],
                    duration: 900,
                    ease: "inOutQuart",
                }, "<<")
                .add(el, {
                    opacity: [1, 0],
                    duration: 400,
                    ease: "out",
                }, `<<+=900`);
        });
    }

    startIdle() {
        this.stopIdle();
        this.clearOverlay();

        const ids = ["g", "o", "c", "k"];

        ids.forEach((id, i) => {
            const defPath = this.svg.querySelector<SVGPathElement>(`defs #${id}`);
            if (!defPath) return;

            const clone = defPath.cloneNode(true) as SVGPathElement;
            clone.removeAttribute("id");
            clone.setAttribute("fill", "none");
            clone.setAttribute("stroke", "#4a4e7a");
            clone.setAttribute("stroke-width", "1");
            clone.setAttribute("stroke-linecap", "round");
            clone.setAttribute("stroke-dasharray", "6 20");
            clone.style.opacity = "0.05";
            this.overlayGroup.appendChild(clone);

            const anim = animate(clone, {
                opacity: [0.05, 0.2, 0.05],
                duration: 2800 + i * 400,
                delay: i * 350,
                ease: "inOutSine",
                loop: true,
                alternate: true,
            });

            this.idleAnims.push(anim);
        });
    }

    stopIdle() {
        this.idleAnims.forEach((a) => a.pause());
        this.idleAnims = [];
    }

    clearOverlay() {
        if (this.activeTimeline) {
            this.activeTimeline.pause();
            this.activeTimeline = null;
        }
        while (this.overlayGroup.firstChild) {
            this.overlayGroup.removeChild(this.overlayGroup.firstChild);
        }
    }

    destroy() {
        this.clearOverlay();
        this.stopIdle();
        this.overlayGroup.remove();
    }
}