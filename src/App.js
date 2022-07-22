import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/admin/dashboard/dashboard.component";
import Homepage from "./pages/users/homepage/homepage.component";
import Header from "./components/header/Header.component";
import Login from "./pages/users/Login/Login.component";
import AdminLogin from "./pages/admin/login/login.component";
import LoadingState from "./components/Loader/Loader.component";

import { useDispatch, useSelector } from "react-redux";
import {
  getVerifiedStatus,
  verifyUser,
} from "./redux-toolkit/userSlice/userSlice";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  const verifiedStatus = useSelector(getVerifiedStatus);

  useEffect(() => {
    if (verifiedStatus === "idle") {
      dispatch(verifyUser());
    }
  }, [verifiedStatus, dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />

        <main>
          {verifiedStatus === "idle" || verifiedStatus === "pending" ? (
            <LoadingState />
          ) : (
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
            </Routes>
          )}
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
