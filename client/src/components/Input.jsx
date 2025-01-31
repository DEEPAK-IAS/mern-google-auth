import { useRef } from "react";
import hide from "../assets/images/hide.png";
import { toggleIcon, toggleType } from "../utils/userInteraction";

const Input = (props) => {
  const inputRef = useRef();
  return (
    <div className="input-group" style={{ zIndex: 0 }}>
      <input
        type={props.type}
        id={props.id}
        ref={inputRef}
        onKeyUp={props.inputhandler}
        onBlur={props.inputhandler}
        onChange={(e) => props.setValue(inputRef.current.value)}
        maxLength={props.maxLength || undefined}
        required
      />
      <label htmlFor={props.id}>{props.id}</label>
      {props.imgSrc && (
        <img
          src={props.imgSrc}
          alt="Password visibility toggle"
          id="eye-icon"
          onClick={(e) => {
            toggleType(inputRef.current, "password", "text");
            toggleIcon(e.target, props.imgSrc, hide);
          }}
        />
      )}
      <div className="err-element"></div>
    </div>
  );
};

export default Input;
