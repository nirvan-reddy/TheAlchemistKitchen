function MealPlan({ mealPlan }) {
    return (
      <div>
        <h2>Meal Plan</h2>
        {mealPlan.meals.map((meal) => (
          <div key={meal.id}>
            <h3>{meal.title}</h3>
            <a href={meal.sourceUrl} target="_blank" rel="noopener noreferrer">
              View Recipe
            </a>
          </div>
        ))}
      </div>
    );
  }
  
  export default MealPlan;  