import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/posts/Create";
import Show from "./pages/posts/Show";
import Edit from "./pages/posts/Edit";

const App = () => {
    return (
        <Routes>
            {/* ルート定義 */}
            <Route path="/" element={<Home />} />
            <Route path="/posts/create" element={<Create />} />
            <Route path="/posts/:id" element={<Show />} />
            <Route path="/posts/:id/edit" element={<Edit />} />
        </Routes>
    );
};

export default App;
