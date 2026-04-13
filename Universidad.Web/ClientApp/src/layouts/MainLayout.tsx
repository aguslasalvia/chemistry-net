import './MainLayout.css';
import { Outlet } from "react-router";
import Navbar from "../components/ui/Navbar/Navbar";
import Footer from '../components/ui/Footer/Footer';

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main className="main-layout">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default MainLayout;