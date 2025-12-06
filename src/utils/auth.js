// src/utils/auth.js
import { jwtDecode } from "jwt-decode";

export const getRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role;
  } catch {
    return null;
  }
};

export const isCustomer = () => getRole() === "customer";
export const isAdmin = () => getRole() === "admin";
