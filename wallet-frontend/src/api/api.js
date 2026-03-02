import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export const creditWallet = (data) => api.post("/admin/wallet/credit", data);

export const debitWallet = (data) => api.post("/admin/wallet/debit", data);

export const createOrder = (amount, clientId) =>
  api.post("/orders", { amount }, { headers: { "client-id": clientId } });

export const getWalletBalance = (clientId) =>
  api.get("/wallet/balance", {
    headers: { "client-id": clientId },
  });

export const getOrder = (orderId, clientId) =>
  api.get(`/orders/${orderId}`, {
    headers: { "client-id": clientId },
  });
