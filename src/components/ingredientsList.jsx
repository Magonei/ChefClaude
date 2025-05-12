export default function IngredientsList(props) {
    console.log(props.currentGlobalLanguage)

    return (
        <section>
                <h2 style={{marginBottom: "1rem"}}>{props.currentGlobalLanguage === 'es' ? 'Tus ingredientes:' : 'Ingredients on hand:'}</h2>
                <ul className="ingredients-list" aria-live="polite">{props.ingredientsListItems}</ul>
                {props.ingredients.length > 3 &&
                <div className="get-recipe-container">
                    <div>
                        <h3>{props.currentGlobalLanguage === 'es' ? 'Listo para una tu receta?' : 'Ready for a recipe?'}</h3>
                        <p>{props.currentGlobalLanguage === 'es' ? 'Genera una receta a partir de tu lista de ingredientes.' : 'Generate a recipe from your list of ingredients.'}</p>
                    </div>
                    <button onClick={() => {
                    props.handleGetRecipe();       // Llama a la función para obtener la receta
                    props.toggleShowRecipe();  // Llama a la función para alternar la visibilidad
                    }}>{props.currentGlobalLanguage === 'es' ? 'Obtener receta' : 'Get a recipe'}</button>
                </div>}
        </section>
    )
}