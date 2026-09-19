import React, {useState,useEffect} from 'react'
import { API_URL } from '../data/apiPath'



const AllProducts = () => {
  const [products, setProducts] = useState([])

  const productsHandler = async () => {
    const firmId = localStorage.getItem('firmId')
    console.log("firmIdsss" ,firmId)
    try{
        const response = await fetch(`http://localhost:4000/product/get-products/${firmId}`)
        const data = await response.json()
        setProducts(data.products)
        console.log(data)
    }catch(error){
        console.error('Error fetching products:', error)
        alert('Failed to fetch products')
    }
  }

  useEffect(() => {
    productsHandler()
    console.log("useEffect called")
  }, [])    


  const deleteProductById = async (productId) => {
    console.log("Deleting product with ID:", productId)
    try {
      const response = await fetch(`${API_URL}/product/delete-product/${productId}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId))
        confirm('Are you sure you want to delete this product?')
        alert('Product deleted successfully')
      } else {
        console.error('Error deleting product:')
        alert('Failed to delete product')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      alert('Failed to delete product')
    }
  }

  return (
    <div>
    {!products ? (
      <p>No products available.</p>
    ) : (
        <table className="product-table"> 
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    {/* <th>Image</th> */}
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {products.map((item) => {
                    return (
                        <tr key={item._id}>
                            <td>{item.productName}</td>
                            <td>{item.price}</td>
                            {/* <td><img src={`http://localhost:4000/${item.image}`} alt={item.productName} width="100" style={{ maxWidth: '50px', height: '50px' }} /></td> */}
                            <td><button onClick={() => deleteProductById(item._id)}>Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table> )}
    </div>
    
  )
}

export default AllProducts