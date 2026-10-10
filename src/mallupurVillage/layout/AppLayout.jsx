import { Outlet } from "react-router";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";
import ChatbotAI from "../ChatbotAI/ChatbotAI";

function AppLayout() {
    return (<>
        <AppHeader />
        <div style={{ marginTop: "80px" }}><Outlet /></div>
        <AppFooter />
        <ChatbotAI/>
    </>)
}
export default AppLayout;