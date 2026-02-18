import React, {useState} from 'react';
import {
    CtrlPill,
    CtrlRow, EmptyRing, EmptyState, EmptySub, EmptyTitle,
    HeaderBtn,
    HeaderButtons, InputArea, InputBox,
    Logo,
    LogoText,
    ModelPill,
    ModelRow, SendBtn,
    Sidebar,
    SidebarHeader
} from "./Chat.styles.ts";

const CTRL_PILLS = [
    { icon: "🌡", label: "0" },
    { icon: "💬", label: "Default" },
    { icon: "≣",  label: "100" },
    { icon: "👁",  label: "Show Special" },
];

const Chat: React.FC = () => {
    const [msg, setMsg]         = useState("");

    const handleSend = () => {}

    return (
        <Sidebar>
            <SidebarHeader>
                <Logo>
                    <LogoText>Realm<em>labs</em></LogoText>
                </Logo>
                <HeaderButtons>
                    <HeaderBtn aria-label="Edit">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                    </HeaderBtn>
                    <HeaderBtn aria-label="Download">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
                        </svg>
                    </HeaderBtn>
                    <HeaderBtn aria-label="Sign out">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                            <polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
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
                        <span>{c.icon}</span><span>{c.label}</span>
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
    )
}

export default Chat;