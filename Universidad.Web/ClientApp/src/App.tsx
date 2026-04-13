import { BrowserRouter, Route, Routes } from "react-router"
import './App.css'

// Layouts
import MainLayout from "./layouts/MainLayout"

// Pages
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"


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
                </Route>

                {/* Not found route */}
                <Route path="*" element={<h1>Not Found</h1>} />

            </Routes>
        </BrowserRouter>
    )
}

export default App;