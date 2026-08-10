import { BrowserRouter, Route, Routes } from "react-router"

// Layouts
import MainLayout from "./layouts/MainLayout"
import PanelLayout from "./layouts/PanelLayout"

// Pages
import Home from "@pages/Home/Home"
import NotFound from "@pages/NotFound/NotFound"
import Login from "@pages/Panel/Login/Login"
import DashboardHomePage from "@pages/Panel/Dashboard/Dashboard"
import UsersPage from "@pages/Panel/Users/Users"
import GroupPage from "@pages/Panel/Groups/Groups"
import ContentPage from "@pages/Panel/Content/Content"
import ProfilePage from "@pages/Panel/Profile/Profile"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index path="/" element={<Home />} />
                </Route>

                <Route path="/panel">
                    <Route path="login" element={<Login />} />
                    <Route element={<PanelLayout />}>
                        <Route index path="dashboard" element={<DashboardHomePage />} />
                        <Route path="users" element={<UsersPage />} />
                        <Route path="groups" element={<GroupPage />} />
                        <Route path="content" element={<ContentPage />} />
                        <Route path="settings" element={<ProfilePage />} />
                    </Route>
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
