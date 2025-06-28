import React from "react";
import "./App.css";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";

import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"; // ← Make sure this is 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
   { path: "/", element: <Navigate to="/login" replace /> },

  // Protected area (you can wrap this in a PrivateRoute later)
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
