export const storeTokenInLS = (token) => {
  localStorage.setItem("token", token);
};

export const getTokenFromLS = () => {
  return localStorage.getItem("token");
};

export const removeTokenFromLS = () => {
  localStorage.removeItem("token");
};
