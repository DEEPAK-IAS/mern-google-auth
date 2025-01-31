import React, { useState, useRef } from 'react';
import '../styles/Signup.css';
import userIcon from "../assets/images/avatar.png";
import cameraIcon from "../assets/images/camera.png";
import view from "../assets/images/view.png";
import Input from '../components/Input';
import { inputValidation } from '../utils/inputValidation';
import OAuthGoogle from '../components/OAuthGoogle';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { setErrMessage, setBorder } from '../utils/userInteraction';

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [message, setMessage] = useState({
    nameMessage: "",
    emailMessage: "",
    passwordMessage: "",
    avatarMessage: "",
  });
  const fileInputRef = useRef();
  const imgRef = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || message.nameMessage !== "" || message.emailMessage !== "" || message.passwordMessage !== "" ) {
      throw new Error("must enter all inputFields");
    } else {

      try {
        const formData = new FormData();
        const file = avatar;
        formData.append("avatar", file);
        const imgRes = await fetch("/api/v1/user/upload", {
          method: "POST",
          body: formData,
        });
        const data = await imgRes.json();
        const imageRes = await fetch(data.file.downloadURL);
        const res = await fetch("/api/v1/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: name,
            email: email,
            password: password,
            avatar: imageRes.url,
          }),
        });
        const resData = await res.json();

        if(resData.statusCode === 409) {
          const emailInput = document.getElementById("email");
          const errElement = emailInput.parentElement.querySelector(".err-element");
          setErrMessage(errElement, resData.message);
          setBorder(emailInput, "2px solid red", "red");
          return;
        }

        if(resData.success === true) {
          navigate("/signin");
        }
      } catch (err) {
        console.log(err);
      }
    }
  };


  const insertImg = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imgRef.current.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className="main-container">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="heading-container">
            <h1>Sign Up</h1>
            <img 
              id="user-image" 
              src={userIcon} 
              alt="User Avatar" 
              ref={imgRef}
            />
            <input 
              type="file" 
              ref={fileInputRef}
              id="file-input" 
              name="avatar" 
              onChange={insertImg}
              hidden
            />
            <img
              src={cameraIcon}
              alt="Upload Avatar"
              className="camera-icon"
              onClick={() => fileInputRef.current.click()}
              style={{ cursor: 'pointer' }}
            />
          </div>
          <div className="input-group-container">
            <Input
              id={"name"}
              type={"text"}
              inputhandler={(e) =>
                inputValidation(e.target, message, setMessage)
              }
              setValue={setName}
            />
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
              maxLength={"22"}
            /> 
          </div>
          <Button
            type={"submit"}
            className={"btn"}
            children={"Signup"}
            handler={handleSubmit}
          />
        </form>
        <OAuthGoogle />
        <div className="message">
          Already have an account? <a href="/signin">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
