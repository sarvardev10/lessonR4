import http from "./config";

const service = {
  create: (data) => http.post("/service", data),
  get: () => http.get("/service/all", { params: { page: 1, limit: 10 } }),
  delete: (id) => http.delete("/service", { params: { id } }),
  update: (data) => http.put("/service", data),
};
export default service;
