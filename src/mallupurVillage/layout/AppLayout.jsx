import { Outlet } from "react-router";
import AppFooter from "./AppFooter";
import AppHeader from "./AppHeader";

function AppLayout(){
    return (<>
    <AppHeader/>
    <div><Outlet/></div>
    <AppFooter/>
    </>)
}
export default AppLayout;