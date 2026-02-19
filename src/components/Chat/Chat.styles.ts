import styled, {keyframes, css} from "styled-components";

// ── Animations ─────────────────────────────────────────────
const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(8px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const pulseRing = keyframes`
    0%, 100% {
        box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.25);
    }
    50% {
        box-shadow: 0 0 0 12px rgba(16, 185, 129, 0);
    }
`;

const typing = keyframes`
    0%, 80%, 100% {
        opacity: 0.3;
        transform: scale(0.8);
    }
    40% {
        opacity: 1;
        transform: scale(1);
    }
`;

const blink = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
`;

const slideDown = keyframes`
    from {
        opacity: 0;
        transform: translateY(-8px) scale(0.96);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`;

const slideUp = keyframes`
    from {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
    to {
        opacity: 0;
        transform: translateY(-8px) scale(0.96);
    }
`;

// ── Sidebar ────────────────────────────────────────────────
export const Sidebar = styled.aside`
    width: 500px;
    min-width: 500px;
    background: #080a14;
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgba(255, 255, 255, 0.04);
    position: relative;
    z-index: 10;
    font-family: "DM Sans", -apple-system, BlinkMacSystemFont, sans-serif;

    /* subtle grain overlay */

    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
        pointer-events: none;
        z-index: 0;
    }

    > * {
        position: relative;
        z-index: 1;
    }
`;

export const SidebarHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 20px 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.04);
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

    .material-symbols-rounded {
        font-size: 18px;
        color: #fff;
    }
`;

export const LogoText = styled.span`
    color: #f0f0f5;
    font-size: 17px;
    font-weight: 700;
    letter-spacing: -0.4px;

    em {
        font-weight: 400;
        font-style: normal;
        color: rgba(255, 255, 255, 0.4);
    }
`;

export const HeaderButtons = styled.div`
    display: flex;
    gap: 4px;
`;

export const HeaderBtn = styled.button`
    background: transparent;
    border: 1px solid transparent;
    border-radius: 10px;
    width: 34px;
    height: 34px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.25);
    transition: all 0.2s ease;

    .material-symbols-rounded {
        font-size: 19px;
    }

    &:hover {
        color: rgba(255, 255, 255, 0.7);
        background: rgba(255, 255, 255, 0.04);
        border-color: rgba(255, 255, 255, 0.06);
    }
`;

export const ModelRow = styled.div`
    padding: 12px 20px;
    display: flex;
    justify-content: center;
    position: relative;
`;

export const ModelPill = styled.div`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 24px;
    padding: 6px 16px 6px 10px;
    color: rgba(255, 255, 255, 0.6);
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;

    .material-symbols-rounded {
        font-size: 16px;
        color: #10b981;
    }

    &:hover {
        background: rgba(255, 255, 255, 0.06);
        border-color: rgba(255, 255, 255, 0.1);
        color: rgba(255, 255, 255, 0.8);
    }
`;

export const ModelChevron = styled.span<{ $open?: boolean }>`
    .material-symbols-rounded {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.2);
        transition: transform 0.2s ease;
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

export const DropdownMenu = styled.div<{ $closing?: boolean }>`
    position: absolute;
    top: calc(100% + 6px);
    left: 50%;
    transform: translateX(-50%);
    min-width: 240px;
    background: rgba(15, 17, 32, 0.82);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 6px;
    z-index: 100;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    animation: ${({ $closing }) => $closing ? slideUp : slideDown} 0.18s ease forwards;
`;

export const DropdownItem = styled.button<{ $selected?: boolean }>`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    background: ${({ $selected }) => $selected ? "rgba(16, 185, 129, 0.08)" : "transparent"};
    border: none;
    border-radius: 10px;
    color: ${({ $selected }) => $selected ? "#10b981" : "rgba(255, 255, 255, 0.55)"};
    font-size: 13px;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: left;

    .material-symbols-rounded {
        font-size: 16px;
        color: ${({ $selected }) => $selected ? "#10b981" : "rgba(255, 255, 255, 0.2)"};
    }

    &:hover {
        background: rgba(255, 255, 255, 0.05);
        color: rgba(255, 255, 255, 0.85);

        .material-symbols-rounded {
            color: rgba(255, 255, 255, 0.5);
        }
    }
`;

export const DropdownItemMeta = styled.span`
    margin-left: auto;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.15);
    font-weight: 400;
`;

export const DropdownDivider = styled.div`
    height: 1px;
    background: rgba(255, 255, 255, 0.05);
    margin: 4px 8px;
`;

export const CtrlRow = styled.div`
    padding: 0 20px;
    //border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: center;
`;

export const CtrlPill = styled.div<{ $active?: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    background: ${({$active}) =>
            $active ? "rgba(16, 185, 129, 0.08)" : "rgba(255, 255, 255, 0.02)"};
    border: 1px solid ${({$active}) =>
            $active ? "rgba(16, 185, 129, 0.2)" : "rgba(255, 255, 255, 0.05)"};
    border-radius: 20px;
    padding: 5px 12px;
    color: ${({$active}) =>
            $active ? "#10b981" : "rgba(255, 255, 255, 0.35)"};
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    user-select: none;

    .material-symbols-rounded {
        font-size: 14px;
    }

    &:hover {
        background: ${({$active}) =>
                $active ? "rgba(16, 185, 129, 0.12)" : "rgba(255, 255, 255, 0.05)"};
        color: ${({$active}) =>
                $active ? "#34d399" : "rgba(255, 255, 255, 0.55)"};
    }
`;

// ── Messages Area ──────────────────────────────────────────
export const MessagesArea = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 16px 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    /* Scrollbar */

    &::-webkit-scrollbar {
        width: 4px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.08);
        border-radius: 4px;
    }
`;

export const MessageBubble = styled.div<{ $isUser?: boolean }>`
    max-width: 85%;
    padding: 10px 14px;
    border-radius: 16px;
    font-size: 13.5px;
    line-height: 1.55;
    animation: ${fadeIn} 0.3s ease;

    ${({$isUser}) =>
            $isUser
                    ? css`
                        align-self: flex-end;
                        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                        color: #fff;
                        border-bottom-right-radius: 4px;
                    `
                    : css`
                        align-self: flex-start;
                        background: rgba(255, 255, 255, 0.04);
                        border: 1px solid rgba(255, 255, 255, 0.06);
                        color: rgba(255, 255, 255, 0.75);
                        border-bottom-left-radius: 4px;
                    `}
`;

export const StreamingCursor = styled.span`
    display: inline-block;
    width: 2px;
    height: 14px;
    background: #10b981;
    margin-left: 2px;
    vertical-align: text-bottom;
    animation: ${blink} 0.8s step-end infinite;
`;

export const TypingIndicator = styled.div`
    display: flex;
    gap: 4px;
    align-self: flex-start;
    padding: 12px 16px;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 16px;
    border-bottom-left-radius: 4px;
    animation: ${fadeIn} 0.3s ease;

    span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        animation: ${typing} 1.4s infinite;

        &:nth-child(2) {
            animation-delay: 0.2s;
        }

        &:nth-child(3) {
            animation-delay: 0.4s;
        }
    }
`;

// ── Message Actions (on hover) ─────────────────────────────
export const MessageRow = styled.div<{ $isUser?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: ${({ $isUser }) => $isUser ? "flex-end" : "flex-start"};
    gap: 4px;

    &:hover > div:last-child {
        opacity: 1;
    }
`;

export const MessageActions = styled.div<{ $isUser?: boolean }>`
    display: flex;
    gap: 2px;
    opacity: 0;
    transition: opacity 0.15s ease;
    padding: 0 4px;
`;

export const MsgActionBtn = styled.button`
    background: transparent;
    border: none;
    cursor: pointer;
    width: 26px;
    height: 26px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.15);
    transition: all 0.15s ease;

    .material-symbols-rounded {
        font-size: 15px;
    }

    &:hover {
        color: rgba(255, 255, 255, 0.5);
        background: rgba(255, 255, 255, 0.04);
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

export const EmptyRing = styled.div`
    width: 68px;
    height: 68px;
    border-radius: 50%;
    border: 2px solid rgba(16, 185, 129, 0.3);
    background: rgba(16, 185, 129, 0.04);
    display: flex;
    align-items: center;
    justify-content: center;
    animation: ${pulseRing} 3s ease-in-out infinite;

    .material-symbols-rounded {
        font-size: 28px;
        color: #10b981;
    }
`;

export const EmptyTitle = styled.p`
    color: rgba(255, 255, 255, 0.85);
    font-weight: 600;
    font-size: 15px;
    letter-spacing: -0.2px;
`;

export const EmptySub = styled.p`
    color: rgba(255, 255, 255, 0.2);
    font-size: 13px;
    text-align: center;
    line-height: 1.55;
    max-width: 240px;
`;

export const QuickActions = styled.div`
    display: flex;
    gap: 8px;
    margin-top: 8px;
    flex-wrap: wrap;
    justify-content: center;
`;

export const QuickAction = styled.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 14px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 12px;
    color: rgba(255, 255, 255, 0.4);
    font-size: 12px;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.2s ease;

    .material-symbols-rounded {
        font-size: 15px;
        color: rgba(16, 185, 129, 0.6);
    }

    &:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(16, 185, 129, 0.15);
        color: rgba(255, 255, 255, 0.65);

        .material-symbols-rounded {
            color: #10b981;
        }
    }
`;

// ── Input Area ─────────────────────────────────────────────
export const InputArea = styled.div`
    padding: 14px 18px 18px;
    border-top: 1px solid rgba(255, 255, 255, 0.04);
`;

export const InputBox = styled.div`
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 14px;
    padding: 4px 6px 4px 16px;
    gap: 8px;
    transition: all 0.25s ease;

    &:focus-within {
        border-color: rgba(16, 185, 129, 0.3);
        background: rgba(255, 255, 255, 0.04);
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.06);
    }

    input {
        flex: 1;
        background: transparent;
        border: none;
        outline: none;
        color: rgba(255, 255, 255, 0.85);
        font-size: 13.5px;
        font-family: inherit;
        padding: 8px 0;

        &::placeholder {
            color: rgba(255, 255, 255, 0.15);
        }
    }
`;

export const InputActions = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
`;

export const IconBtn = styled.button<{ $accent?: boolean }>`
    background: transparent;
    border: none;
    cursor: pointer;
    width: 34px;
    height: 34px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255, 255, 255, 0.2);
    transition: all 0.2s ease;

    .material-symbols-rounded {
        font-size: 20px;
    }

    &:hover {
        color: rgba(255, 255, 255, 0.5);
        background: rgba(255, 255, 255, 0.04);
    }
`;

export const SendBtn = styled.button<{ $active?: boolean }>`
    background: ${({$active}) =>
            $active
                    ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                    : "rgba(255, 255, 255, 0.04)"};
    border: none;
    cursor: ${({$active}) => ($active ? "pointer" : "default")};
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease;

    .material-symbols-rounded {
        font-size: 20px;
        color: ${({$active}) =>
                $active ? "#fff" : "rgba(255, 255, 255, 0.12)"};
    }

    &:hover {
        ${({$active}) =>
                $active &&
                css`
                    box-shadow: 0 2px 16px rgba(16, 185, 129, 0.35);
                    transform: scale(1.04);
                `}
    }
`;

export const InputHint = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 4px 0;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.12);

    kbd {
        padding: 1px 5px;
        background: rgba(255, 255, 255, 0.04);
        border: 1px solid rgba(255, 255, 255, 0.06);
        border-radius: 4px;
        font-family: inherit;
        font-size: 10px;
    }
`;

// ── Settings Dropdown ──────────────────────────────────────
export const SettingsDropdown = styled.div<{ $closing?: boolean }>`
    position: absolute;
    top: calc(100% + 4px);
    right: 0;
    min-width: 250px;
    background: rgba(15, 17, 32, 0.82);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 14px;
    padding: 6px;
    z-index: 100;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    animation: ${({ $closing }) => $closing ? slideUp : slideDown} 0.18s ease forwards;
`;

export const SettingsToggleRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.04);
    }
`;

export const SettingsLabel = styled.span`
    display: flex;
    align-items: center;
    gap: 8px;
    color: rgba(255, 255, 255, 0.55);
    font-size: 13px;
    font-weight: 500;

    .material-symbols-rounded {
        font-size: 16px;
        color: rgba(255, 255, 255, 0.2);
    }
`;

export const Toggle = styled.div<{ $on?: boolean }>`
    width: 34px;
    height: 20px;
    border-radius: 10px;
    background: ${({ $on }) => $on ? "rgba(16, 185, 129, 0.5)" : "rgba(255, 255, 255, 0.08)"};
    position: relative;
    transition: background 0.2s ease;

    &::after {
        content: "";
        position: absolute;
        top: 3px;
        left: ${({ $on }) => $on ? "17px" : "3px"};
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: ${({ $on }) => $on ? "#10b981" : "rgba(255, 255, 255, 0.25)"};
        transition: all 0.2s ease;
    }
`;