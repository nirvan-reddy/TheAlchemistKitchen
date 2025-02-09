import React, { useState, useEffect } from 'react';

function Home() {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [budget, setBudget] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState("");
    const [sort, setSortBy] = useState(""); 
    const [recipes, setRecipes] = useState([]);
    const [isBrewClicked, setIsBrewClicked] = useState(false);

    useEffect(() => {
        // Replace with your actual backend API endpoint
        fetch('https://api.spoonacular.com/recipes/complexSearch')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error:', error));
    }, []);


    const DropDownForDiet = () => {
        return (
            <select 
            value={diet} 
            onChange={(e) => setDiet(e.target.value)}
            className="diet-dropdown"
            >
            <option value="">Select Diet</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Gluten Free</option>
            <option value="ketogenic">Ketogenic</option>
            <option value="paleo">Paleo</option>
            <option value="pescetarian">Pescetarian</option>
            <option value="dairy-free">Dairy Free</option>
            </select>
        );
    };

    const DropDownForSortBy = () => {
        return (
            <select 
                value={sort} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-dropdown"
            >
                <option value="sortBy">Sort by</option>
                <option value="maxReadyTime">Cook time</option>
                <option value="calories">Calories</option>
                <option value="price">Affordability</option>
            </select>
        );
    };

    const NumberInputBox = () => {
        return (
            <div className="input-boxes">
                <input
                    type="number"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(e.target.value)}
                    placeholder="Number of Servings"
                    min="1"
                    className="number-input"
                />
                <input
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    placeholder="Budget ($)"
                    min="0"
                    step="0.01"
                    className="budget-input"
                />
            </div>
        );
    };

    const SearchInput = () => {
        return (
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for specific item"
                className="search-input"
            />
        );
    };

    const BrewButton = () => {
        return (
            <button 
                onClick={() => setIsBrewClicked(!isBrewClicked)}
                className="brew-button"
            >
            Let's Brew
            </button>
        );
    };

    const axiosFetchData = async () => {
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
            setRecipes(response.data.results);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    return (
        <div className="home">
            <h1>Welcome to The Alchemist Kitchen</h1>
            <div className="content">
                <SearchInput />
                <DropDownForDiet />
                <DropDownForSortBy />
                <NumberInputBox />
                <BrewButton />
                {isBrewClicked && recipes.length > 0 && (
                    <div className="recipes-container">
                        {recipes.map((recipe, index) => (
                            <div key={index} className="recipe-card">
                                <h3>{recipe.title}</h3>
                                <img src={recipe.image} alt={recipe.title} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;