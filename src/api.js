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
// Admin-only route for fetching all users
export const getAllUsers = async () => {
  const res = await fetch(`${API_BASE}/admin/users`, {
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
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
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
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
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
    headers: { ...getAuthHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify(queueData),
  });
  return res.json();
};

// ==================== Menu ====================

// Fetch all menu items
export const getMenu = async () => {
  const res = await fetch(`${API_BASE}/menu`, {
    headers: { ...getAuthHeaders() },
  });
  return res.json();
};

// Add new menu item (Admin) with optional image
export const addMenuItem = async (menuData, imageFile = null) => {
  const formData = new FormData();
  formData.append("name", menuData.name);
  formData.append("price", menuData.price);
  formData.append("description", menuData.description);
  if (imageFile) formData.append("image", imageFile);

  const res = await fetch(`${API_BASE}/menu/add`, {
    method: "POST",
    headers: { ...getAuthHeaders() }, // ✅ DO NOT set Content-Type manually
    body: formData,
  });

  return res.json();
};

// Fetch popular dishes
export const getPopularDishes = async () => {
  const res = await fetch(`${API_BASE}/menu/popular-dishes`, {
    headers: { ...getAuthHeaders() },
  });
  return res.json();
};

export const deleteMenuItem = async (id) => {
  const res = await fetch(`http://localhost:5000/menu/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

export const updateMenuItem = async (id, formData) => {
  const data = new FormData();
  data.append("name", formData.name);
  data.append("price", formData.price);
  data.append("description", formData.description);
  if (formData.image) data.append("image", formData.image);

  const res = await fetch(`http://localhost:5000/menu/${id}`, {
    method: "PUT",
    body: data,
  });
  return res.json();
};
