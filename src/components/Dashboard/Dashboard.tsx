import React from "react";
import { GlobalStyle, App } from "./Dashboard.styles";
import { ThemeProvider, useTheme } from "../../ThemeContext";
import { getTokens } from "../../themeTokens";
import Chat from "../Chat/Chat";
import BrainAnimation from "../BrainAnimation/BrainAnimation";

// ── Inner ──────────────────────────────────────────────────
// Separate so it can consume the ThemeContext set up by ThemeProvider

const DashboardInner: React.FC = () => {
    const { theme } = useTheme();
    const t = getTokens(theme);

    return (
        <>
            <GlobalStyle />
            <App $t={t}>
                <Chat />
                <BrainAnimation />
            </App>
        </>
    );
};

// ── Dashboard ──────────────────────────────────────────────

const Dashboard: React.FC = () => (
    <ThemeProvider>
        <DashboardInner />
    </ThemeProvider>
);

export default Dashboard;