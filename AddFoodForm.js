import React, { useState } from "react";

export default function AddFoodForm({ addFood }) {
  const [foodName, setFoodName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!foodName || !expiryDate) return;

    addFood({ name: foodName, expiry: expiryDate }); // Ensure addFood is called correctly
    setFoodName("");
    setExpiryDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Food Item"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
      />
      <input
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
      />
      <button type="submit">Add Food</button>
    </form>
  );
}
