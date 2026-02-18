import React, { useState, useRef, useEffect } from "react";
import {
    CtrlPill,
    CtrlRow,
    EmptyRing,
    EmptyState,
    EmptySub,
    EmptyTitle,
    HeaderBtn,
    HeaderButtons,
    IconBtn,
    InputActions,
    InputArea,
    InputBox,
    InputHint,
    Logo,
    LogoIcon,
    LogoText,
    MessageBubble,
    MessagesArea,
    ModelChevron,
    ModelPill,
    ModelRow,
    QuickAction,
    QuickActions,
    SendBtn,
    Sidebar,
    SidebarHeader,
    TypingIndicator,
} from "./Chat.styles.ts";

type Message = {
    id: number;
    text: string;
    isUser: boolean;
};

const CTRL_PILLS = [
    { icon: "thermostat", label: "Temp 0.7", active: false },
    { icon: "chat_bubble", label: "Default", active: true },
    { icon: "data_array", label: "Max 2048", active: false },
    { icon: "visibility", label: "Special", active: false },
];

const QUICK_PROMPTS = [
    { icon: "code", label: "Write code" },
    { icon: "translate", label: "Translate" },
    { icon: "summarize", label: "Summarize" },
];

const Chat: React.FC = () => {
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = () => {
        const text = msg.trim();
        if (!text) return;

        const userMsg: Message = {
            id: Date.now(),
            text,
            isUser: true,
        };

        setMessages((prev) => [...prev, userMsg]);
        setMsg("");
        setIsTyping(true);

        // Simulated response
        setTimeout(() => {
            setIsTyping(false);
            const botMsg: Message = {
                id: Date.now() + 1,
                text: `This is a simulated response to: "${text}"`,
                isUser: false,
            };
            setMessages((prev) => [...prev, botMsg]);
        }, 1500);
    };

    const handleQuickPrompt = (label: string) => {
        setMsg(label + ": ");
        inputRef.current?.focus();
    };

    const hasMessages = messages.length > 0;

    return (
        <Sidebar>
            {/* ── Header ── */}
            <SidebarHeader>
                <Logo>
                    <LogoIcon>
                        <span className="material-symbols-rounded">neurology</span>
                    </LogoIcon>
                    <LogoText>
                        Realm<em>labs</em>
                    </LogoText>
                </Logo>
                <HeaderButtons>
                    <HeaderBtn aria-label="New chat" title="New chat">
                        <span className="material-symbols-rounded">edit_square</span>
                    </HeaderBtn>
                    <HeaderBtn aria-label="Export" title="Export">
                        <span className="material-symbols-rounded">download</span>
                    </HeaderBtn>
                    <HeaderBtn aria-label="Settings" title="Settings">
                        <span className="material-symbols-rounded">tune</span>
                    </HeaderBtn>
                </HeaderButtons>
            </SidebarHeader>

            {/* ── Model selector ── */}
            <ModelRow>
                <ModelPill>
                    <span className="material-symbols-rounded">auto_awesome</span>
                    Meta Llama 3.1
                    <ModelChevron>
                        <span className="material-symbols-rounded">expand_more</span>
                    </ModelChevron>
                </ModelPill>
            </ModelRow>

            {/* ── Control pills ── */}
            <CtrlRow>
                {CTRL_PILLS.map((c, i) => (
                    <CtrlPill key={i} $active={c.active}>
                        <span className="material-symbols-rounded">{c.icon}</span>
                        <span>{c.label}</span>
                    </CtrlPill>
                ))}
            </CtrlRow>

            {/* ── Messages or Empty ── */}
            {hasMessages ? (
                <MessagesArea>
                    {messages.map((m) => (
                        <MessageBubble key={m.id} $isUser={m.isUser}>
                            {m.text}
                        </MessageBubble>
                    ))}
                    {isTyping && (
                        <TypingIndicator>
                            <span />
                            <span />
                            <span />
                        </TypingIndicator>
                    )}
                    <div ref={messagesEndRef} />
                </MessagesArea>
            ) : (
                <EmptyState>
                    <EmptyRing>
                        <span className="material-symbols-rounded">forum</span>
                    </EmptyRing>
                    <EmptyTitle>Start a conversation</EmptyTitle>
                    <EmptySub>
                        Ask anything — code, creative writing, analysis, or just chat.
                    </EmptySub>
                    <QuickActions>
                        {QUICK_PROMPTS.map((q, i) => (
                            <QuickAction key={i} onClick={() => handleQuickPrompt(q.label)}>
                                <span className="material-symbols-rounded">{q.icon}</span>
                                {q.label}
                            </QuickAction>
                        ))}
                    </QuickActions>
                </EmptyState>
            )}

            {/* ── Input ── */}
            <InputArea>
                <InputBox>
                    <input
                        ref={inputRef}
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="Message Realmlabs…"
                        onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                    />
                    <InputActions>
                        <IconBtn aria-label="Attach file" title="Attach file">
                            <span className="material-symbols-rounded">attach_file</span>
                        </IconBtn>
                        <SendBtn
                            onClick={handleSend}
                            aria-label="Send"
                            $active={msg.trim().length > 0}
                        >
                            <span className="material-symbols-rounded">arrow_upward</span>
                        </SendBtn>
                    </InputActions>
                </InputBox>
                <InputHint>
          <span>
            <kbd>Enter</kbd> to send
          </span>
                    <span>Llama 3.1 · 128k context</span>
                </InputHint>
            </InputArea>
        </Sidebar>
    );
};

export default Chat;