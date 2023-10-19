import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./layouts/CreateUser";
import SearchUsers from "./layouts/SearchUsers";
import Home from "./layouts/Home";

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
