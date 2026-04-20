import { BrowserRouter, Route, Routes } from "react-router"
import './App.css'

// Layouts
import MainLayout from "./layouts/MainLayout"
import PanelLayout from "./layouts/PanelLayout"

// Pages
// Landing
import Home from "@pages/Home/Home"
import NotFound from "@pages/NotFound/NotFound"

// Panel/Administration
import Login from "@pages/Panel/Login/Login"
import DashboardHomePage from "@pages/Panel/Dashboard/Dashboard"
import GroupPage from "@pages/Panel/Groups/Groups"
import UsersPage from "@pages/Panel/Users/Users"
import ContentPage from "@pages/Panel/Content/Content"
import ProfilePage from "@pages/Panel/Profile/Profile"



const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Student / General pages+routes */}
                <Route element={<MainLayout />} >
                    <Route index path="/" element={<Home />} />
                </Route>

                {/* Panel / Admin pages+routes */}
                <Route path="/panel">
                    <Route path="login" element={<Login />} />
                    <Route element={<PanelLayout />} >
                        <Route index path="dashboard" element={<DashboardHomePage />} />
                        <Route path="content" element={<ContentPage />} />
                        <Route path="groups" element={<GroupPage />} />
                        <Route path="users" element={<UsersPage />} />
                        <Route path="settings" element={<ProfilePage />} />
                    </Route>
                </Route>

                {/* Not found route */}
                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    )
}

export default App;