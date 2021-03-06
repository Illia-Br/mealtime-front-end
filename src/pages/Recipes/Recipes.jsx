import RecipeCard from "../../components/RecipeCard/RecipeCard";
import styles from './Recipes.module.css'



const Recipes = (props) => {
  
  return ( 
    <>
    <main>

        <div id={styles.recipeDiv}>
          {props.recipes.map(recipe => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              handleDeleteRecipe={props.handleDeleteRecipe}
              user={props.user}
              handleAddRecipeToDay={props.handleAddRecipeToDay}
              />
          ))}
        </div>
    </main> 
    </> 
  );
}
 
export default Recipes;