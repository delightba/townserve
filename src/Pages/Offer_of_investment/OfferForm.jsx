import React from 'react'
import CustomInput from '../../Components/CustomInput'


const OfferForm = ({ handleChange, handleSubmit, details, handleSignature }) => {

 return (
  <form className='flex flex-col gap-3 p-[15px]'>
   <div>
    <h1 className='greenheader text-center'>Offer Of Investment Form</h1>
   </div>
   <section>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
     <CustomInput value={details.date} placeholder={"Today's date"} name={"date"} type={"date"} label={"Date"} handleChange={handleChange} />
     <CustomInput value={details.name} placeholder={"Fullname"} name={"name"} type={"text"} label={"name"} handleChange={handleChange} />
     <CustomInput value={details.address} placeholder={"Your street name and number"} name={"address"} type={"text"} label={"Address"} handleChange={handleChange} />
     <CustomInput value={details.local_government} placeholder={"Your LGA"} name={"local_government"} type={"text"} label={"LGA"} handleChange={handleChange} />
     <CustomInput value={details.state} placeholder={"Your state"} name={"state"} type={"text"} label={"State"} handleChange={handleChange} />
     <CustomInput value={details.product} placeholder={"Your product"} name={"product"} type={"text"} label={"Product"} handleChange={handleChange} />
     <CustomInput value={details.tenor1} placeholder={"Your tenor"} name={"tenor1"} type={"date"} label={"Tenor (from)"} handleChange={handleChange} />
     <CustomInput value={details.tenor2} placeholder={"Your tenor"} name={"tenor2"} type={"date"} label={"Tenor (to)"} handleChange={handleChange} />
     <CustomInput value={details.interest1} placeholder={"Your interest"} name={"interest1"} type={"number"} label={"Interest (min)"} handleChange={handleChange} />
     <CustomInput value={details.interest2} placeholder={"Your interest"} name={"interest2"} type={"number"} label={"Interest (max)"} handleChange={handleChange} />
     <CustomInput value={`${details.principal_range1}`} placeholder={"eg: 50M, 300K"} name={"principal_range1"} type={"text"} label={"Principal range (min)"} handleChange={handleChange} />
     <CustomInput value={`${details.principal_range2}`} placeholder={"eg: 50M, 300K"} name={"principal_range2"} type={"text"} label={"Principal range (max)"} handleChange={handleChange} />
    </div>
    <article className='ml-auto my-4'>
     <h1 className='greenheader pb-3'>Upload your signature below</h1>
     {/* Input for image upload */}
     <input
      type="file"
      accept="image/*"
      onChange={(e) => handleSignature(e)}
      className="hidden form-input"
      id="customerSignatureInput"
     />
     {/* Display area for the image */}
     <label htmlFor="customerSignatureInput" className="relative block cursor-pointer">
      {details.signature && (
       <img
        src={details.signature}
        alt="Signature"
        className="w-[200px] h-full object-cover"
       />
      )}
      {!details.signature && (
       <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
        <span className="text-gray-500 py-4">Upload Signature</span>
       </div>
      )}
     </label>
    </article>
   </section>

   <button type="button" className='next' onClick={handleSubmit}>Submit</button>
  </form>
 )
}

export default OfferForm