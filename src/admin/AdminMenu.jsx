import React, { useEffect, useState } from "react";
import { getMenu, addMenuItem, deleteMenuItem, updateMenuItem } from "../api";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newItem, setNewItem] = useState({ name: "", price: "", description: "" });
  const [imageFile, setImageFile] = useState(null);
  const [editingItem, setEditingItem] = useState(null); // track editing item

  // Fetch menu items
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const data = await getMenu();
      setMenuItems(data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch menu");
    } finally {
      setLoading(false);
    }
  };

  // Add or update menu item
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingItem) {
        // Update
        await updateMenuItem(editingItem.id, { ...newItem, image: imageFile });
        alert("Menu item updated!");
      } else {
        // Add new
        await addMenuItem({ ...newItem, image: imageFile });
        alert("Menu item added!");
      }

      setNewItem({ name: "", price: "", description: "" });
      setImageFile(null);
      setEditingItem(null);
      fetchMenuItems();
    } catch (err) {
      alert(err.message || "Error saving menu item");
    }
  };

  // Edit menu item
  const handleEdit = (item) => {
    setEditingItem(item);
    setNewItem({ name: item.name, price: item.price, description: item.description });
  };

  // Delete menu item
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteMenuItem(id);
        alert("Menu item deleted!");
        fetchMenuItems();
      } catch (err) {
        alert(err.message || "Error deleting menu item");
      }
    }
  };

  return (
    <div className="pt-24 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Admin Menu Management
      </h1>

      {/* Add/Edit Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4 text-red-600">
          {editingItem ? "Edit Menu Item" : "Add New Menu Item"}
        </h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="border px-4 py-2 rounded-lg"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Price"
            className="border px-4 py-2 rounded-lg"
            value={newItem.price}
            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="border px-4 py-2 rounded-lg md:col-span-2"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
          />
          <input
            type="file"
            accept="image/*"
            className="border px-4 py-2 rounded-lg md:col-span-2"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          <button
            type="submit"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition md:col-span-2"
          >
            {editingItem ? "Update Item" : "Add Menu Item"}
          </button>
        </form>
      </div>

      {/* Menu Table */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Menu Items</h2>
      {loading ? (
        <p>Loading menu...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : menuItems.length === 0 ? (
        <p>No menu items found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-2xl shadow-lg">
            <thead className="bg-red-600 text-white">
              <tr>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4">{item.name}</td>
                  <td className="py-3 px-4">Rs. {item.price}</td>
                  <td className="py-3 px-4">{item.description}</td>
                  <td className="py-3 px-4">
                    {item.image ? (
                      <img
                        src={`http://localhost:5000/uploads/${item.image}`}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminMenu;
