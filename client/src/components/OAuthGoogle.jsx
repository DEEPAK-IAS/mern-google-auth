import { useNavigate } from "react-router-dom";
import app from "../config/firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Button from "./Button";
import googleIcon from "../assets/images/google-icon.png";
import { setNewState } from "../utils/state";
import { setBorder, setErrMessage } from "../utils/userInteraction";

const OAuthGoogle = () => {
  const navigate = useNavigate();
  const googleAuthHandler = async (e) => {
    e.preventDefault();
    e.target.setAttribute("disabled", "");
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        }),
      });
      const data = await res.json();
      if (data.status === 403) {
        const emailInput = document.getElementById("email");
        const errElement = emailInput.parentElement.querySelector(".err-element");
        setErrMessage(errElement, data.message);
        setBorder(emailInput, "2px solid red", "red");
        return;
      }
      if (data.success === true) {
        setNewState("user_info", data.data.user);
        navigate("/");
        window.location.reload();
      }
      e.target.removeAttribute("disabled", "");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button
        type={"button"}
        className={"btn"}
        id={"google-icon"}
        imgSrc={googleIcon}
        children={"Continue With Google"}
        handler={googleAuthHandler}
      />
    </>
  );
};

export default OAuthGoogle;
