import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import PanelSidebar from "../components/ui/PanelSidebar/PanelSidebar";
import "./PanelLayout.css";

const PanelLayout: React.FC = () => {
    return (
        <div className="panel-layout">
            <PanelSidebar />
            <main className="panel-layout__main">
                <div className="panel-layout__content">
                    <Outlet />
                </div>
            </main>
            <Toaster />
        </div>
    );
};

export default PanelLayout;
