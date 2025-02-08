function GroceryList({ groceries }) {
    return (
      <div>
        <h2>Budget Grocery List</h2>
        <ul>
          {groceries.map((item) => (
            <li key={item.id}>
              {item.name} - ${item.price} per {item.unit}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default GroceryList;  