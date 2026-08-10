import { BrowserRouter, Route, Routes } from "react-router"

// Layouts
import MainLayout from "./layouts/MainLayout"

// Pages
import Home from "@pages/Home/Home"
import NotFound from "@pages/NotFound/NotFound"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route index path="/" element={<Home />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;
