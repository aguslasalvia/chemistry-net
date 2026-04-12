import { BrowserRouter, Route, Routes } from "react-router"
import './App.css'
import Home from "./pages/Home/Home"
import MainLayout from "./layouts/MainLayout"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout/>} >
                    <Route index path="/" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;