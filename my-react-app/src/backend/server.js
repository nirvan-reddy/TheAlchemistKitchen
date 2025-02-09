const express = require('express');
const axios = require('axios');
const cors = require('cors');
const path = require('path');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;


// Fetch meal plan based on diet
app.get('/mealplan', async (req, res) => {
    try {
        const { diet } = req.query;
        const response = await axios.get(`https://api.spoonacular.com/mealplanner/generate`, {
            params: { apiKey: SPOONACULAR_API_KEY, diet, timeFrame: 'day' }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching meal plan' });
    }
});
// Fetch grocery items (mock data)
app.get('/groceries', (req, res) => {
    const groceries = [
        { id: 1, name: 'Rice', price: 2.5, unit: 'kg' },
        { id: 2, name: 'Chicken Breast', price: 5, unit: 'kg' },
        { id: 3, name: 'Broccoli', price: 1.5, unit: 'bunch' }
    ];
    res.json(groceries);
});
// Serve frontend
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});