import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [diet, setDiet] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [budget, setBudget] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isBrewClicked, setIsBrewClicked] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleBrew = async () => {
    setIsBrewClicked(true);
    try {
      const response = await axios.get("http://localhost:5000/search-recipes", {
        params: {
          diet,
          query: searchQuery,
          budget,
          numberOfPeople,
          sortBy,
        },
      });

      // Get detailed information for each recipe
      const detailedRecipes = await Promise.all(
        response.data.results.map(async (recipe) => {
          const detailResponse = await axios.get(`http://localhost:5000/recipe/${recipe.id}`);
          return { ...recipe, ...detailResponse.data };
        })
      );

      setRecipes(detailedRecipes);
      
      //setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center">
      {!isBrewClicked ? (
        <>
          <h1 className="text-lg text-gray-300">The Alchemist’s Kitchen</h1>
          <h2 className="text-4xl md:text-5xl font-serif mt-4">Explore your next potion...</h2>

          {/* FILTER CONTROLS */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <select className="bg-amber-200 text-gray-800 px-4 py-2 rounded-lg shadow-md" onChange={(e) => setDiet(e.target.value)}>
              <option>Dietary Restrictions</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="gluten free">Gluten Free</option>
              <option value="ketogenic">Ketogenic</option>
              <option value="paleo">Paleo</option>
              <option value="pescetarian">Pescetarian</option>
              <option value="dairy-free">Dairy Free</option>
            </select>
            <input
              type="number"
              className="bg-amber-200 text-gray-800 px-4 py-2 rounded-lg shadow-md"
              placeholder="Number of Servings"
              min="0"
              onChange={(e) => setNumberOfPeople(e.target.value)}
            />
            <select className="bg-amber-200 text-gray-800 px-4 py-2 rounded-lg shadow-md" onChange={(e) => setSortBy(e.target.value)}>
              <option>Sort By</option>
              <option value="cook time">Cook time</option>
              <option value="calories">Calories</option>
              <option value="price">Affordability</option>
            </select>
            <input
              type="text"
              className="bg-amber-200 text-gray-800 px-4 py-2 rounded-lg shadow-md"
              placeholder="Search for a specific item"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <input
              type="number"
              className="bg-amber-200 text-gray-800 px-4 py-2 rounded-lg shadow-md"
              placeholder="Budget"
              min="0"
              onChange={(e) => setBudget(e.target.value)}
            />
          </div>

          <button
            className="bg-amber-300 text-gray-900 text-xl font-semibold px-6 py-3 rounded-lg shadow-lg mt-6 hover:bg-amber-400 transition"
            onClick={handleBrew}
          >
            Let’s Brew
          </button>
        </>
      ) : (
        /* AFTER CLICKING LET'S BREW */
        <div className="recipe-container">
          {/* MENU LIST BOX */}
          <div className="recipe-list">
            <h2>Available Recipes</h2>
            {recipes.length === 0 ? (
              <p className="text-gray-300">No recipes found. Try adjusting your filters.</p>
            ) : (
              recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className={`recipe-item ${selectedRecipe?.id === recipe.id ? "selected" : ""}`}
                  onClick={() => setSelectedRecipe(recipe)}
                >
                  <h3>{recipe.title}</h3>
                  <p>{recipe.pricePerServing ? `$${recipe.price.toFixed(2)}` : "$N/A"}</p>
                </div>
              ))
            )}
          </div>

          {/* RECIPE DETAILS BOX */}
          <div className="recipe-details">
            {selectedRecipe ? (
              <>
                <h2>{selectedRecipe.title}</h2>
                <p>{selectedRecipe.summary || "No description available."}</p>
                <a
                  href={selectedRecipe.sourceUrl}
                  target={selectedRecipe.sourceUrl}
                  rel="noopener noreferrer"
                >
                  View Full Recipe
                </a>
              </>
            ) : (
              <p>Select a recipe to view details.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
