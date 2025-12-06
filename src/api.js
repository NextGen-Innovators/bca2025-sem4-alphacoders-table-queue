const API_BASE = "http://localhost:5000"; // adjust if your backend runs on another port

// Helper: include JWT token if logged in
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Generic fetch handler with error checking
const handleFetch = async (res) => {
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Request failed");
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
  const res = await fetch(`${API_BASE}/tables`, {
    headers: getAuthHeaders(),
  });
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
  const res = await fetch(`${API_BASE}/orders`, {
    headers: getAuthHeaders(),
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

// ==================== Queue ====================
export const getQueue = async () => {
  const res = await fetch(`${API_BASE}/queue`, {
    headers: getAuthHeaders(),
  });
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

// ==================== Menu ====================
export const getMenu = async () => {
  const res = await fetch(`${API_BASE}/menu`, {
    headers: getAuthHeaders(),
  });
  return handleFetch(res);
};

export const addMenuItem = async (menuData, imageFile = null) => {
  const formData = new FormData();
  formData.append("name", menuData.name);
  formData.append("price", menuData.price);
  formData.append("description", menuData.description);
  if (imageFile) formData.append("image", imageFile);

  const res = await fetch(`${API_BASE}/menu/add`, {
    method: "POST",
    headers: getAuthHeaders(), // DO NOT set Content-Type manually
    body: formData,
  });
  return handleFetch(res);
};

export const updateMenuItem = async (id, menuData) => {
  const formData = new FormData();
  formData.append("name", menuData.name);
  formData.append("price", menuData.price);
  formData.append("description", menuData.description);
  if (menuData.image) formData.append("image", menuData.image);

  const res = await fetch(`${API_BASE}/menu/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(), // DO NOT set Content-Type manually
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
  const res = await fetch(`${API_BASE}/menu/popular-dishes`, {
    headers: getAuthHeaders(),
  });
  return handleFetch(res);
};

export const reserveTable = async (reservationData) => {
  const res = await fetch(`${API_BASE}/reservations/reserve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservationData),
  });
  return res.json();
};

export const getCustomerOrders = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:5000/orders/customer", {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};


