import React, { useState } from "react";
import { Link } from "react-router-dom";

const RecipePage = ({ foods }) => {
  const [selectedFoods, setSelectedFoods] = useState([]);

  // Handle food selection for recipe search
  const handleFoodSelection = (index) => {
    setSelectedFoods((prevSelected) => {
      if (prevSelected.includes(index)) {
        return prevSelected.filter((item) => item !== index);
      } else {
        return [...prevSelected, index];
      }
    });
  };

  // Handle "Search for Recipe" click
  const searchForRecipe = () => {
    console.log("Selected foods:", selectedFoods);
  };

  return (
    <div className="recipe-page">
      <h1>Recipe Finder</h1>

      {/* Search for Recipe button */}
      <button className="recipe-btn" onClick={searchForRecipe}>
        Search for Recipe
      </button>

      {/* Checklist for selected foods */}
      <div className="checklist">
        {foods.map((food, index) => (
          <div key={index} className="checklist-item">
            <input
              type="checkbox"
              checked={selectedFoods.includes(index)}
              onChange={() => handleFoodSelection(index)}
            />
            <label>{food.name}</label>
          </div>
        ))}
      </div>

      {/* Back to List button, aligned to the right */}
      <Link to="/" className="back-to-list-btn">
        Back to List
      </Link>
    </div>
  );
};

export default RecipePage;
