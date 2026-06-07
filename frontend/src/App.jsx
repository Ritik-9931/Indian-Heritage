import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Temples from "./pages/Temples";
import TempleDetails from "./pages/TempleDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminRoute from "./routes/AdminRoute";
import AddState from "./pages/AddState";
import Circuits from "./pages/Circuits";
import AddCity from "./pages/AddCity";
import AddDeity from "./pages/AddDeity";
import AddCircuit from "./pages/AddCircuit";
import AddFestival from "./pages/AddFestival";
import AdminPanel from "./pages/AdminPanel";
import AddTemple from "./pages/AddTemple";
import AddRitual from "./pages/AddRitual";
import CircuitDetails from "./pages/CircuitDetails";
import Festivals from "./pages/Festivals";
import FestivalDetails from "./pages/FestivalDetails";
import About from "./pages/About";
import Profile from "./pages/Profile";
import ProtectedRoute from "./routes/ProtectRoute";
import Users from "./pages/Users";

const App = () => {
  const myroutes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "Temples",
          element: <Temples />,
        },
        {
          path: "circuits",
          element: <Circuits />,
        },
        {
          path: "Temple/:id",
          element: <TempleDetails />,
        },
        {
          path: "admin/add-state",
          element: (
            <AdminRoute>
              <AddState />
            </AdminRoute>
          ),
        },
        {
          path: "admin/add-city",
          element: (
            <AdminRoute>
              <AddCity />
            </AdminRoute>
          ),
        },
        {
          path: "admin/add-deity",
          element: (
            <AdminRoute>
              <AddDeity />
            </AdminRoute>
          ),
        },
        {
          path: "admin/add-circuit",
          element: (
            <AdminRoute>
              <AddCircuit />
            </AdminRoute>
          ),
        },
        {
          path: "admin/add-festival",
          element: (
            <AdminRoute>
              <AddFestival />
            </AdminRoute>
          ),
        },
        {
          path: "admin/dashboard",
          element: (
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          ),
        },
        {
          path: "admin/add-temple",
          element: (
            <AdminRoute>
              <AddTemple />
            </AdminRoute>
          ),
        },
        {
          path: "admin/add-ritual",
          element: (
            <AdminRoute>
              <AddRitual />
            </AdminRoute>
          ),
        },
        {
          path: "circuitDetails/:id",
          element: <CircuitDetails />,
        },
        {
          path: "festivals",
          element: <Festivals />,
        },
        {
          path: "festivalDetails/:id",
          element: <FestivalDetails />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "admin/users",
          element: (
            <AdminRoute>
              <Users />
            </AdminRoute>
          ),
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ]);
  return <RouterProvider router={myroutes} />;
};

export default App;
