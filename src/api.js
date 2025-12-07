const API_BASE = "http://localhost:5000"; // adjust if your backend runs on another port

// ==================== Helpers ====================
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleFetch = async (res) => {
  if (!res.ok) {
    const errText = await res.text();
    try {
      const err = JSON.parse(errText);
      throw new Error(err.error || "Request failed");
    } catch {
      throw new Error(errText || "Request failed");
    }
  }
  return res.json();
};

// ==================== Auth ====================
export const registerUser = async (userData) => {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return handleFetch(res);
};

export const loginUser = async (credentials) => {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return handleFetch(res);
};

// ==================== Users ====================
export const getAllUsers = async () => {
  const res = await fetch(`${API_BASE}/admin/users`, {
    headers: getAuthHeaders(),
  });
  return handleFetch(res);
};

// ==================== Tables ====================
export const getTables = async () => {
  const res = await fetch(`${API_BASE}/tables`, { headers: getAuthHeaders() });
  return handleFetch(res);
};

export const addTable = async (tableData) => {
  const res = await fetch(`${API_BASE}/tables`, {
    method: "POST",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(tableData),
  });
  return handleFetch(res);
};

export const updateTable = async (id, tableData) => {
  const res = await fetch(`${API_BASE}/tables/${id}`, {
    method: "PUT",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(tableData),
  });
  return handleFetch(res);
};

export const deleteTable = async (id) => {
  const res = await fetch(`${API_BASE}/tables/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleFetch(res);
};

// ==================== Orders ====================
export const getOrders = async () => {
  const res = await fetch(`${API_BASE}/orders`, { headers: getAuthHeaders() });
  return handleFetch(res);
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${API_BASE}/orders/${id}`, {
    method: "PUT",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return handleFetch(res);
};

export const createOrder = async (orderData) => {
  const res = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  });
  return handleFetch(res);
};

// ==================== Reservations ====================
export const getAllReservations = async () => {
  const res = await fetch(`${API_BASE}/reservations`, {
    headers: getAuthHeaders(),
  });
  return handleFetch(res);
};

export const cancelReservation = async (id) => {
  const res = await fetch(`${API_BASE}/reservations/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleFetch(res);
};

export const reserveTable = async (reservationData) => {
  const res = await fetch(`${API_BASE}/reservations/reserve`, {
    method: "POST",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(reservationData),
  });
  return handleFetch(res);
};

// ==================== Menu ====================
export const getMenu = async () => {
  const res = await fetch(`${API_BASE}/menu`, { headers: getAuthHeaders() });
  return handleFetch(res);
};

// api.js

export const addMenuItem = async (formData) => {
  const res = await fetch(`${API_BASE}/menu/add`, {
    method: "POST",
    headers: getAuthHeaders(), // DO NOT set Content-Type manually
    body: formData,
  });
  return handleFetch(res);
};

export const updateMenuItem = async (id, formData) => {
  const res = await fetch(`${API_BASE}/menu/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: formData,
  });
  return handleFetch(res);
};


export const deleteMenuItem = async (id) => {
  const res = await fetch(`${API_BASE}/menu/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleFetch(res);
};

export const getPopularDishes = async () => {
  const res = await fetch(`${API_BASE}/menu/popular-dishes`, { headers: getAuthHeaders() });
  return handleFetch(res);
};

// ==================== Queue ====================
export const getQueue = async () => {
  const res = await fetch(`${API_BASE}/queue`, { headers: getAuthHeaders() });
  return handleFetch(res);
};

export const joinQueue = async (queueData) => {
  const res = await fetch(`${API_BASE}/queue`, {
    method: "POST",
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(queueData),
  });
  return handleFetch(res);
};
// ==================== Customer Orders ====================
export const getCustomerOrders = async () => {
  const res = await fetch(`${API_BASE}/orders/customer`, {
    headers: getAuthHeaders(),
  });
  return handleFetch(res);
};
