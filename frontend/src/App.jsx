import { Routes, Route } from "react-router-dom";
// COMPOENETS IMPORTS
import SignIn from "./components/Auth/SignIn";
import Login from "./components/Auth/Login";
import NotFound from "./components/Common/NotFound";

// STYLING IMPORTS
import "./components/Auth/Auth.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<h1>HOME</h1>} />
        <Route path="/auth/signin/:who" element={<SignIn />} />
        <Route path="/auth/login/:who" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
