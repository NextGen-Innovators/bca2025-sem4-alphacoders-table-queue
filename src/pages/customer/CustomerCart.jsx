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

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);

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
              <span>{item.name}</span>
              <div className="flex items-center gap-2">
                <span>Rs. {item.price}</span>
                <button
                  className="text-red-500 hover:underline"
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
              