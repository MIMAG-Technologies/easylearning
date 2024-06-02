import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ResoursesProvider } from "./context/ResoursesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ResoursesProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ResoursesProvider>
    </AuthProvider>
  </React.StrictMode>
);
