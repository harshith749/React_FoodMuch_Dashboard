import React from 'react'

const SideBar = (props) => {
    const {showFirmHandler,showProductHandler,showAllProductsHandler,showFirmTitle}=props

  return (
    <div className="sideBarSection">
        <ul>
            {showFirmTitle && <li onClick={showFirmHandler}>Add Firm</li>}
            <li onClick={showProductHandler}>Add Product</li>
            <li onClick={showAllProductsHandler}>All Products</li>
            <li>User Details</li>
            
        </ul>
    </div>
  )
}

export default SideBar