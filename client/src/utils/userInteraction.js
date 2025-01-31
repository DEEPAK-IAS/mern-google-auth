
export function toggleIcon(imgElement, oldPath, newPath) {
  if (imgElement === undefined || imgElement === null) {
    throw new Error("Given imgElement is null or undefined");
  }
  if (imgElement.src.match(oldPath)) 
    imgElement.src = newPath;
  else 
    imgElement.src = oldPath;
}


export function toggleType(element, oldType, newType) {
  if (element === undefined || element === null) {
    throw new Error("Give element is null or undefined");
  }
  if (element.type === oldType) 
    element.type = newType;
  else
    element.type = oldType;
}

export function setBorder(element, borderStyle, labelStyle) {
  if (element === undefined || element === null) {
    throw new Error("Give element is null or undefined");
  }
  element.style.border = borderStyle;
  element.nextElementSibling.style.color = labelStyle;
}

export function setErrMessage(element, message) {

  if (element === undefined || element === null) {
    throw new Error("Give element is null or undefined");
  }
  element.parentElement.querySelector(".err-element").innerText = message;
 
}