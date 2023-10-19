import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import SearchUsers from "./pages/SearchUsers";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/search-users" element={<SearchUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
