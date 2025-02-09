
const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;
const GROCERY_API_KEY = process.env.GROCERY_API_KEY;

// Get meal plans based on user preferences
app.get('/mealplan', async (req, res) => {
    try {
        const { diet, targetCalories, timeFrame, mealTime } = req.query;
        const response = await axios.get(`https://api.spoonacular.com/mealplanner/generate`, {
            params: {
                apiKey: SPOONACULAR_API_KEY,
                diet,
                targetCalories,
                timeFrame
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching meal plan' });
    }
});

// Get recipe details including price breakdown
app.get('/recipe/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { numServings } = req.query;
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/${id}/information`, {
                params: {
                    apiKey: SPOONACULAR_API_KEY,
                    includeNutrition: true
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching recipe details' });
    }
});

// // Compare ingredient prices using price estimator
// app.get('/compare-prices', async (req, res) => {
//     try {
//         const { ingredients, servings } = req.query;
//         if (!ingredients) {
//             return res.status(400).json({ error: 'Ingredients parameter is required' });
//         }
        
//         console.log('Estimating prices for ingredients:', ingredients);
//         const response = await axios.get('https://api.spoonacular.com/recipes/visualizePriceEstimator', {
//             params: { 
//                 apiKey: SPOONACULAR_API_KEY,
//                 ingredients: ingredients, // Format: "2 cups rice, 1 pound chicken"
//                 servings: servings || 2,
//                 mode: 2 // Returns JSON instead of HTML
//             }
//         });
        
//         console.log('API Response:', response.data);
//         res.json(response.data);
//     } catch (error) {
//         console.error('Error details:', error.response?.data || error.message);
//         res.status(500).json({ 
//             error: 'Error estimating prices',
//             details: error.response?.data || error.message
//         });
//     }
// });

// Get recipes sorted by parameters
app.get('/search-recipes', async (req, res) => {
    try {
        const { query, maxReadyTime, minCalories, maxCalories, sort, budget } = req.query;
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
                apiKey: SPOONACULAR_API_KEY,
                query,
                maxReadyTime,
                minCalories,
                maxCalories,
                sort,
                maxPrice: budget,
                number: 10
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error searching recipes' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});