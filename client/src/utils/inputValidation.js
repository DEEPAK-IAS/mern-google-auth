import Validator from "./Validator";
import { setErrMessage,setBorder } from "./userInteraction";

export function inputValidation(inputElement, errorMessage , setErrorMessage) {
  
  if(inputElement.id === "email") {
    const {isValid, message} = Validator.isValidEmail(inputElement.value);
    if(!isValid) {
      setBorder(inputElement, "2px solid red", "red")
      inputElement.classList.add("error");
      setErrorMessage((preMessage) => {
        return {...preMessage, emailMessage : message};
      })
      setErrMessage(inputElement, message);
    } else {
      setBorder(inputElement, "", "")
      inputElement.classList.remove("error");
      setErrorMessage((preMessage) => {
        return {...preMessage, emailMessage : ""};
      })
      setErrMessage(inputElement, "");
    }
  }

  if(inputElement.id === "password") {
    const {isValid, message} = Validator.isValidPassword(inputElement.value);
    if(!isValid) {
      setBorder(inputElement, "2px solid red", "red")
      inputElement.classList.add(".error");
      setErrorMessage((preMessage) => {
        return {...preMessage, passwordMessage : message};
      })
      setErrMessage(inputElement, message);
    } else {
      setBorder(inputElement, "", "")
      setErrorMessage((preMessage) => {
        return {...preMessage, passwordMessage : ""};
      })
      setErrMessage(inputElement, "");
    }
  }

  if(inputElement.id === "confirm-password") {
    const {isValid, message} = Validator.isValidConfirmPassword(inputElement.value, document.querySelector("#password").value);
    if(!isValid) {
      setBorder(inputElement, "2px solid red", "red")
      inputElement.classList.add(".error");
      setErrorMessage((preMessage) => {
        return {...preMessage, cPasswordMessage : message};
      })
      setErrMessage(inputElement, message);
    } else {
      setBorder(inputElement, "", "")
      setErrorMessage((preMessage) => {
        return {...preMessage, cPasswordMessage : ""};
      })
      setErrMessage(inputElement, "");
    }
  }

}