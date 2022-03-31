import { Link, useLocation } from 'react-router-dom'
import RecipeCard from '../../components/RecipeCard/RecipeCard';

const FridayDetails = (props) => {

  return(
  <>
    <h1>Menu</h1>
    <div>
    {props.profile?.friday?.map((recipe, idx) => (
      <RecipeCard 
      key={idx}
      recipe={recipe} 
      user={props.user}
      handleRemoveRecipeFromDay={props.handleRemoveRecipeFromDay}
      profile={props.user.profile}
      day={'friday'}
      />
    ))}
    </div>
    <Link to='/schedule'className='nohover'>
      <h1>Back to schedule</h1>
    </Link>   
  </>
  )
}

export default FridayDetails;