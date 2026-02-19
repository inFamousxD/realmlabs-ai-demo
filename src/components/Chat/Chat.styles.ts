import styled, { keyframes, css } from "styled-components";
import { noiseBg } from "../../themeTokens";
import type { ThemeTokens } from "../../themeTokens";

// ── Animations ─────────────────────────────────────────────

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
`;

const pulseRing = keyframes`
    0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.25); }
    50%       { box-shadow: 0 0 0 12px rgba(16, 185, 129, 0); }
`;

const typing = keyframes`
    0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
    40%           { opacity: 1;   transform: scale(1); }
`;

const blink = keyframes`
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
`;

const slideDown = keyframes`
    from { opacity: 0; transform: translateY(-8px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0)    scale(1); }
`;

const slideUp = keyframes`
    from { opacity: 1; transform: translateY(0)    scale(1); }
    to   { opacity: 0; transform: translateY(-8px) scale(0.96); }
`;

// ── Sidebar ────────────────────────────────────────────────

export const Sidebar = styled.aside<{ $t: ThemeTokens }>`
    width: 500px;
    background: ${({ $t }) => $t.sidebarBg};
    display: flex;
    flex-direction: column;
    border-right: 1px solid ${({ $t }) => $t.borderSubtle};
    position: relative;
    z-index: 10;
    font-family: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;
    transition: background 0.35s ease, border-color 0.35s ease;

    @media (max-width: 768px) {
        width: 100%;
        min-width: 100%;
        border-right: none;
        height: 100%;
    }

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: ${({ $t }) => noiseBg($t.noiseOp)};
        pointer-events: none;
        z-index: 0;
    }

    > * { position: relative; z-index: 1; }
`;

export const SidebarHeader = styled.div<{ $t: ThemeTokens }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px 14px;
    border-bottom: 1px solid ${({ $t }) => $t.borderSubtle};
    transition: border-color 0.35s ease;
`;

export const Logo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

export const LogoIcon = styled.div`
    width: 32px;
    height: 32px;
    border-radius: 10px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 12px rgba(16, 185, 129, 0.25);

    .material-symbols-rounded { font-size: 18px; color: #fff; }
`;

export const LogoText = styled.span<{ $t: ThemeTokens }>`
    color: ${({ $t }) => $t.textPrimary};
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.4px;
    transition: color 0.35s ease;

    em {
        font-weight: 400;
        font-style: normal;
        color: ${({ $t }) => $t.textMuted};
        transition: color 0.35s ease;
    }
`;

export const HeaderButtons = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
`;

export const HeaderBtn = styled.button<{ $t: ThemeTokens }>`
    background: transparent;
    border: 1px solid transparent;
    border-radius: 10px;
    width: 34px;
    height: 34px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ $t }) => $t.textFaint};
    transition: all 0.2s ease;

    .material-symbols-rounded { font-size: 19px; }

    &:hover {
        color: ${({ $t }) => $t.textSecondary};
        background: ${({ $t }) => $t.hoverBg};
        border-color: ${({ $t }) => $t.borderMid};
    }
`;

export const ModelRow = styled.div`
    padding: 12px 20px;
    display: flex;
    justify-content: center;
    position: relative;
`;

export const ModelPill = styled.div<{ $t: ThemeTokens }>`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: ${({ $t }) => $t.pillBg};
    border: 1px solid ${({ $t }) => $t.borderMid};
    border-radius: 24px;
    padding: 6px 16px 6px 10px;
    color: ${({ $t }) => $t.textSecondary};
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    .material-symbols-rounded { font-size: 16px; color: ${({ $t }) => $t.accent}; }

    &:hover {
        background: ${({ $t }) => $t.hoverBg};
        border-color: ${({ $t }) => $t.borderMid};
        color: ${({ $t }) => $t.textPrimary};
    }
`;

export const ModelChevron = styled.span<{ $open?: boolean; $t: ThemeTokens }>`
    .material-symbols-rounded {
        font-size: 16px;
        color: ${({ $t }) => $t.textFaint};
        transition: transform 0.2s ease, color 0.35s ease;
        display: block;
        ${({ $open }) => $open && css`transform: rotate(180deg);`}
    }
`;

// ── Dropdown ───────────────────────────────────────────────

export const DropdownOverlay = styled.div`
    position: fixed;
    inset: 0;
    z-index: 99;
`;

export const DropdownMenu = styled.div<{ $closing?: boolean; $t: ThemeTokens }>`
    position: absolute;
    min-width: 240px;
    background: ${({ $t }) => $t.dropdownBg};
    border: 1px solid ${({ $t }) => $t.borderMid};
    border-radius: 14px;
    padding: 6px;
    z-index: 100;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.18);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    animation: ${({ $closing }) => ($closing ? slideUp : slideDown)} 0.18s ease forwards;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 14px;
        background: ${({ $t }) => noiseBg($t.noiseOp)};
        pointer-events: none;
    }
`;

export const DropdownItem = styled.button<{ $selected?: boolean; $t: ThemeTokens }>`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    background: ${({ $selected, $t }) => ($selected ? $t.accentDim : "transparent")};
    border: none;
    border-radius: 10px;
    color: ${({ $selected, $t }) => ($selected ? $t.accent : $t.textMuted)};
    font-size: 13px;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: left;

    .material-symbols-rounded {
        font-size: 16px;
        color: ${({ $selected, $t }) => ($selected ? $t.accent : $t.textFaint)};
    }

    &:hover {
        background: ${({ $t }) => $t.hoverBg};
        color: ${({ $t }) => $t.textPrimary};
    }
`;

export const DropdownItemMeta = styled.span<{ $t: ThemeTokens }>`
    margin-left: auto;
    font-size: 11px;
    color: ${({ $t }) => $t.textFaint};
    font-weight: 400;
`;

export const DropdownDivider = styled.div<{ $t: ThemeTokens }>`
    height: 1px;
    background: ${({ $t }) => $t.borderSubtle};
    margin: 4px 8px;
`;

export const CtrlRow = styled.div`
    padding: 0 20px;
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
`;

export const CtrlPill = styled.div<{ $active?: boolean; $t: ThemeTokens }>`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: ${({ $active, $t }) => ($active ? $t.accentDim : $t.pillBg)};
    border: 1px solid ${({ $active, $t }) => ($active ? $t.accentBorder : $t.borderSubtle)};
    border-radius: 20px;
    padding: 5px 12px;
    color: ${({ $active, $t }) => ($active ? $t.accent : $t.textMuted)};
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;

    .material-symbols-rounded { font-size: 14px; }

    &:hover {
        background: ${({ $active, $t }) => ($active ? $t.accentDim : $t.hoverBg)};
        color: ${({ $active, $t }) => ($active ? $t.accent : $t.textSecondary)};
    }
`;

// ── Messages ───────────────────────────────────────────────

export const MessagesArea = styled.div<{ $t: ThemeTokens }>`
    flex: 1;
    overflow-y: auto;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-track { background: transparent; }
    &::-webkit-scrollbar-thumb {
        background: ${({ $t }) => $t.borderMid};
        border-radius: 4px;
    }
`;

export const MessageBubble = styled.div<{ $isUser?: boolean; $t: ThemeTokens }>`
    max-width: 85%;
    padding: 10px 14px;
    border-radius: 16px;
    font-size: 13.5px;
    line-height: 1.55;
    animation: ${fadeIn} 0.3s ease;
    transition: background 0.35s ease, color 0.35s ease;

    ${({ $isUser, $t }) =>
            $isUser
                    ? css`
                        align-self: flex-end;
                        background: ${$t.accentGrad};
                        color: #fff;
                        border-bottom-right-radius: 4px;
                    `
                    : css`
                        align-self: flex-start;
                        background: ${$t.msgBotBg};
                        border: 1px solid ${$t.borderMid};
                        color: ${$t.textSecondary};
                        border-bottom-left-radius: 4px;
                    `}
`;

export const StreamingCursor = styled.span<{ $t: ThemeTokens }>`
    display: inline-block;
    width: 2px;
    height: 14px;
    background: ${({ $t }) => $t.accent};
    margin-left: 2px;
    vertical-align: text-bottom;
    animation: ${blink} 0.8s step-end infinite;
`;

export const TypingIndicator = styled.div<{ $t: ThemeTokens }>`
    display: flex;
    gap: 4px;
    align-self: flex-start;
    padding: 12px 16px;
    background: ${({ $t }) => $t.msgBotBg};
    border: 1px solid ${({ $t }) => $t.borderMid};
    border-radius: 16px;
    border-bottom-left-radius: 4px;
    animation: ${fadeIn} 0.3s ease;

    span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${({ $t }) => $t.textMuted};
        animation: ${typing} 1.4s infinite;
        &:nth-child(2) { animation-delay: 0.2s; }
        &:nth-child(3) { animation-delay: 0.4s; }
    }
`;

export const MessageRow = styled.div<{ $isUser?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: ${({ $isUser }) => ($isUser ? "flex-end" : "flex-start")};
    gap: 4px;

    &:hover > div:last-child { opacity: 1; }
`;

export const MessageActions = styled.div<{ $isUser?: boolean }>`
    display: flex;
    gap: 2px;
    opacity: 0;
    transition: opacity 0.15s ease;
    padding: 0 4px;
`;

export const MsgActionBtn = styled.button<{ $t: ThemeTokens }>`
    background: transparent;
    border: none;
    cursor: pointer;
    width: 26px;
    height: 26px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ $t }) => $t.textFaint};
    transition: all 0.15s ease;

    .material-symbols-rounded { font-size: 15px; }

    &:hover {
        color: ${({ $t }) => $t.textMuted};
        background: ${({ $t }) => $t.hoverBg};
    }
`;

// ── Empty State ────────────────────────────────────────────

export const EmptyState = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
    animation: ${fadeIn} 0.5s ease;
`;

export const EmptyRing = styled.div<{ $t: ThemeTokens }>`
    width: 68px;
    height: 68px;
    border-radius: 50%;
    border: 2px solid ${({ $t }) => $t.accentBorder};
    background: ${({ $t }) => $t.emptyRingBg};
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${pulseRing} 3s ease-in-out infinite;

    .material-symbols-rounded { font-size: 28px; color: ${({ $t }) => $t.accent}; }
`;

export const EmptyTitle = styled.p<{ $t: ThemeTokens }>`
    color: ${({ $t }) => $t.textPrimary};
    font-weight: 600;
    font-size: 15px;
    letter-spacing: -0.2px;
    transition: color 0.35s ease;
`;

export const EmptySub = styled.p<{ $t: ThemeTokens }>`
    color: ${({ $t }) => $t.textMuted};
    font-size: 13px;
    text-align: center;
    line-height: 1.55;
    max-width: 240px;
    transition: color 0.35s ease;
`;

export const QuickActions = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;
    flex-wrap: wrap;
    justify-content: center;
`;

export const QuickAction = styled.button<{ $t: ThemeTokens }>`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    background: ${({ $t }) => $t.pillBg};
    border: 1px solid ${({ $t }) => $t.borderSubtle};
    border-radius: 12px;
    color: ${({ $t }) => $t.textMuted};
    font-size: 12px;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;

    .material-symbols-rounded {
        font-size: 15px;
        color: ${({ $t }) => $t.accent};
        opacity: 0.7;
    }

    &:hover {
        background: ${({ $t }) => $t.hoverBg};
        border-color: ${({ $t }) => $t.accentBorder};
        color: ${({ $t }) => $t.textSecondary};
        .material-symbols-rounded { opacity: 1; }
    }
`;

// ── Input ──────────────────────────────────────────────────

export const InputArea = styled.div<{ $t: ThemeTokens }>`
    padding: 14px 18px 18px;
    border-top: 1px solid ${({ $t }) => $t.borderSubtle};
    transition: border-color 0.35s ease;
`;

export const InputBox = styled.div<{ $t: ThemeTokens }>`
    display: flex;
    align-items: center;
    background: ${({ $t }) => $t.inputBg};
    border: 1px solid ${({ $t }) => $t.borderMid};
    border-radius: 14px;
    padding: 4px 6px 4px 16px;
    gap: 8px;
    transition: all 0.25s ease;

    &:focus-within {
        border-color: ${({ $t }) => $t.inputBorderFocus};
        background: ${({ $t }) => $t.hoverBg};
        box-shadow: 0 0 0 3px ${({ $t }) => $t.accentDim};
    }

    input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        color: ${({ $t }) => $t.textPrimary};
        font-size: 13.5px;
        font-family: inherit;
        padding: 8px 0;
        &::placeholder { color: ${({ $t }) => $t.textPlaceholder}; }
    }
`;

export const InputActions = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
`;

export const IconBtn = styled.button<{ $t: ThemeTokens }>`
    background: transparent;
    border: none;
    cursor: pointer;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ $t }) => $t.textFaint};
    transition: all 0.2s ease;

    .material-symbols-rounded { font-size: 20px; }

    &:hover {
        color: ${({ $t }) => $t.textMuted};
        background: ${({ $t }) => $t.hoverBg};
    }
`;

export const SendBtn = styled.button<{ $active?: boolean; $t: ThemeTokens }>`
    background: ${({ $active, $t }) => ($active ? $t.accentGrad : $t.pillBg)};
    border: none;
    cursor: ${({ $active }) => ($active ? "pointer" : "default")};
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease;

    .material-symbols-rounded {
        font-size: 20px;
        color: ${({ $active, $t }) => ($active ? "#fff" : $t.textFaint)};
    }

    &:hover {
        ${({ $active, $t }) =>
                $active &&
                css`
                    box-shadow: 0 2px 16px ${$t.accentGlow};
                    transform: scale(1.04);
                `}
    }
`;

export const InputHint = styled.div<{ $t: ThemeTokens }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 4px 0;
    font-size: 11px;
    color: ${({ $t }) => $t.textFaint};
    transition: color 0.35s ease;

    kbd {
        padding: 1px 5px;
        background: ${({ $t }) => $t.pillBg};
        border: 1px solid ${({ $t }) => $t.borderSubtle};
        border-radius: 4px;
        font-family: inherit;
        font-size: 10px;
    }
`;

// ── Settings Dropdown ──────────────────────────────────────

export const SettingsDropdown = styled.div<{ $closing?: boolean; $t: ThemeTokens }>`
    position: absolute;
    min-width: 250px;
    background: ${({ $t }) => $t.dropdownBg};
    border: 1px solid ${({ $t }) => $t.borderMid};
    border-radius: 14px;
    padding: 6px;
    z-index: 100;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    animation: ${({ $closing }) => ($closing ? slideUp : slideDown)} 0.18s ease forwards;

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 14px;
        background: ${({ $t }) => noiseBg($t.noiseOp)};
        pointer-events: none;
    }
`;

export const SettingsToggleRow = styled.div<{ $t: ThemeTokens }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover { background: ${({ $t }) => $t.hoverBg}; }
`;

export const SettingsLabel = styled.span<{ $t: ThemeTokens }>`
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${({ $t }) => $t.textSecondary};
    font-size: 13px;
    font-weight: 500;

    .material-symbols-rounded { font-size: 16px; color: ${({ $t }) => $t.textFaint}; }
`;

export const Toggle = styled.div<{ $on?: boolean; $t: ThemeTokens }>`
    width: 34px;
    height: 20px;
    border-radius: 10px;
    background: ${({ $on, $t }) => ($on ? "rgba(16,185,129,0.45)" : $t.borderMid)};
    position: relative;
    transition: background 0.2s ease;

    &::after {
        content: "";
        position: absolute;
        top: 3px;
        left: ${({ $on }) => ($on ? "17px" : "3px")};
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: ${({ $on, $t }) => ($on ? $t.accent : $t.textFaint)};
        transition: all 0.2s ease;
    }
`;