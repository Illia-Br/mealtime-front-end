import { useState, useEffect, useRef } from 'react';
import { getDetails, addReview, removeRestaurantFromRecipe } from '../../services/recipes' 
import { Link, useParams } from 'react-router-dom';
import RestaurantCard from '../../components/RestaurantCard/RestaurantCard';
import styles from './RecipeDetails.module.css'



const RecipeDetails = ({user, handleDeleteRecipe, handleDeleteRestaurant, updateAfterRemoveRestaurant, handleAddRecipeToDay}) => {
  const formElement = useRef()
  const [validForm, setValidForm] = useState(false)
	const [formData, setFormData] = useState({
		content:''
	})
  const [recipe, setRecipe] = useState({})
  const { recipeId } = useParams()

  useEffect(() => {
    getDetails(recipeId)
    .then(recipeData => setRecipe(recipeData))
  }, [])

  useEffect(() => {
		formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
	}, [formData])

  const handleChange = evt => {
		setFormData({ ...formData, [evt.target.name]: evt.target.value })
	}

  const handleAddReview = async (id, newRecipeData) => {
    const newRecipe = await addReview(id, newRecipeData)
    setRecipe({ ...newRecipe })
    setFormData({content: ''})
  }

  const handleRemoveRestaurantFromRecipe = (recipeId, restaurantId) => {
    removeRestaurantFromRecipe(recipeId, restaurantId)
    .then(newRecipe => {
      setRecipe({ ...newRecipe })
      updateAfterRemoveRestaurant(newRecipe)
    })
  }

  const handleSubmit = evt => {
		evt.preventDefault()
		handleAddReview(recipeId, formData)
	}

  return (
    <>
    <div>
    <h1 className={styles.title}>{recipe.name}</h1>
    <img id={styles.recImg}
      src={recipe.picture ? recipe.picture : `https://amalghosh.com/assets/food13.jpg`} 
      alt="Recipe" 
      />
      
    <h3 className={styles.pageText}>Ingredients: {recipe.ingredients}</h3>
    {recipe.calories ?
    <h3 className={styles.pageText}>Calories: {recipe.calories}</h3>
    :null}
    {recipe.prepTime ?
    <h3 className={styles.pageText}>Time To Prepare: {recipe.prepTime}</h3>
    :null}
    <h3 className={styles.pageText}>How to Make: {recipe.instructions}</h3>
    
    {
      user.profile === recipe.creator?._id ?
        <div>
          <Link
            style={{marginRight: 10}}
            className='btn btn-sm btn-primary'
            to='/schedule'
            state={{recipe}}
            user={user}
          >
            Add to schedule
          </Link>
          <Link
              style={{marginRight: 10}}
              className='btn btn-sm btn-primary'
              to='/restaurants/myRestaurants'
              state={{recipe}}
            >
              Add Restaurant
          </Link>
          <Link
            className='btn btn-sm btn-warning'
            to='/edit'
            state={{recipe}}
           >
            Edit
          </Link>
          <button
            className="btn btn-sm btn-danger m-left"
            onClick={()=> handleDeleteRecipe(recipe._id)}
          >
            Delete
          </button>
        </div>
      :
        <div>
          <h3 className={styles.pageText}> Created by {recipe.creator?.name ? recipe.creator?.name : 'Ninja'}</h3>
        </div>
      }
     
      <div id={styles.restaurantDiv}>
        {recipe.restaurants?.map((restaurant, idx) => 
       <div key={idx}>
        <RestaurantCard
        
        restaurant={restaurant} 
        handleDeleteRestaurant={handleDeleteRestaurant}
        user={user}
        />
        {user.profile === recipe.creator?._id ?
          <button
          className="btn btn-sm btn-primary"
          type="submit"
          onClick={()=> handleRemoveRestaurantFromRecipe(recipe._id, restaurant._id)}
          >
         Remove
          </button>
          :
          null
        }
        
        </div>
        )}
      </div>
      
      <h1 className={styles.title2}>Reviews</h1>

      { recipe.reviews?.length ?
          <div className={styles.reviewsCont}>
            {recipe.reviews.map(review => {
                return <div key ={review._id}>
                  <p>{review.content}</p>
                  <p>Left on {review.createdAt?.slice(0,10)} by {review.creator?.name}</p>
                </div>
              })}
          </div>
       :
        <h3 className={styles.pageText}>No Reviews Yet</h3>
       } 
       </div>
       {user.profile === recipe.creator?._id ?
        null
        :
        <form 
          id={styles.addReview}
          autoComplete="off" ref={formElement} onSubmit={handleSubmit}
        >
          <label htmlFor="content-textarea">Leave Review:</label><br />
          <textarea name="content"    id="content-textarea" value={formData.content}
						onChange={handleChange}
            required>
          </textarea><br />
          <button type="submit" disabled={!validForm}>Add</button>
        </form>
        }
       
    </>

  )

}

export default RecipeDetails