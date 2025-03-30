import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import FoodList from "./FoodList";
import AddFoodForm from "./AddFoodForm";

// Main App Component
export default function App() {
  const [foods, setFoods] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Function to add food items to the list
  const addFood = (food) => {
    setFoods((prevFoods) => [...prevFoods, food]);
  };

  // Function to delete a food item
  const deleteFood = (index) => {
    setFoods((prevFoods) => prevFoods.filter((_, i) => i !== index));
  };

  // Function to check expiring foods
  const checkExpiry = () => {
    const now = new Date();
    const newNotifications = [];

    foods.forEach((food, index) => {
      const expiryDate = new Date(food.expiry);
      const daysLeft = Math.floor((expiryDate - now) / (1000 * 60 * 60 * 24));

      if (daysLeft === 1 || daysLeft === 2) {
        newNotifications.push({ food: food.name, daysLeft, index });
      }
    });

    setNotifications(newNotifications);
  };

  // Sort the foods by expiry date
  const sortedFoods = foods.sort(
    (a, b) => new Date(a.expiry) - new Date(b.expiry)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      checkExpiry();
    }, 60000);

    return () => clearInterval(interval);
  }, [foods]);

  return (
    <Router>
      <Routes>
        {/* Home Page Route */}
        <Route
          path="/"
          element={
            <div className="app">
              <h1>🍏 Food Waste Manager</h1>
              <AddFoodForm addFood={addFood} />
              {notifications.length > 0 && (
                <div className="notifications">
                  {notifications.map((notification, index) => (
                    <p key={index}>
                      {notification.food} is expiring in {notification.daysLeft}{" "}
                      day(s)!
                    </p>
                  ))}
                </div>
              )}
              <FoodList foods={sortedFoods} deleteFood={deleteFood} />
              <Link to="/recipe">
                <button className="recipe-btn">Recipe</button>
              </Link>
            </div>
          }
        />

        {/* Recipe Page Route */}
        <Route path="/recipe" element={<RecipePage foods={foods} />} />
      </Routes>
    </Router>
  );
}

// RecipePage component
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
      <button className="recipe-btn" onClick={searchForRecipe}>
        Search for Recipe
      </button>

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
    </div>
  );
};
