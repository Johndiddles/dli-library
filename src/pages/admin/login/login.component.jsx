import React, { useState, useEffect } from "react";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  userLogin,
  getLoginStatus,
  setStatus,
  getIsAuth,
} from "../../../redux-toolkit/userSlice/userSlice";
import "./login.styles.scss";

const AdminLogin = () => {
  const dispatch = useDispatch();

  const loginStatus = useSelector(getLoginStatus);
  const isAuth = useSelector(getIsAuth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitButtonContent, setSubmitButtonContent] = useState("Login");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(setStatus("idle"));
    const data = {
      username,
      password,
    };
    dispatch(userLogin(data));
  };

  useEffect(() => {
    if (loginStatus === "idle") {
      setSubmitButtonContent("Login");
    } else if (loginStatus === "pending") {
      setSubmitButtonContent("Please wait");
    } else if (loginStatus === "failed") {
      setSubmitButtonContent("Login");
    } else if (loginStatus === "succeeded") {
      console.log("successful");
      setSubmitButtonContent("Login");
    }
  }, [loginStatus]);

  return (
    <>
      {!isAuth ? (
        <div className="adminLoginPage">
          <div className="adminLoginPage__left"></div>
          <div className="adminLoginPage__right">
            <form>
              <div className="formGroup">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username..."
                />
              </div>
              <div className="formGroup">
                <label htmlFor="password">Password</label>
                <input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                />
              </div>
              <button onClick={handleSubmit}>{submitButtonContent}</button>
            </form>
          </div>
        </div>
      ) : (
        <Navigate to="/admin/dashboard" replace={true} />
      )}
    </>
  );
};

export default AdminLogin;
