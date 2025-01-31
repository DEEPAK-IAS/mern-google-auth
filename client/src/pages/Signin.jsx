import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signin.css";
import view from "../assets/images/view.png";
import Input from "../components/Input";
import Button from "../components/Button";
import { inputValidation } from "../utils/inputValidation";
import OAuthGoogle from "../components/OAuthGoogle";
import { setNewState } from "../utils/state";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState({
    emailMessage: "",
    passwordMessage: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !email ||
      !password ||
      message.emailMessage !== "" ||
      message.passwordMessage !== ""
    ) {
      console.log(message);
    } else {
      const res = await fetch("/api/v1/auth/signin", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        }),
      });

      const data = await res.json();
      console.log(data);
      if(data.success === true) {
        setNewState("user_info", data.data.user);
        navigate("/");
        window.location.reload();
      }
    }
  };

  return (
    <div className="main-container">
      <div className="container1">
        <form
          className="form"
          id="signinForm"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <h1>Sign In</h1>
          <div className="input-group-container1">
            <Input
              id={"email"}
              type={"text"}
              inputhandler={(e) =>
                inputValidation(e.target, message, setMessage)
              }
              setValue={setEmail}
            />
            <Input
              id={"password"}
              type={"password"}
              setValue={setPassword}
              inputhandler={(e) =>
                inputValidation(e.target, message, setMessage)
              }
              imgSrc={view}
            />
            <div className="handle-password-group">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember-me">Remember Me</label>
              <Link to="/forget-password" className="forget-password">
                ?Forget Password
              </Link>
            </div>
          </div>

          <Button
            type={"submit"}
            className={"btn"}
            children={"Signin"}
            handler={handleSubmit}
          />

          <OAuthGoogle />

          <div className="message">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
