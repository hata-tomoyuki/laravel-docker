import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/posts/Create";

const App = () => {
    return (
        <Routes>
            {/* ルート定義 */}
            <Route path="/" element={<Home />} />
            <Route path="/posts/create" element={<Create />} />
        </Routes>
    );
};

export default App;
