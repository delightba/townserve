import React from 'react'
import CustomInput from '../../Components/CustomInput'


const OfferForm = ({ handleChange, handleSubmit, details }) => {

 return (
  <form className='flex flex-col gap-3'>
   <div>
    <h1 className='greenheader text-center'>Offer Of Investment Form</h1>
    <p className='text-center text-lg font-medium'>Kindly fill this form before submitting</p>
   </div>
   <section>
    <CustomInput value={details.date} placeholder={"Today's date"} name={"date"} type={"date"} label={"Date"} handleChange={handleChange} />
    <CustomInput value={details.name} placeholder={"Fullname"} name={"name"} type={"text"} label={"name"} handleChange={handleChange} />
    <CustomInput value={details.address} placeholder={"Your street name and number"} name={"address"} type={"text"} label={"Address"} handleChange={handleChange} />
    <CustomInput value={details.state} placeholder={"Your state"} name={"state"} type={"text"} label={"State"} handleChange={handleChange} />
    <CustomInput value={details.amount} placeholder={"Your amount"} name={"amount"} type={"number"} label={"Amount (in number)"} handleChange={handleChange} />
    <CustomInput value={details.amount_in_words} placeholder={"Your amount in words"} name={"amount_in_words"} type={"text"} label={"Amount (in words)"} handleChange={handleChange} />
   </section>

   <button type="button" className='next' onClick={handleSubmit}>Submit</button>
  </form>
 )
}

export default OfferForm