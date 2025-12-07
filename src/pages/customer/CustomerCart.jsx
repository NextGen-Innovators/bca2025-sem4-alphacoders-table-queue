import React, { useEffect, useState } from "react";

const CustomerCart = () => {
  const [cart, setCart] = useState([]);
  const [reservedTable, setReservedTable] = useState(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);

    const savedTable = JSON.parse(localStorage.getItem("reservedTable")) || null;
    setReservedTable(savedTable);
  }, []);

  const handleRemove = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleIncrement = (index) => {
    const updated = [...cart];
    updated[index].quantity = (updated[index].quantity || 1) + 1;
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const handleDecrement = (index) => {
    const updated = [...cart];
    if ((updated[index].quantity || 1) > 1) {
      updated[index].quantity -= 1;
    } else {
      updated.splice(index, 1); // remove if quantity goes to 0
    }
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce(
    (sum, item) => sum + (parseFloat(item.price) * (item.quantity || 1)),
    0
  );

  return (
    <div className="p-6 max-w-md mx-auto border rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      {reservedTable ? (
        <div className="mb-4 p-2 bg-green-100 rounded">
          <strong>Reserved Table:</strong> {reservedTable.name} (Capacity: {reservedTable.capacity})
        </div>
      ) : (
        <p className="mb-4">No table reserved yet.</p>
      )}

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-2">
          {cart.map((item, index) => (
            <li key={index} className="flex justify-between border-b py-1 items-center">
              <div>
                <span className="font-medium">{item.name}</span>
                <span className="ml-2 text-gray-500">x{item.quantity || 1}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Rs. {(item.price * (item.quantity || 1)).toFixed(2)}</span>
                <button
                  onClick={() => handleDecrement(index)}
                  className="bg-gray-200 text-gray-700 px-2 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <button
                  onClick={() => handleIncrement(index)}
                  className="bg-red-600 text-white px-2 rounded hover:bg-red-700"
                >
                  +
                </button>
                <button
                  className="text-red-500 hover:underline ml-2"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div className="mt-4 font-bold text-lg">Total: Rs. {total.toFixed(2)}</div>
      )}
    </div>
  );
};

export default CustomerCart;
