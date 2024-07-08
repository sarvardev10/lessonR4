import http from "./config";

const order = {
  create: (data) => http.post("/order", data),
  get: (params) => http.get("/order/all", { params }),
  delete: (id) => http.delete("/order", { params: { id } }),
  update: (data) => http.put("/order", data),
};
export default order;
