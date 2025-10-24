import { Outlet } from "react-router";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

function AppLayout(){
    return (<>
    <AppHeader/>
    <Outlet/>
    <AppFooter/>
    </>)
}
export default AppLayout;