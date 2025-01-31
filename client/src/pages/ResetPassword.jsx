import { useState, useRef } from "react";
import "../styles/ResetPassword.css";
import Input from "../components/Input";
import Button from "../components/Button";
import view from "../assets/images/view.png";
import { inputValidation } from "../utils/inputValidation";
import { getState } from "../utils/state";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState({
    passwordMessage: "",
    confirmPasswordMessage: "",
  });

  const userInfo = JSON.parse(getState("user_info"));

  const [otpVisible, setOtpVisible] = useState(false);
  const [response, setResponse] = useState("");
  const otpRefs = useRef([]);
  const formRef = useRef();

  

  const handleOtp = async(e) => {
    try {
      const res = await fetch("/api/v1/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.email,
        }),
      });
      const data = await res.json();
      setResponse(data.message);
      setOtpVisible(true);
      
    } catch(err) {
      console.log(err);
    }
  }; 

  const handleFinalOtpInput = async (e) => {
    let otp = "";
    otpRefs.current.forEach((otpRef) => {
      otp += otpRef.value;
    });

    const res = await fetch("/api/v1/auth/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userInfo.email,
        password: password,
        otp: Number(otp),
      }),
    });

    const data = await res.json();
    setResponse(data.message);
    setTimeout(() => {
      formRef.current.reset();
    }, 1000)
  };

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    if (value.length === 1) {
      if (index < otpRefs.current.length - 1) {
        otpRefs.current[index + 1].focus();
      } else {
        handleFinalOtpInput();
      }
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };


  return (
    <div className="main-container">
      <form className="password-form" ref={formRef}>
        <h3 className="heading">Change Password</h3>
        <div className="input-group-container">
          <Input
            id="password"
            type="password"
            setValue={setPassword}
            inputhandler={(e) => inputValidation(e.target, message, setMessage)}
            imgSrc={view}
            maxLength="22"
          />
          <Input
            id="confirm-password"
            type="password"
            setValue={setPassword}
            inputhandler={(e) => inputValidation(e.target, message, setMessage)}
            imgSrc={view}
            maxLength="22"
          />

          {otpVisible && (
            <div className="otp-input-container">
              {[...Array(4)].map((_, index) => (
                <input
                  key={index}
                  type="text"
                  className="otp-input"
                  maxLength="1"
                  ref={(el) => (otpRefs.current[index] = el)}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                />
              ))}
            </div>
          )}

          <Button
            type="button"
            className="btn"
            children="Send OTP"
            handler={handleOtp}
          />
          <p>{response}</p>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
