import http from "./config";
const auth = {
  sign_in: (data) => http.post("/auth/login", data),
  sign_up: (data) => http.post("/auth/register", data),
};
export default auth;
