export const Token = () => {
  const token = localStorage.getItem("token");
  return JSON.parse(token) || [];
};
export const Logout = () => {
  return localStorage.removeItem("token");
};
