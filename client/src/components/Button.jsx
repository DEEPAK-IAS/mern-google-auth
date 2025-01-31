import React from 'react'

const Button = (props) => {
  return (
    <button 
      type={props.type}
      className={props.className}
      onClick={props.handler}
    >
      {props.imgSrc && <img 
        src={props.imgSrc}
        id={props.id}
        alt='Google'
      />}
      {props.children}
    </button>
  )
}

export default Button
