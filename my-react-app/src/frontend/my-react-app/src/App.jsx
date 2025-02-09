import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [diet, setDiet] = useState("");
  const [mealType, setMealType] = useState("");
  const [budget, setBudget] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [recipes, setRecipes] = useState([]);

  const handleBrew = async () => {
    try {
      const response = await axios.post("/api/recipes", {
        diet,
        mealType,
        budget,
        numberOfPeople,
        sortBy,
      });
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-lg text-gray-300">The Alchemist’s Kitchen</h1>
      <h2 className="text-4xl md:text-5xl font-serif mt-4">Explore your next potion...</h2>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <select className="bg-amber-200 text-gray-800 px-4 py-2 rounded-lg shadow-md" onChange={(e) => setDiet(e.target.value)}>
          <option>Dietary Restrictions</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="vegan">Vegan</option>
          <option value="gluten free">Gluten Free</option>
        </select>
        <select className="bg-amber-200 text-gray-800 px-4 py-2 rounded-lg shadow-md" onChange={(e) => setNumberOfPeople(e.target.value)}>
          <option>Number of Servings</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="4">4</option>
        </select>
        <select className="bg-amber-200 text-gray-800 px-4 py-2 rounded-lg shadow-md" onChange={(e) => setSortBy(e.target.value)}>
          <option>Sort By</option>
          <option value="popularity">Popularity</option>
          <option value="healthiness">Healthiness</option>
        </select>
        <select className="bg-amber-200 text-gray-800 px-4 py-2 rounded-lg shadow-md" onChange={(e) => setMealType(e.target.value)}>
          <option>Meal Time</option>
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
        </select>
        <select className="bg-amber-200 text-gray-800 px-4 py-2 rounded-lg shadow-md" onChange={(e) => setBudget(e.target.value)}>
          <option>Budget</option>
          <option value="10">$10</option>
          <option value="20">$20</option>
          <option value="30">$30</option>
        </select>
      </div>

      <button className="bg-amber-300 text-gray-900 text-xl font-semibold px-6 py-3 rounded-lg shadow-lg mt-6 hover:bg-amber-400 transition" onClick={handleBrew}>Let’s Brew</button>

      <div className="mt-8">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-gray-800 text-white p-4 rounded-lg shadow-md mb-4">
            <h3 className="text-2xl font-bold">{recipe.title}</h3>
            <p>{recipe.summary}</p>
            <a href={recipe.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-amber-300">View Recipe</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;