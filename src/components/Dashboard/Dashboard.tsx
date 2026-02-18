import React, { useState, useEffect, useRef } from "react";
import {
    GlobalStyle,
    App,
    Sidebar,
    SidebarHeader,
    Logo,
    LogoText,
    HeaderButtons,
    HeaderBtn,
    ModelRow,
    ModelPill,
    CtrlRow,
    CtrlPill,
    EmptyState,
    EmptyRing,
    EmptyTitle,
    EmptySub,
    InputArea,
    InputBox,
    SendBtn,
    MainViz,
    VizCanvas,
    SentenceBubble,
    CursorBlink,
    Tag,
} from "./Dashboard.styles";

// ── Constants ──────────────────────────────────────────────

const NUM_LINES = 40;
const DOT_ROWS = 10;
const GREEN = "#4ade80";
const LINE_COL = "#6a6a6a";
const DOT_COL = "#9d9d9d";
// const DOT_GRN = "#22c55e";

const SEQUENCES = [
    {
        text: "Can I carry a gun to my office?",
        tags: [
            { label: "English", color: "#166534", glow: "#22c55e" },
            { label: "Violence", color: "#991b1b", glow: "#ef4444" },
        ],
    },
    {
        text: "Je veux manger un croissant à Paris",
        tags: [
            { label: "French", color: "#166534", glow: "#22c55e" },
            { label: "Food", color: "#166534", glow: "#22c55e" },
        ],
    },
    {
        text: "Recipe for biscuits",
        tags: [
            { label: "English", color: "#166534", glow: "#22c55e" },
            { label: "Food", color: "#166534", glow: "#22c55e" },
        ],
    },
];

// ── Types ──────────────────────────────────────────────────

interface TagItem {
    id: number;
    label: string;
    color: string;
    glow: string;
    x: number;
    y: number;
    show: boolean;
}

interface MovingDot {
    x: number;
    y: number;
}

// ── Helpers ────────────────────────────────────────────────

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

function easeInOut(t: number): number {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

function pickN<T>(arr: T[], n: number): T[] {
    return [...arr].sort(() => Math.random() - 0.5).slice(0, n);
}

// ── Canvas Renderer ────────────────────────────────────────

class GridRenderer {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    w = 0;
    h = 0;
    movingDots: MovingDot[] = [];
    private _dpr: number;
    private _rafId = 0;
    private _onResize: () => void;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this._dpr = window.devicePixelRatio || 1;
        this._onResize = () => this._resize();
        window.addEventListener("resize", this._onResize);
        this._resize();
        this._loop();
    }

    private _resize() {
        const dpr = this._dpr;
        this.w = this.canvas.offsetWidth;
        this.h = this.canvas.offsetHeight;
        this.canvas.width = this.w * dpr;
        this.canvas.height = this.h * dpr;
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    lineX(i: number): number {
        const pad = Math.max(60, this.w * 0.05);
        return pad + (i * (this.w - pad * 2)) / (NUM_LINES - 1);
    }

    dotY(row: number): number {
        const pad = Math.max(60, this.h * 0.08);
        return pad + (row * (this.h - pad * 2)) / (DOT_ROWS - 1);
    }

    private _drawGrid() {
        const { ctx } = this;

        // Vertical lines
        for (let i = 0; i < NUM_LINES; i++) {
            const x = this.lineX(i);
            ctx.save();
            ctx.globalAlpha = 0.75;
            ctx.strokeStyle = LINE_COL;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x, this.dotY(0));
            ctx.lineTo(x, this.dotY(DOT_ROWS - 1));
            ctx.stroke();
            ctx.restore();
        }

        // Horizontal connectors
        // ctx.save();
        // ctx.globalAlpha = 0.18;
        // ctx.strokeStyle = LINE_COL;
        // ctx.lineWidth = 0.8;
        // // [2, 4, 6].forEach((row) => {
        // //     const y = this.dotY(row);
        // //     ctx.beginPath();
        // //     ctx.moveTo(this.lineX(0), y);
        // //     ctx.lineTo(this.lineX(NUM_LINES - 1), y);
        // //     ctx.stroke();
        // // });
        // ctx.restore();

        // Dots
        for (let i = 0; i < NUM_LINES; i++) {
            for (let j = 0; j < DOT_ROWS; j++) {
                // const isG = (i * 3 + j * 2) % 7 === 0;
                ctx.save();
                ctx.globalAlpha = 0.5;
                ctx.fillStyle = DOT_COL;
                ctx.beginPath();
                ctx.arc(this.lineX(i), this.dotY(j), 3.5, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }
    }

    private _drawMovingDots() {
        const { ctx } = this;
        this.movingDots.forEach((d) => {
            const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, 14);
            g.addColorStop(0, "rgba(74,222,128,0.55)");
            g.addColorStop(1, "rgba(74,222,128,0)");
            ctx.save();
            ctx.globalAlpha = 1;
            ctx.fillStyle = g;
            ctx.beginPath();
            ctx.arc(d.x, d.y, 14, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = GREEN;
            ctx.beginPath();
            ctx.arc(d.x, d.y, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }

    private _draw() {
        const { ctx, w, h } = this;
        ctx.clearRect(0, 0, w, h);
        this._drawGrid();
        this._drawMovingDots();
    }

    private _loop() {
        this._rafId = requestAnimationFrame(() => {
            this._draw();
            this._loop();
        });
    }

    animateDot(
        lineIdx: number,
        stopRow: number,
        durationMs: number
    ): Promise<{ x: number; y: number; dot: MovingDot }> {
        return new Promise((resolve) => {
            const x = this.lineX(lineIdx);
            const startY = this.dotY(0);
            const endY = this.dotY(stopRow);
            const t0 = performance.now();
            const dot: MovingDot = { x, y: startY };
            this.movingDots.push(dot);

            const tick = (now: number) => {
                const p = Math.min((now - t0) / durationMs, 1);
                dot.y = lerp(startY, endY, easeInOut(p));
                if (p < 1) requestAnimationFrame(tick);
                else {
                    dot.y = endY;
                    resolve({ x, y: endY, dot });
                }
            };
            requestAnimationFrame(tick);
        });
    }

    removeDot(dot: MovingDot) {
        this.movingDots = this.movingDots.filter((d) => d !== dot);
    }

    destroy() {
        cancelAnimationFrame(this._rafId);
        window.removeEventListener("resize", this._onResize);
    }
}

// ── Control pills config ───────────────────────────────────

const CTRL_PILLS = [
    { icon: "🌡", label: "0" },
    { icon: "💬", label: "Default" },
    { icon: "≣", label: "100" },
    { icon: "👁", label: "Show Special" },
];

// ── Dashboard Component ────────────────────────────────────

const Dashboard: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendRef = useRef<GridRenderer | null>(null);
    const loopRef = useRef(false);

    const [msg, setMsg] = useState("");
    const [typed, setTyped] = useState("");
    const [showCur, setShowCur] = useState(false);
    const [tags, setTags] = useState<TagItem[]>([]);

    // Init canvas renderer
    useEffect(() => {
        const c = canvasRef.current;
        if (!c) return;
        const r = new GridRenderer(c);
        rendRef.current = r;
        return () => r.destroy();
    }, []);

    // Animation loop
    useEffect(() => {
        if (loopRef.current) return;
        loopRef.current = true;

        const go = async () => {
            await delay(600);
            let idx = 0;

            while (true) {
                const seq = SEQUENCES[idx++ % SEQUENCES.length];

                // Type the sentence
                setTyped("");
                setShowCur(true);
                for (let i = 1; i <= seq.text.length; i++) {
                    setTyped(seq.text.slice(0, i));
                    await delay(40 + Math.random() * 22);
                }
                await delay(480);
                setShowCur(false);

                const rend = rendRef.current;
                if (!rend) {
                    await delay(2000);
                    continue;
                }

                // Pick 2 random lines + stop rows
                const lines = pickN(Array.from({ length: NUM_LINES }, (_, i) => i), 2);
                const stopRows = [
                    6 + Math.floor(Math.random() * 3),
                    5 + Math.floor(Math.random() * 3),
                ];

                // Animate dots down the lines
                const results = await Promise.all(
                    lines.map((li, i) => rend.animateDot(li, stopRows[i], 1100))
                );

                // Show tag bubbles at dot stop positions
                const newTags: TagItem[] = results.map(({ x, y }, i) => ({
                    id: Math.random(),
                    label: seq.tags[i]?.label ?? "?",
                    color: seq.tags[i]?.color ?? "#166534",
                    glow: seq.tags[i]?.glow ?? "#22c55e",
                    x,
                    y,
                    show: false,
                }));
                setTags(newTags);
                await delay(30);
                setTags((t) => t.map((tg) => ({ ...tg, show: true })));
                await delay(500);

                // Blink twice
                for (let b = 0; b < 2; b++) {
                    setTags((t) => t.map((tg) => ({ ...tg, show: false })));
                    await delay(200);
                    setTags((t) => t.map((tg) => ({ ...tg, show: true })));
                    await delay(200);
                }

                await delay(350);
                results.forEach((r) => rend.removeDot(r.dot));
                setTags([]);
                setTyped("");
                await delay(400);
            }
        };

        go();
    }, []);

    const handleSend = () => setMsg("");

    return (
        <>
            <GlobalStyle />
            <App>
                {/* ── Sidebar ── */}
                <Sidebar>
                    <SidebarHeader>
                        <Logo>
                            {/* <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                                <polygon
                                    points="14,2 26,9 26,19 14,26 2,19 2,9"
                                    stroke="#22c55e"
                                    strokeWidth="1.8"
                                    fill="none"
                                />
                                <polygon
                                    points="14,8 20,12 20,18 14,22 8,18 8,12"
                                    fill="#22c55e"
                                    opacity="0.65"
                                />
                            </svg> */}
                            <LogoText>
                                Realm<em>labs</em>
                            </LogoText>
                        </Logo>

                        <HeaderButtons>
                            {/* Edit */}
                            <HeaderBtn aria-label="Edit">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 20h9" />
                                    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                                </svg>
                            </HeaderBtn>
                            {/* Download */}
                            <HeaderBtn aria-label="Download">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                    <polyline points="7 10 12 15 17 10" />
                                    <line x1="12" y1="15" x2="12" y2="3" />
                                </svg>
                            </HeaderBtn>
                            {/* Logout */}
                            <HeaderBtn aria-label="Sign out">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                                    <polyline points="16 17 21 12 16 7" />
                                    <line x1="21" y1="12" x2="9" y2="12" />
                                </svg>
                            </HeaderBtn>
                        </HeaderButtons>
                    </SidebarHeader>

                    <ModelRow>
                        <ModelPill>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v3M12 20v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M1 12h3M20 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12" />
                            </svg>
                            Meta Llama 3.1
                        </ModelPill>
                    </ModelRow>

                    <CtrlRow>
                        {CTRL_PILLS.map((c, i) => (
                            <CtrlPill key={i}>
                                <span>{c.icon}</span>
                                <span>{c.label}</span>
                            </CtrlPill>
                        ))}
                    </CtrlRow>

                    <EmptyState>
                        <EmptyRing>💬</EmptyRing>
                        <EmptyTitle>No messages yet</EmptyTitle>
                        <EmptySub>Start a conversation by typing your message below</EmptySub>
                    </EmptyState>

                    <InputArea>
                        <InputBox>
                            <input
                                value={msg}
                                onChange={(e) => setMsg(e.target.value)}
                                placeholder="Type your message..."
                                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            />
                            <SendBtn onClick={handleSend} aria-label="Send">
                                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.2">
                                    <line x1="22" y1="2" x2="11" y2="13" />
                                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                                </svg>
                            </SendBtn>
                        </InputBox>
                    </InputArea>
                </Sidebar>

                {/* ── Main Viz ── */}
                <MainViz>
                    <VizCanvas ref={canvasRef} />

                    <SentenceBubble>
                        <span>{typed}</span>
                        {showCur && <CursorBlink />}
                    </SentenceBubble>

                    {tags.map((tag, i) => (
                        <Tag
                            key={tag.id}
                            $x={tag.x}
                            $y={tag.y}
                            $color={tag.color}
                            $glow={tag.glow}
                            $offset={i}
                            $show={tag.show}
                        >
                            ⟳ {tag.label}
                        </Tag>
                    ))}
                </MainViz>
            </App>
        </>
    );
};

export default Dashboard;