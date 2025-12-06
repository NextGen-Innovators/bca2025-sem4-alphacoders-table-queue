const API_BASE = "http://localhost:5000"; // adjust if your backend runs on another port

// Helper to include JWT token if logged in
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ==================== Auth ====================

export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return res.json();
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return res.json();
};

// ==================== Users ====================

export const getAllUsers = async () => {
  const res = await fetch(`${API_BASE}/users`, {
    headers: { ...getAuthHeaders() },
  });
  return res.json();
};

// ==================== Tables ====================

export const getTables = async () => {
  const res = await fetch(`${API_BASE}/tables`, {
    headers: { ...getAuthHeaders() },
  });
  return res.json();
};

export const reserveTable = async (reservationData) => {
  const res = await fetch(`${API_BASE}/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(reservationData),
  });
  return res.json();
};

// ==================== Orders ====================

export const getOrders = async () => {
  const res = await fetch(`${API_BASE}/orders`, {
    headers: { ...getAuthHeaders() },
  });
  return res.json();
};

export const createOrder = async (orderData) => {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(orderData),
  });
  return res.json();
};

// ==================== Queue ====================

export const getQueue = async () => {
  const res = await fetch(`${API_BASE}/queue`, {
    headers: { ...getAuthHeaders() },
  });
  return res.json();
};

export const joinQueue = async (queueData) => {
  const res = await fetch(`${API_BASE}/queue`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(queueData),
  });
  return res.json();
};

// ==================== Menu ====================

export const getMenu = async () => {
  const res = await fetch(`${API_BASE}/menu`, {
    headers: { ...getAuthHeaders() },
  });
  return res.json();
};

export const addMenuItem = async (menuData) => {
  const res = await fetch(`${API_BASE}/menu/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(menuData),
  });
  return res.json();
};
