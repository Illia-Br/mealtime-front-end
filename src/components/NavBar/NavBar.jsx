import { NavLink } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <>
      {user ?
      <header className="App-header">
        Logged in as {user.name}
        <nav>
          <NavLink to='/recipes'>All Recipes</NavLink>
          <NavLink to='/restaurants'>All Restaurants</NavLink>
          <NavLink to="/" onClick={handleLogout}>Log Out</NavLink>
        </nav>
      </header>
      :
      <header className="App-header">
        Please Log In!
        <nav>
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </nav>
      </header>
      }
    </>
  )
}

export default NavBar
