import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath'

const AddProduct = () => {
  const [productName, setProductName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState([])
  const [bestseller, setBestseller] = useState(false)
  const [description, setDescription] = useState('')
  const [image, setImage] = useState(null)

  const handlecategoryChange = (e) => {
    const value= e.target.value
    if(category.includes(value)){
      setCategory(category.filter((cat)=>cat!==value))
    } else {
      setCategory([...category, value])
    }
  }

  const handleBestsellerChange = (e) => {
    setBestseller(e.target.value === 'true')
  }

  const handleImageUpload = (e) => {
    const selectedFile = e.target.files[0]
    setImage(selectedFile)
  }

  const handleAddProduct =async (e) => {
    // Handle form submission logic here
    e.preventDefault()  
    try{
      const loginToken = localStorage.getItem('token')
      const firmId = localStorage.getItem('firmId')
      console.log(firmId)
      console.log(loginToken)
      if(!loginToken || !firmId){
        console.error('No token or firmId found')
        return
      }

      const formData = new FormData()
      formData.append('productName', productName)
      formData.append('price', price)
      formData.append('bestseller', bestseller)
      formData.append('description', description)
      formData.append('image', image)

      category.forEach((cat) => {
        formData.append('category', cat)
      })

      const response = await fetch(`${API_URL}/product/add-product/${firmId}`, {
        method: 'POST',
        headers: {
          'token': `${loginToken}`
        },
        body: formData
      })

      if(response.ok){
        const data = await response.json()
        alert("Product added successfully")
        console.log('Product added successfully:', data)
        setProductName("")
        setPrice("")
        setCategory([])
        setBestseller(false)
        setDescription("")
        setImage(null)
      }

    } catch (error) {
      console.log('Error adding product:', error)
      alert("Failed to add product")
    }
  }

  return (
   <div className="productSection">
        <h3>Add Products</h3>
         <form className="tableForm" onSubmit={handleAddProduct}>
              <label>Product Name</label><br/> 
              <input type="text" placeholder="" value={productName} onChange={(e)=>setProductName(e.target.value)}/><br/> 
              <label>Price</label><br/> 
              <input type="text" placeholder="" value={price} onChange={(e)=>setPrice(e.target.value)}/><br/>
              <label>Category</label><br/> 
               <div className='inputCont'>
                 <div className="checkBoxCont">
                    <label>Veg</label>
                    <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handlecategoryChange} />
                </div>
                <div className="checkBoxCont">
                    <label>Non Veg</label>
                    <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handlecategoryChange}/>
                </div>
               </div>
              <label>Bestseller</label><br/> 
              <input type="radio" name="bestseller" value="true" checked={bestseller} onChange={handleBestsellerChange}/><label>Yes</label>
              <input type="radio" name="bestseller" value="false" checked={!bestseller} onChange={handleBestsellerChange}/><label>No</label><br/>
              <label>Description</label><br/> 
              <input type="text" placeholder="" value={description} onChange={(e)=>setDescription(e.target.value)}/><br/>
              <label>Image</label><br/> 
              <input type="file" placeholder="" onChange={handleImageUpload}/><br/>
              <div>
                <button type="submit">Submit</button>
              </div>
         </form>
    </div>
  )
}

export default AddProduct