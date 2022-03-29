import { useState, useRef, useEffect } from "react"
import { useLocation } from "react-router-dom"

const EditRestaurant = (props) => {
  const location = useLocation()
  const formElement = useRef()
  const [validForm, setValidForm] = useState(true)
  const [formData, setFormData] = useState(location.state.restaurant)
  
  useEffect(()=> {
    formElement.current.checkValidity() ? setValidForm(true) : setValidForm(false)
  }, [formData])

  
  const handleChange = evt => {
    setFormData({...formData, [evt.target.name]: evt.target.value})
  }

  const handleSubmit = evt => {
    evt.preventDefault()
		const restaurantFormData = new FormData()
		restaurantFormData.append('picture', formData.picture)
    restaurantFormData.append('name', formData.name)
    restaurantFormData.append('link', formData.link)
    restaurantFormData.append('location', formData.location)
    restaurantFormData.append('_id', formData._id)
    props.handleUpdateRestaurant(restaurantFormData)

  }

    const handleChangePicture = evt => {
      setFormData({...formData, picture: evt.target.files[0]})
    }

    return(
<>
<h1>Edit Restaurants</h1>
			<form autoComplete="off" ref={formElement} onSubmit={handleSubmit}>
				<div className="form-group mb-3">
					<label htmlFor="name-input" className="form-label">
						Restaurant's Name
					</label>
					<input 
						type="text"
						className="form-control"
						id="name-input"
						name="name"
            value={formData.name}
            onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="location-input" className="form-label">
						Restaurant's Location 
					</label>
					<input 
						type="text"
						className="form-control"
						id="location-input"
						name="location"
            value={formData.location}
            onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group mb-3">
					<label htmlFor="link-input" className="form-label">
						Restaurant's website 
					</label>
					<input 
						type="text"
						className="form-control"
						id="link-input"
						name="link"
            value={formData.link}
            onChange={handleChange}
					/>
				</div>
        <div className="form-group mb-4">
					<label htmlFor="photo-upload" className="form-label">
						Upload Photo
					</label>
					<input
						type="file"
						className="form-control"
						id="photo-upload"
						name="picture"
						onChange={handleChangePicture}
					/>
				</div>
        <div className="d-grid">
					<button
						type="submit"
						className="btn btn-primary btn-fluid"
            disabled={!validForm}
					>
						Edit Restaurant
					</button>
				</div>
</form>
</>

    )

}
 
export default EditRestaurant;