const express = require('express');

// Using express
const app = express();

// Route
app.get('/', (req, res) => {
    return res.status(200).send("<h1>Welcome to the Alchemist Kitchen API</h1>");
});

// PORT
const PORT = 8000;

// Listen
app.listen(PORT, () => {
    console.log(`Node Server running on http://localhost:${PORT}`);
});