import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import { UserPreferencesProvider } from "./providers/UserPreferences";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
]);

function App() {
  return (
    <div className="App">
      <UserPreferencesProvider>
        <RouterProvider router={router} />
      </UserPreferencesProvider>
    </div>
  );
}

export default App;
