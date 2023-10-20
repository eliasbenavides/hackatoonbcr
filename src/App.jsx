import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateUser from "./pages/CreateUser";
import SearchUsers from "./pages/SearchUsers";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/search-users" element={<SearchUsers />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
