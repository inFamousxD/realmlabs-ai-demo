import { useState } from "react";

const SIDEBAR_BG = "#0d0f14";
const MAIN_BG = "#13162b";
const GREEN = "#4ade80";
const GREEN_DARK = "#22c55e";

function BrainViz() {
    const width = 760;
    const height = 860;
    const numLines = 12;
    const lineSpacing = width / (numLines + 1);

    // Floating tags
    const tags = [
        { label: "Spanish", x: 560, y: 90, icon: "🔄" },
        { label: "Food", x: 220, y: 580, icon: "🔄" },
    ];

    // Sentence bubble
    const sentence = "Je veux manger un croissant  Paris.";

    return (
        <div
            style={{
                flex: 1,
                background: MAIN_BG,
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <svg width={width} height={height} style={{ position: "absolute", top: 0, left: 0 }}>
                {/* 12 vertical parallel lines */}
                {Array.from({ length: numLines }).map((_, i) => {
                    const x = lineSpacing * (i + 1);
                    return (
                        <line
                            key={i}
                            x1={x}
                            y1={40}
                            x2={x}
                            y2={height - 40}
                            stroke="#3b4068"
                            strokeWidth={1.5}
                            opacity={0.6}
                        />
                    );
                })}

                {/* Dots on lines for circuit feel */}
                {Array.from({ length: numLines }).map((_, i) => {
                    const x = lineSpacing * (i + 1);
                    return Array.from({ length: 8 }).map((_, j) => {
                        const y = 80 + j * 100;
                        const isGreen = (i + j) % 4 === 0;
                        return (
                            <circle
                                key={`${i}-${j}`}
                                cx={x}
                                cy={y}
                                r={3.5}
                                fill={isGreen ? GREEN : "#3b4068"}
                                opacity={isGreen ? 1 : 0.7}
                            />
                        );
                    });
                })}

                {/* Horizontal connectors between some lines */}
                {[150, 300, 500, 650].map((y, idx) => (
                    <line
                        key={`h-${idx}`}
                        x1={lineSpacing * 2}
                        y1={y}
                        x2={lineSpacing * (numLines - 1)}
                        y2={y}
                        stroke="#3b4068"
                        strokeWidth={1}
                        opacity={0.3}
                    />
                ))}
            </svg>

            {/* Sentence bubble */}
            <div
                style={{
                    position: "absolute",
                    top: "44%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "rgba(180,180,200,0.18)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 40,
                    padding: "20px 38px",
                    fontSize: 22,
                    color: "#e8e8f0",
                    fontWeight: 400,
                    whiteSpace: "nowrap",
                    letterSpacing: 0.5,
                    border: "1px solid rgba(255,255,255,0.1)",
                    zIndex: 10,
                }}
            >
                {sentence}
            </div>

            {/* Floating tag: Spanish */}
            <div
                style={{
                    position: "absolute",
                    top: "16%",
                    right: "12%",
                    background: GREEN_DARK,
                    borderRadius: 24,
                    padding: "10px 22px",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    zIndex: 10,
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(34,197,94,0.4)",
                }}
            >
                <span style={{ fontSize: 14 }}>🔄</span> Spanish
            </div>

            {/* Floating tag: Food */}
            <div
                style={{
                    position: "absolute",
                    bottom: "20%",
                    left: "28%",
                    background: GREEN_DARK,
                    borderRadius: 24,
                    padding: "10px 22px",
                    fontSize: 16,
                    fontWeight: 600,
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    zIndex: 10,
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(34,197,94,0.4)",
                }}
            >
                <span style={{ fontSize: 14 }}>🔄</span> Food
            </div>
        </div>
    );
}

export default function RealmLabs() {
    const [message, setMessage] = useState("");

    return (
        <div style={{ display: "flex", height: "100vh", fontFamily: "'Inter', sans-serif", background: SIDEBAR_BG }}>
            {/* Sidebar */}
            <div
                style={{
                    width: 460,
                    minWidth: 460,
                    background: SIDEBAR_BG,
                    display: "flex",
                    flexDirection: "column",
                    borderRight: "1px solid #1e2235",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "18px 20px",
                        borderBottom: "1px solid #1e2235",
                    }}
                >
                    {/* Logo */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <svg width={28} height={28} viewBox="0 0 28 28" fill="none">
                            <polygon points="14,2 26,9 26,19 14,26 2,19 2,9" stroke={GREEN} strokeWidth={2} fill="none" />
                            <polygon points="14,8 20,12 20,18 14,22 8,18 8,12" fill={GREEN} opacity={0.7} />
                        </svg>
                        <span style={{ color: "#fff", fontWeight: 700, fontSize: 20 }}>
                            Realm<span style={{ fontWeight: 300 }}>labs</span>
                        </span>
                    </div>

                    {/* Header icons */}
                    <div style={{ display: "flex", gap: 10 }}>
                        {["✏️", "⬇️", "➡️"].map((icon, i) => (
                            <button
                                key={i}
                                style={{
                                    background: "#1a1d2e",
                                    border: "1px solid #2a2d3e",
                                    borderRadius: 8,
                                    width: 36,
                                    height: 36,
                                    cursor: "pointer",
                                    fontSize: 14,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#888",
                                }}
                            >
                                {icon}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Model selector */}
                <div style={{ padding: "14px 20px", borderBottom: "1px solid #1e2235" }}>
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            background: "#1a1d2e",
                            border: "1px solid #2a2d3e",
                            borderRadius: 20,
                            padding: "7px 16px",
                            cursor: "pointer",
                            color: "#ccc",
                            fontSize: 14,
                        }}
                    >
                        <span style={{ fontSize: 16 }}>🦙</span>
                        <span>Meta Llama 3.1</span>
                    </div>
                </div>

                {/* Control bar */}
                <div style={{ padding: "10px 20px", borderBottom: "1px solid #1e2235", display: "flex", gap: 8 }}>
                    {[
                        { icon: "🌡️", label: "0" },
                        { icon: "💬", label: "Default" },
                        { icon: "📊", label: "100" },
                        { icon: "👁️", label: "Show Special" },
                    ].map((item, i) => (
                        <button
                            key={i}
                            style={{
                                background: "#1a1d2e",
                                border: "1px solid #2a2d3e",
                                borderRadius: 16,
                                padding: "5px 12px",
                                cursor: "pointer",
                                color: "#aaa",
                                fontSize: 13,
                                display: "flex",
                                alignItems: "center",
                                gap: 5,
                            }}
                        >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* Empty state */}
                <div
                    style={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 12,
                    }}
                >
                    <div
                        style={{
                            width: 72,
                            height: 72,
                            borderRadius: "50%",
                            border: `2px solid ${GREEN_DARK}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: GREEN_DARK,
                            fontSize: 28,
                        }}
                    >
                        💬
                    </div>
                    <div style={{ color: "#e8e8f0", fontWeight: 600, fontSize: 15 }}>No messages yet</div>
                    <div style={{ color: "#666", fontSize: 13 }}>Start a conversation by typing your message below</div>
                </div>

                {/* Input bar */}
                <div style={{ padding: "16px 20px", borderTop: "1px solid #1e2235" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            background: "#1a1d2e",
                            border: "1px solid #2a2d3e",
                            borderRadius: 14,
                            padding: "10px 16px",
                            gap: 10,
                        }}
                    >
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type your message..."
                            style={{
                                flex: 1,
                                background: "transparent",
                                border: "none",
                                outline: "none",
                                color: "#ccc",
                                fontSize: 14,
                            }}
                        />
                        <button
                            style={{
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                color: GREEN_DARK,
                                fontSize: 18,
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            ➤
                        </button>
                    </div>
                </div>
            </div>

            {/* Main visualization */}
            <BrainViz />
        </div>
    );
}