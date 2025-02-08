import { useState, useEffect } from 'react';
import axios from 'axios';
import MealPlan from './components/MealPlan';
import GroceryList from './components/GroceryList';
import './App.css';

function App() {
  const [diet, setDiet] = useState('');
  const [budget, setBudget] = useState('');
  const [mealPlan, setMealPlan] = useState(null);
  const [groceries, setGroceries] = useState([]);

  const fetchMealPlan = async () => {
    try {
      const response = await axios.get('http://localhost:5000/mealplan', {
        params: { diet },
      });
      setMealPlan(response.data);
    } catch (error) {
      console.error('Error fetching meal plan:', error);
    }
  };

  useEffect(() => {
    const fetchGroceries = async () => {
      try {
        const response = await axios.get('http://localhost:5000/groceries');
        setGroceries(response.data);
      } catch (error) {
        console.error('Error fetching groceries:', error);
      }
    };
    fetchGroceries();
  }, []);

  return (
    <div className="app">
      <h1>Budget Meal Planner</h1>
      <div>
        <input
          type="text"
          placeholder="Enter diet (e.g., keto, vegetarian)"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
        />
        <button onClick={fetchMealPlan}>Get Meal Plan</button>
      </div>
      {mealPlan && <MealPlan mealPlan={mealPlan} />}
      <GroceryList groceries={groceries} />
    </div>
  );
}

export default App;