import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Layout from "./Layout";
import Dashboard from "./pages/Dashboard";

import { BASE_URL } from "./Helper";
import { UserContextProvider } from "./UserContext";
import FormPage from "./pages/FormPage";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        {/* <Route path="/" element={<Layout />} /> */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="/form/:id" element={<FormPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
