import React, { useEffect, useState } from "react";
import { getMenu, addMenuItem, updateMenuItem, deleteMenuItem } from "../api";
import {
  Plus,
  Edit3,
  Trash2,
  Image,
  AlertCircle,
  CheckCircle,
  Loader2,
} from "lucide-react";

const AdminMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      const data = await getMenu();
      setMenuItems(data || []);
    } catch (err) {
      setError("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price || form.price <= 0) {
      setError("Please enter a valid name and price");
      return;
    }

    setSubmitting(true);
    setSuccess("");
    setError("");

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("price", form.price);
    formData.append("description", form.description.trim());
    if (imageFile) formData.append("image", imageFile);

    try {
      if (editingItem) {
        await updateMenuItem(editingItem.id, formData);
        setSuccess("Menu item updated successfully!");
      } else {
        await addMenuItem(formData);
        setSuccess("New menu item added successfully!");
      }

      // Reset form
      setForm({ name: "", price: "", description: "" });
      setImageFile(null);
      setImagePreview(null);
      setEditingItem(null);
      document.getElementById("image-input").value = "";

      fetchMenuItems();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err) {
      setError(err.message || "Failed to save menu item");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      price: item.price,
      description: item.description || "",
    });
    setImagePreview(
      item.image ? `http://localhost:5000/uploads/${item.image}` : null
    );
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setForm({ name: "", price: "", description: "" });
    setImageFile(null);
    setImagePreview(null);
    document.getElementById("image-input").value = "";
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this menu item permanently?")) return;

    try {
      await deleteMenuItem(id);
      setSuccess("Menu item deleted!");
      fetchMenuItems();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete item");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 pt-10 pb-15">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-9 pb-5">
          <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600 mb-4">
            Manage Menu
          </h1>
          <p className="text-xl text-gray-700">Add, edit, or remove dishes from your restaurant</p>
        </div>

        {/* Success/Error Messages */}
        {success && (
          <div className="mb-8 bg-green-50 border-2 border-green-200 rounded-2xl p-6 flex items-center gap-4 text-green-800 shadow-lg animate-pulse">
            <CheckCircle className="w-10 h-10 flex-shrink-0" />
            <p className="font-bold text-xl">{success}</p>
          </div>
        )}

        {error && (
          <div className="mb-8 bg-red-50 border-2 border-red-200 rounded-2xl p-6 flex items-center gap-4 text-red-700 shadow-lg">
            <AlertCircle className="w-10 h-10 flex-shrink-0" />
            <p className="font-bold text-xl">{error}</p>
          </div>
        )}

        {/* Add/Edit Form */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
            <Plus className="w-10 h-10 text-red-600" />
            {editingItem ? "Edit Menu Item" : "Add New Dish"}
          </h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <input
                type="text"
                placeholder="Dish Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-6 py-5 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none text-lg"
                required
              />

              <input
                type="number"
                placeholder="Price (Rs.)"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                min="1"
                className="w-full px-6 py-5 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none text-lg"
                required
              />

              <textarea
                placeholder="Description (optional)"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows="4"
                className="w-full px-6 py-5 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none text-lg resize-none"
              />
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-6">
              <div className="border-4 border-dashed border-gray-300 rounded-2xl p-8 text-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-80 object-cover rounded-xl shadow-lg"
                  />
                ) : (
                  <div className="text-gray-400">
                    <Image className="w-20 h-20 mx-auto mb-4" />
                    <p className="text-lg">Drop image or click to upload</p>
                  </div>
                )}
              </div>

              <label className="block">
                <input
                  id="image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-600 file:text-white hover:file:bg-red-700 cursor-pointer"
                />
              </label>
            </div>

            {/* Buttons */}
            <div className="md:col-span-2 flex gap-4 mt-6">
              <button
                type="submit"
                disabled={submitting}
                className={`flex-1 py-5 rounded-xl font-bold text-xl text-white shadow-xl transition-all transform flex items-center justify-center gap-3 ${
                  submitting
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 hover:scale-105 active:scale-95"
                }`}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-7 h-7 animate-spin" />
                    Saving...
                  </>
                ) : editingItem ? (
                  "Update Dish"
                ) : (
                  "Add to Menu"
                )}
              </button>

              {editingItem && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-10 py-5 bg-gray-500 hover:bg-gray-600 text-white rounded-xl font-bold shadow-xl transition hover:scale-105"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Menu Items Grid */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-8">
            <h2 className="text-3xl font-bold">All Menu Items</h2>
          </div>

          {loading ? (
            <div className="p-20 text-center">
              <Loader2 className="w-16 h-16 text-red-600 animate-spin mx-auto" />
            </div>
          ) : menuItems.length === 0 ? (
            <div className="p-20 text-center text-gray-500">
              <Image className="w-32 h-32 mx-auto mb-6 text-gray-300" />
              <p className="text-2xl">No dishes yet. Add your first masterpiece!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  {item.image ? (
                    <img
                      src={`http://localhost:5000/uploads/${item.image}`}
                      alt={item.name}
                      className="w-full h-64 object-cover"
                    />
                  ) : (
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64 flex items-center justify-center">
                      <Image className="w-16 h-16 text-gray-400" />
                    </div>
                  )}

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-3xl font-extrabold text-red-600 mb-3">
                      Rs. {item.price}
                    </p>
                    {item.description && (
                      <p className="text-gray-600 mb-6 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
                      >
                        <Edit3 className="w-5 h-5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition"
                      >
                        <Trash2 className="w-5 h-5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;