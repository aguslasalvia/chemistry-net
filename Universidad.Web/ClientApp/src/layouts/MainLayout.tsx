import './MainLayout.css';
import { Outlet } from "react-router";
import Navbar from "../components/ui/Navbar/Navbar";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main className="main-layout">
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout;