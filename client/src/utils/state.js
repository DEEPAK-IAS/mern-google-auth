export function setNewState(key, value) {
  if (typeof value === "object" && value !== null) {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
}

export function getState(key) {
  return localStorage.getItem(key);
}

export function removeState(key) {
  return localStorage.removeItem(key)
}