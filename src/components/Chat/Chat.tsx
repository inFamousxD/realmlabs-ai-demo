import React, { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import {
    CtrlPill,
    CtrlRow,
    DropdownDivider,
    DropdownItem,
    DropdownItemMeta,
    DropdownMenu,
    DropdownOverlay,
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
    MessageActions,
    MessageBubble,
    MessageRow,
    MessagesArea,
    ModelChevron,
    ModelPill,
    ModelRow,
    MsgActionBtn,
    QuickAction,
    QuickActions,
    SendBtn,
    SettingsDropdown,
    SettingsLabel,
    SettingsToggleRow,
    Sidebar,
    SidebarHeader,
    StreamingCursor,
    Toggle,
    TypingIndicator,
} from "./Chat.styles.ts";

type Message = {
    id: number;
    text: string;
    isUser: boolean;
    streaming?: boolean;
    displayedText?: string;
};

type Model = {
    id: string;
    name: string;
    icon: string;
    context: string;
};

type DropdownPos = { top: number; left: number; width: number };

const MODELS: Model[] = [
    { id: "llama-3.1", name: "Meta Llama 3.1", icon: "auto_awesome", context: "128k" },
    { id: "llama-3.2", name: "Meta Llama 3.2", icon: "auto_awesome", context: "128k" },
    { id: "mistral-7b", name: "Mistral 7B", icon: "bolt", context: "32k" },
    { id: "gemma-2", name: "Google Gemma 2", icon: "diamond", context: "8k" },
    { id: "phi-3", name: "Microsoft Phi-3", icon: "hexagon", context: "4k" },
];

const SIMULATED_RESPONSES: Record<string, string> = {
    "Write code":
        "Sure! Here's a quick example of a React component that fetches data from an API and displays it in a list:\n\n```tsx\nconst DataList = () => {\n  const [items, setItems] = useState([]);\n  useEffect(() => {\n    fetch('/api/items')\n      .then(res => res.json())\n      .then(setItems);\n  }, []);\n  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;\n};\n```\n\nWould you like me to add error handling or loading states?",
    Translate:
        "I'd be happy to help translate! Just provide the text and specify the target language. I support over 50 languages including Spanish, French, German, Japanese, Korean, Mandarin, Arabic, and many more.",
    Summarize:
        "I can summarize text, articles, documents, or even conversations. Just paste the content you'd like me to condense, and I'll provide a clear, concise summary highlighting the key points.",
    default:
        "That's a great question! Let me think about this for a moment.\n\nBased on the information available, I can provide some insights. The topic you're asking about has several important aspects to consider. First, it's worth noting the broader context and how different factors interact with each other.\n\nWould you like me to dive deeper into any particular aspect of this?",
};

const CTRL_DEFAULTS = [
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

const SETTINGS = [
    { icon: "stream", label: "Stream response", key: "stream" },
    { icon: "history", label: "Chat history", key: "history" },
    { icon: "dark_mode", label: "Dark mode", key: "dark" },
];

// ── Utility: get position below a ref element ──────────────
function getBelowPos(ref: React.RefObject<HTMLElement | null>): DropdownPos | null {
    if (!ref.current) return null;
    const rect = ref.current.getBoundingClientRect();
    return {
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
    };
}

const Chat: React.FC = () => {
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [isStreaming, setIsStreaming] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Refs for positioning portalled dropdowns
    const modelPillRef = useRef<HTMLDivElement>(null);
    const settingsBtnRef = useRef<HTMLButtonElement>(null);

    // Dropdown states
    const [modelDropdownOpen, setModelDropdownOpen] = useState(false);
    const [modelDropdownClosing, setModelDropdownClosing] = useState(false);
    const [modelDropdownPos, setModelDropdownPos] = useState<DropdownPos | null>(null);
    const [selectedModel, setSelectedModel] = useState<Model>(MODELS[0]);

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [settingsClosing, setSettingsClosing] = useState(false);
    const [settingsPos, setSettingsPos] = useState<DropdownPos | null>(null);
    const [settings, setSettings] = useState<Record<string, boolean>>({
        stream: true,
        history: true,
        dark: true,
    });

    // Toggleable control pills
    const [ctrlPills, setCtrlPills] = useState(CTRL_DEFAULTS);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping, isStreaming]);

    // ── Animated close helpers ──────────────────────────────
    const closeModelDropdown = useCallback(() => {
        setModelDropdownClosing(true);
        setTimeout(() => {
            setModelDropdownOpen(false);
            setModelDropdownClosing(false);
        }, 160);
    }, []);

    const closeSettings = useCallback(() => {
        setSettingsClosing(true);
        setTimeout(() => {
            setSettingsOpen(false);
            setSettingsClosing(false);
        }, 160);
    }, []);

    // ── Streaming text simulation ───────────────────────────
    const streamText = useCallback((fullText: string, msgId: number) => {
        setIsStreaming(true);
        let idx = 0;
        const words = fullText.split(/(\s+)/);
        const interval = setInterval(() => {
            idx++;
            const displayed = words.slice(0, idx).join("");
            setMessages((prev) =>
                prev.map((m) =>
                    m.id === msgId
                        ? { ...m, displayedText: displayed, streaming: idx < words.length }
                        : m
                )
            );
            if (idx >= words.length) {
                clearInterval(interval);
                setIsStreaming(false);
            }
        }, 35 + Math.random() * 30);
    }, []);

    // ── Send handler ────────────────────────────────────────
    const handleSend = () => {
        const text = msg.trim();
        if (!text || isStreaming) return;

        const userMsg: Message = { id: Date.now(), text, isUser: true };
        setMessages((prev) => [...prev, userMsg]);
        setMsg("");
        setIsTyping(true);

        const matchedKey = Object.keys(SIMULATED_RESPONSES).find((k) =>
            text.toLowerCase().startsWith(k.toLowerCase())
        );
        const responseText = matchedKey
            ? SIMULATED_RESPONSES[matchedKey]
            : SIMULATED_RESPONSES.default;

        setTimeout(() => {
            setIsTyping(false);
            const botMsgId = Date.now() + 1;
            const botMsg: Message = {
                id: botMsgId,
                text: responseText,
                isUser: false,
                streaming: true,
                displayedText: "",
            };
            setMessages((prev) => [...prev, botMsg]);
            streamText(responseText, botMsgId);
        }, 800 + Math.random() * 600);
    };

    const handleQuickPrompt = (label: string) => {
        setMsg(label + ": ");
        inputRef.current?.focus();
    };

    const handleModelSelect = (model: Model) => {
        setSelectedModel(model);
        closeModelDropdown();
    };

    const toggleSetting = (key: string) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleCtrlPill = (index: number) => {
        setCtrlPills((prev) =>
            prev.map((p, i) => (i === index ? { ...p, active: !p.active } : p))
        );
    };

    const hasMessages = messages.length > 0;

    // ── Portal: Model dropdown ──────────────────────────────
    const modelDropdownPortal = (modelDropdownOpen || modelDropdownClosing) &&
        modelDropdownPos &&
        createPortal(
            <>
                <DropdownOverlay onClick={closeModelDropdown} />
                <DropdownMenu
                    $closing={modelDropdownClosing}
                    style={{
                        position: "fixed",
                        top: modelDropdownPos.top,
                        // Centre under the pill
                        left: modelDropdownPos.left + modelDropdownPos.width / 2,
                        transform: "translateX(-50%)",
                        minWidth: 240,
                    }}
                >
                    {MODELS.map((m, i) => (
                        <React.Fragment key={m.id}>
                            <DropdownItem
                                $selected={selectedModel.id === m.id}
                                onClick={() => handleModelSelect(m)}
                            >
                                <span className="material-symbols-rounded">{m.icon}</span>
                                {m.name}
                                <DropdownItemMeta>{m.context}</DropdownItemMeta>
                            </DropdownItem>
                            {i === 1 && <DropdownDivider />}
                        </React.Fragment>
                    ))}
                </DropdownMenu>
            </>,
            document.body
        );

    // ── Portal: Settings dropdown ───────────────────────────
    const settingsDropdownPortal = (settingsOpen || settingsClosing) &&
        settingsPos &&
        createPortal(
            <>
                <DropdownOverlay onClick={closeSettings} />
                <SettingsDropdown
                    $closing={settingsClosing}
                    style={{
                        position: "fixed",
                        top: settingsPos.top,
                        // Align right edge of dropdown to right edge of button,
                        // but clamp so it never goes off the left edge of the screen
                        left: Math.max(8, settingsPos.left + settingsPos.width - 250),
                        right: "unset",
                        minWidth: 250,
                    }}
                >
                    {SETTINGS.map((s) => (
                        <SettingsToggleRow key={s.key} onClick={() => toggleSetting(s.key)}>
                            <SettingsLabel>
                                <span className="material-symbols-rounded">{s.icon}</span>
                                {s.label}
                            </SettingsLabel>
                            <Toggle $on={settings[s.key]} />
                        </SettingsToggleRow>
                    ))}
                </SettingsDropdown>
            </>,
            document.body
        );

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
                    <HeaderBtn aria-label="New chat" title="New chat"
                               onClick={() => {
                                   setMessages([]);
                                   setIsTyping(false);
                                   setIsStreaming(false);
                               }}
                    >
                        <span className="material-symbols-rounded">edit_square</span>
                    </HeaderBtn>
                    <HeaderBtn aria-label="Export" title="Export">
                        <span className="material-symbols-rounded">download</span>
                    </HeaderBtn>
                    <HeaderBtn
                        ref={settingsBtnRef}
                        aria-label="Settings"
                        title="Settings"
                        onClick={() => {
                            if (settingsOpen) {
                                closeSettings();
                            } else {
                                const pos = getBelowPos(settingsBtnRef);
                                if (pos) setSettingsPos(pos);
                                setSettingsOpen(true);
                                if (modelDropdownOpen) closeModelDropdown();
                            }
                        }}
                    >
                        <span className="material-symbols-rounded">tune</span>
                    </HeaderBtn>
                </HeaderButtons>
            </SidebarHeader>

            {/* ── Model selector ── */}
            <ModelRow>
                <ModelPill
                    ref={modelPillRef}
                    onClick={() => {
                        if (modelDropdownOpen) {
                            closeModelDropdown();
                        } else {
                            const pos = getBelowPos(modelPillRef);
                            if (pos) setModelDropdownPos(pos);
                            setModelDropdownOpen(true);
                            if (settingsOpen) closeSettings();
                        }
                    }}
                >
                    <span className="material-symbols-rounded">{selectedModel.icon}</span>
                    {selectedModel.name}
                    <ModelChevron $open={modelDropdownOpen}>
                        <span className="material-symbols-rounded">expand_more</span>
                    </ModelChevron>
                </ModelPill>
            </ModelRow>

            {/* ── Control pills ── */}
            <CtrlRow>
                {ctrlPills.map((c, i) => (
                    <CtrlPill key={i} $active={c.active} onClick={() => toggleCtrlPill(i)}>
                        <span className="material-symbols-rounded">{c.icon}</span>
                        <span>{c.label}</span>
                    </CtrlPill>
                ))}
            </CtrlRow>

            {/* ── Messages or Empty ── */}
            {hasMessages ? (
                <MessagesArea>
                    {messages.map((m) => (
                        <MessageRow key={m.id} $isUser={m.isUser}>
                            <MessageBubble $isUser={m.isUser}>
                                {m.isUser ? m.text : (m.displayedText ?? m.text)}
                                {!m.isUser && m.streaming && <StreamingCursor />}
                            </MessageBubble>
                            {!m.streaming && (
                                <MessageActions $isUser={m.isUser}>
                                    <MsgActionBtn title="Copy">
                                        <span className="material-symbols-rounded">content_copy</span>
                                    </MsgActionBtn>
                                    {!m.isUser && (
                                        <MsgActionBtn title="Regenerate">
                                            <span className="material-symbols-rounded">refresh</span>
                                        </MsgActionBtn>
                                    )}
                                    <MsgActionBtn title="More">
                                        <span className="material-symbols-rounded">more_horiz</span>
                                    </MsgActionBtn>
                                </MessageActions>
                            )}
                        </MessageRow>
                    ))}
                    {isTyping && (
                        <TypingIndicator>
                            <span /><span /><span />
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
                        disabled={isStreaming}
                    />
                    <InputActions>
                        <IconBtn aria-label="Attach file" title="Attach file">
                            <span className="material-symbols-rounded">attach_file</span>
                        </IconBtn>
                        <SendBtn
                            onClick={handleSend}
                            aria-label="Send"
                            $active={msg.trim().length > 0 && !isStreaming}
                        >
                            <span className="material-symbols-rounded">arrow_upward</span>
                        </SendBtn>
                    </InputActions>
                </InputBox>
                <InputHint>
                    <span><kbd>Enter</kbd> to send</span>
                    <span>{selectedModel.name} · {selectedModel.context} context</span>
                </InputHint>
            </InputArea>

            {/* ── Portalled dropdowns ── */}
            {modelDropdownPortal}
            {settingsDropdownPortal}
        </Sidebar>
    );
};

export default Chat;