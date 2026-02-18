import React from "react";
import {
    GlobalStyle, App
} from "./Dashboard.styles";
import Chat from "../Chat/Chat.tsx";
import BrainAnimation from "../BrainAnimation/BrainAnimation.tsx";

// ── Constants ──────────────────────────────────────────────


// ── Dashboard ──────────────────────────────────────────────

const Dashboard: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <App>
                <Chat />
                <BrainAnimation />
            </App>
        </>
    );
};

export default Dashboard;