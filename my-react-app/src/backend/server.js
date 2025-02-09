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

// Get recipes sorted by parameters
app.get('/search-recipes', async (req, res) => {
    try {
        const { query, maxReadyTime, minCalories, maxCalories, sort, diet, budget } = req.query;
        const response = await axios.get('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
                apiKey: SPOONACULAR_API_KEY,
                query,
                maxReadyTime,
                minCalories,
                maxCalories,
                sort,
                diet,
                maxPrice: budget,
                number: 10,
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error searching recipes' });
    }
});

// Get detailed recipe information
app.get('/recipe/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const response = await axios.get(`https://api.spoonacular.com/recipes/${id}/information`, {
            params: {
                apiKey: SPOONACULAR_API_KEY,
                includeNutrition: true // Include nutrition information
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error details:', error.response?.data || error.message);
        res.status(500).json({ error: 'Error fetching recipe details' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});