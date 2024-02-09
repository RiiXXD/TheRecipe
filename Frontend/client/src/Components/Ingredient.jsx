import React, { useState } from 'react';

function RecipeForm() {
    const [ingredients, setIngredients] = useState(['']); // Initial state with one empty ingredient field

    const handleIngredientChange = (index, event) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = event.target.value;
        setIngredients(newIngredients);
    };

    const handleAddIngredient = () => {
        setIngredients([...ingredients, '']);
    };

    const handleRemoveIngredient = index => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setIngredients(newIngredients);
    };

    const handleSubmit = event => {
        event.preventDefault();
        // Submit the form data, including the ingredients array
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Ingredients:</label>
            {ingredients.map((ingredient, index) => (
                <div key={index}>
                    <input
                        type="text"
                        value={ingredient}
                        onChange={e => handleIngredientChange(index, e)}
                    />
                    {index === ingredients.length - 1 && (
                        <button type="button" onClick={handleAddIngredient}>Add</button>
                    )}
                    {index !== 0 && (
                        <button type="button" onClick={() => handleRemoveIngredient(index)}>Remove</button>
                    )}
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
}

export default RecipeForm;
