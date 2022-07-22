import React from "react";
import GoogleLogin from "react-google-login";

import "./Login.style.scss";

const Login = () => {
  const responseGoogle = (response) => {
    console.log(response);
  };
  return (
    <div className="loginPage">
      <GoogleLogin
        clientId="1066070256701-t1ug03pbnvgqunr45dtbgsr0p7ejss95.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Login;
