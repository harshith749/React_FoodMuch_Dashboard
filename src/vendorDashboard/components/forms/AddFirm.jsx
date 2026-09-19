import React,{useState} from 'react'
import { API_URL } from '../../data/apiPath'  

const AddFirm = () => {
  const [firmName, setFirmName] = useState('')
  const [area, setArea] = useState('')
  const [category, setCategory] = useState([])
  const [region, setRegion] = useState([])
  const [offer, setOffer] = useState('')
  const [file, setFile] = useState(null)

  const handleCategoryChange = (e) => {
    const value= e.target.value
    if(category.includes(value)){
      setCategory(category.filter((cat)=>cat!==value))
    } else {
      setCategory([...category, value])
    }
  }

  const handleRegionChange = (e) => {
    const value= e.target.value
    if(region.includes(value)){
      setRegion(region.filter((reg)=>reg!==value))
    } else {
      setRegion([...region, value])
    }
  }

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0]
    setFile(selectedFile)
  }

  const handleFirmSubmit =async (e) => {
    e.preventDefault()
    try{
      const loginToken = localStorage.getItem('token')
      if(!loginToken){
        console.log('No token found')
        return
      }

      const formData = new FormData()
      formData.append('firmName', firmName)
      formData.append('area', area)
      formData.append('offer', offer)
      formData.append('image', file)

      category.forEach((cat) => {
        formData.append('category', cat)
      })

      region.forEach((reg) => {
        formData.append('region', reg)
      })
      
      const response = await fetch(`${API_URL}/firm/add-firm`, {
        method: 'POST',
        headers: {
          'token': `${loginToken}`
        },
        body: formData
      })
      const data = await response.json()
      if(response.ok){
        
        alert("Firm added successfully")
        console.log('Firm added successfullys:', data)
        setFirmName("")
        setArea("")
        setCategory([])
        setRegion([])
        setOffer("")
        setFile(null)
    
      }else if(data.msg==="Vendor already has a firm"){
        alert("Vendor already has a one firm")
      }else{
        alert("Failed to add firm")
      }
       const FirmId=data.firmId
      localStorage.setItem('firmId',FirmId)
    
    }catch(err){
      console.log(err)
    } 
  }

  return (
    <div className="firmSection">
        <h3>Add Firm</h3>
         <form className="tableForm" onSubmit={handleFirmSubmit}>
              <label>Firm Name</label><br/> 
              <input type="text" placeholder="" name='firmName' value={firmName} onChange={(e)=>setFirmName(e.target.value)}/><br/> 
              <label>Area</label><br/> 
              <input type="text" placeholder="" name="area" value={area} onChange={(e)=>setArea(e.target.value)}/><br/>
              {/* <label>Category</label><br/> 
              <input type="checkbox" placeholder=""/><br/> */}

              <div className="check-inp">
                <label>Category</label>
               <div className='inputCont'>
                 <div className="checkBoxCont">
                    <label>Veg</label>
                    <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange}/>
                </div>
                <div className="checkBoxCont">
                    <label>Non Veg</label>
                    <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange} />
                </div>
               </div>
              </div>


              {/* <label>Region</label><br/> 
              <input type="text" placeholder=""/><br/> */}

               <div className="check-inp">
                <label>Region</label>
               <div className='inputCont'>
                 <div className="checkBoxCont">
                    <label>South indian</label>
                    <input type="checkbox" value="south" checked={region.includes('south')} onChange={handleRegionChange}/>
                </div>
                <div className="checkBoxCont">
                    <label>North indian</label>
                    <input type="checkbox" value="north" checked={region.includes('north')} onChange={handleRegionChange} />
                </div>
                <div className="checkBoxCont">
                    <label>Chinese</label>
                    <input type="checkbox" value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange} />
                </div>
                <div className="checkBoxCont">
                    <label>Bakery</label>
                    <input type="checkbox" value="bakery" checked={region.includes('bakery')} onChange={handleRegionChange} />
                </div>
               </div>
              </div>



              <label>Offer</label><br/> 
              <input type="text" placeholder="" name='offer' value={offer} onChange={(e)=>setOffer(e.target.value)}/><br/>
              <label>Image</label><br/> 
              <input type="file" onChange={handleImageChange} placeholder=""/><br/>
              <div>
                <button type="submit">Submit</button>
              </div>
         </form>
    </div>
  )
}

export default AddFirm