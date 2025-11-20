import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost"; // <--- Import this

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* The New Route */}
        <Route path="/create" element={<CreatePost />} /> 
      </Routes>
    </Router>
  );
}

export default App;