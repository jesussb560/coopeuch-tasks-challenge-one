import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "../Task/Index";
import Create from "../Task/Create";
import Update from "../Task/Update";

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/create" element={<Create />} />
                <Route path="/:id" element={<Update />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;