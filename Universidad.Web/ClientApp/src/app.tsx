import { BrowserRouter, Route, Routes } from "react-router"
import { Toaster } from "react-hot-toast"

// Layouts
import MainLayout from "./layouts/main-layout"
import PanelLayout from "./layouts/panel-layout"

// Pages
import Home from "@pages/home/home"
import NotFound from "@pages/not-found/not-found"
import Login from "@pages/panel/login/login"
import DashboardHomePage from "@pages/panel/dashboard/dashboard"
import UsersPage from "@pages/panel/users/users"
import GroupPage from "@pages/panel/groups/groups"
import ContentPage from "@pages/panel/content/content"
import ProfilePage from "@pages/panel/profile/profile"

const App = () => {
    return (
        <BrowserRouter>
            <Toaster position="top-right" />
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
