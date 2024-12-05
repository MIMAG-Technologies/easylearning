import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { ResoursesProvider } from "./context/ResoursesContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_DOMAIN}
      clientId={import.meta.env.VITE_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <AuthProvider>
        <ResoursesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ResoursesProvider>
      </AuthProvider>
    </Auth0Provider>
  </React.StrictMode>
);
