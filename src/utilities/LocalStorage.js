//storage in local storage an array of objects
export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
//get the array of objects from local storage
export const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};
//remove the array of objects from local storage
export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};
