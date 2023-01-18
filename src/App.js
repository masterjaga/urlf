import React from "react";
import Dashboard from "./components/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import ForgotPassword from "./components/ForgotPassword";
import VerifyEmail from "./components/VerifyEmail";
import Active from "./components/Active";
export const url = "https://url-shortener-task-backend.onrender.com";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<Active />} />
          <Route path="signup" element={<SignUp />} />
          <Route
            path="instagram/user/accounts/my_accounts/email/login"
            element={<Login />}
          />
          <Route
            path="instagram/user/accounts/my_accounts/password-reset/password/:id"
            element={<ForgotPassword />}
          />
          <Route
            path="password-reset/email/verification"
            element={<VerifyEmail />}
          />

          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
