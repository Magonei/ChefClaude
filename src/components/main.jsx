import React from "react"
import ClaudeRecipe from "./claudeRecipe"
import IngredientsList from "./ingredientsList"
import { getRecipeFromChefClaude, getRecipeFromGemini } from "../ai.js"

/**
 * Challenge: Get a recipe from the AI!
 * 
 * This will be a bit harder of a challenge that will require you
 * to think critically and synthesize the skills you've been
 * learning and practicing up to this point.
 * 
 * Using either the `getRecipeFromChefClaude` function or the 
 * `getRecipeFromMistral` function, make it so that when the user
 * clicks "Get a recipe", the text response from the AI is displayed
 * in the <ClaudeRecipe> component.
 * 
 * For now, just have it render the raw markdown that the AI returns,
 * don't worry about making it look nice yet. (We're going to use a
 * package that will render the markdown for us soon.)
 */

export default function Main() {

    const [recipe, setRecipe] = React.useState("")

    const [ingredients, setIngredients] = React.useState([])

    const [recipeShown, setRecipeShown] = React.useState(false)
    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredient")
        setIngredients(prevIngredients => [...prevIngredients, newIngredient])
    }
    

    function toggleShowRecipe() {
        setRecipeShown(prevRecipeShown => !prevRecipeShown)
    }

    async function handleGetRecipe() {
        try {
        // Llama a la API y espera la respuesta
        const aiRecipe = await getRecipeFromGemini(ingredients);
        
        // Guarda la receta en el estado
        setRecipe(aiRecipe);
        
        // Muestra el componente de la receta
        setRecipeShown(true);
        } catch (error) {
        // Opcional: Muestra un mensaje de error al usuario
        console.error("Error al obtener la receta:", error);
        alert("¡Ups! No se pudo obtener la receta. Inténtalo de nuevo.");
        }
        }

    return (
        <main>
            <form action={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                />
                <button>Add <span className="button-ingredient-text">ingredient</span></button>
            </form>
            {ingredients.length > 0 && <IngredientsList 
                ingredientsListItems={ingredientsListItems}
                ingredients={ingredients}
                toggleShowRecipe={setRecipeShown}
                handleGetRecipe={handleGetRecipe}
                />  
            }
            
            {recipeShown && <ClaudeRecipe recipe={recipe}/>}
            
            
        </main>
        )
}