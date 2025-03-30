import React from "react";

export default function FoodList({ foods, deleteFood }) {
  return (
    <ul>
      {foods.map((food, index) => (
        <li key={index}>
          {food.name} - Expiry: {food.expiry}
          <button onClick={() => deleteFood(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
