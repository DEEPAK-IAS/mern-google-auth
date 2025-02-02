import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../components/Input";
import Button from "../components/Button";
import "../styles/AdminLogin.css";
import { inputValidation } from "../utils/inputValidation";
import view from '../assets/images/view.png'
import { useNavigate } from "react-router-dom";
import { setBorder, setErrMessage } from "../utils/userInteraction";

const AdminLogin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const [message, setMessage] = useState({
    emailMessage: "",
    passwordMessage: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/v1/admin/login", {
        method: "POST",
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
      const data = await res.json();

      if(data.status === 404) {
        const emailInput = document.querySelector("#email");
        setErrMessage(emailInput, data.message);
        setBorder(emailInput, "2px solid red", "red");
      }
      if(data.status === 401) {
        const passwordInput = document.querySelector("#password");
        setErrMessage(passwordInput, data.message);
        setBorder(passwordInput, "2px solid red", "red");
      }

      if(data.success === true) {
        navigate("/usersPage")
      }


    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className="main-container">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-box"
      >
        <h2 className="title">Admin Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <Input
            id={"email"}
            type={"text"}
            inputhandler={(e) => inputValidation(e.target, message, setMessage)}
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
          <Button type="submit" className="btn">
            Login
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
