const express = require('express');
const axios = require('axios');
const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// API Key (should be in .env file)
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

// Get recipes based on user preferences
app.post('/api/recipes', async (req, res) => {
    try {
        const {
            diet,
            mealType,
            budget,
            numberOfPeople,
            maxCookTime,
            sortBy
        } = req.body;

        const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
            params: {
                apiKey: SPOONACULAR_API_KEY,
                diet: diet,
                type: mealType,
                maxReadyTime: maxCookTime,
                number: 10,
                sort: sortBy,
                addRecipeInformation: true,
                addRecipeNutrition: true
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get recipe price breakdown
app.get('/api/recipe-cost/:id', async (req, res) => {
    try {
        const response = await axios.get(
            `https://api.spoonacular.com/recipes/${req.params.id}/priceBreakdownWidget.json`,
            {
                params: {
                    apiKey: SPOONACULAR_API_KEY,
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Calculate meal plan within budget
app.post('/api/meal-plan', async (req, res) => {
    try {
        const { budget, numberOfPeople, diet, mealType } = req.body;

        // Get recipes
        const recipesResponse = await axios.get(`https://api.spoonacular.com/recipes/complexSearch`, {
            params: {
                apiKey: SPOONACULAR_API_KEY,
                diet: diet,
                type: mealType,
                number: 10,
                addRecipeInformation: true
            }
        });

        // Get price information for each recipe
        const recipes = recipesResponse.data.results;
        const mealPlan = [];
        let totalCost = 0;

        for (const recipe of recipes) {
            const priceResponse = await axios.get(
                `https://api.spoonacular.com/recipes/${recipe.id}/priceBreakdownWidget.json`,
                {
                    params: {
                        apiKey: SPOONACULAR_API_KEY,
                    }
                }
            );

            const recipeCost = (priceResponse.data.totalCost / 100) * numberOfPeople; // Convert cents to dollars

            if (totalCost + recipeCost <= budget) {
                mealPlan.push({
                    ...recipe,
                    estimatedCost: recipeCost
                });
                totalCost += recipeCost;
            }
        }

        res.json({
            mealPlan,
            totalCost,
            remainingBudget: budget - totalCost
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
