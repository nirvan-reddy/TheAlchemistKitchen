import React from "react";
import "./App.css";

function App() {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center">
      <h1 className="text-lg text-gray-300">The Alchemist’s Kitchen</h1>
      <h2 className="text-4xl md:text-5xl font-serif mt-4">Explore your next potion...</h2>
      
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <select className="bg-amber-200 text-gray-800 px-4 py-2 rounded-lg shadow-md">
          <option>Dietary Restrictions</option>
        </select>
        <select className="bg-amber-200 text-gray-800 px-4 py-2 rounded-lg shadow-md">
          <option>Number of Servings</option>
        </select>
        <select className="bg-amber-200 text-gray-800 px-4 py-2 rounded-lg shadow-md">
          <option>Sort By</option>
        </select>
        <select className="bg-amber-200 text-gray-800 px-4 py-2 rounded-lg shadow-md">
          <option>Meal Time</option>
        </select>
        <select className="bg-amber-200 text-gray-800 px-4 py-2 rounded-lg shadow-md">
          <option>Budget</option>
        </select>
      </div>

      <button className="bg-amber-300 text-gray-900 text-xl font-semibold px-6 py-3 rounded-lg shadow-lg mt-6 hover:bg-amber-400 transition">Let’s Brew</button>
    </div>
  );
}

export default App;