import React, {useEffect, useRef, useState} from 'react';
import {CursorBlink, MainViz, SentenceBubble} from "./BrainAnimation.styles.ts";
import Brain from "./Brain.tsx";
import {BrainAnimator} from "./BrainAnimator.ts";

const SEQUENCES = [
    {
        text: "Can I carry a gun to my office?",
        tags: [
            { label: "English",  color: "#22c55e", glow: "#22c55e" },
            { label: "Violence", color: "#ef4444", glow: "#ef4444" },
        ],
    },
    {
        text: "Je veux manger un croissant à Paris",
        tags: [
            { label: "French", color: "#22c55e", glow: "#22c55e" },
            { label: "Food",   color: "#f59e0b", glow: "#f59e0b" },
        ],
    },
    {
        text: "Recipe for biscuits",
        tags: [
            { label: "English", color: "#22c55e", glow: "#22c55e" },
            { label: "Food",    color: "#f59e0b", glow: "#f59e0b" },
        ],
    },
];

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));


const BrainAnimation: React.FC = () => {
    const [typed, setTyped]     = useState("");
    const [showCur, setShowCur] = useState(false);

    const brainSvgRef = useRef<SVGSVGElement>(null);
    const animatorRef = useRef<BrainAnimator | null>(null);
    const loopRef     = useRef(false);

    // Init animator once SVG is mounted
    useEffect(() => {
        if (!brainSvgRef.current) return;
        const anim = new BrainAnimator(brainSvgRef.current);
        animatorRef.current = anim;
        anim.startIdle();
        return () => anim.destroy();
    }, []);

    // Main auto-loop
    useEffect(() => {
        if (loopRef.current) return;
        loopRef.current = true;

        const go = async () => {
            await delay(800);
            let idx = 0;

            while (true) {
                const seq = SEQUENCES[idx++ % SEQUENCES.length];

                // Type sentence
                setTyped("");
                setShowCur(true);
                for (let i = 1; i <= seq.text.length; i++) {
                    setTyped(seq.text.slice(0, i));
                    await delay(38 + Math.random() * 20);
                }
                await delay(450);
                setShowCur(false);

                // Fire brain animation
                animatorRef.current?.animateTags(seq.tags);

                // Hold so animation plays out
                await delay(1900);

                // Idle + brief pause before next sequence
                animatorRef.current?.startIdle();
                setTyped("");
                await delay(600);
            }
        };

        go();
    }, []);

    return (
        <MainViz>
            <Brain svgRef={brainSvgRef} />
            {typed && (
                <SentenceBubble>
                    <span>{typed}</span>
                    {showCur && <CursorBlink />}
                </SentenceBubble>
            )}
        </MainViz>
    )
}

export default BrainAnimation;