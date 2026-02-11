import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/posts/Create";
import Show from "./pages/posts/Show";

const App = () => {
    return (
        <Routes>
            {/* ルート定義 */}
            <Route path="/" element={<Home />} />
            <Route path="/posts/create" element={<Create />} />
            <Route path="/posts/:id" element={<Show />} />
        </Routes>
    );
};

export default App;
