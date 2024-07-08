import http from "./config";

const service = {
  create: (data) => http.post("/service", data),
  get: (params) => http.get("/service/all", { params }),
  delete: (id) => http.delete("/service", { params: { id } }),
  update: (data) => http.put("/service", data),
};
export default service;
