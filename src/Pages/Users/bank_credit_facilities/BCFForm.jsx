import React, { useEffect, useRef } from 'react'
import CustomInput from '../../../Components/CustomInput'




const BCFForm = ({ details, handleChange, handleSubmit, handleSignature, handleSecurityAsset, handleGuarantor }) => {
 
 const containerRef = useRef(null);
 useEffect(() => {
  containerRef.current.scrollIntoView({ behavior: 'smooth' });
 }, []);

 return (
  <form className='flex flex-col gap-3 p-[15px]' ref={containerRef}>
   <div>
    <h1 className='greenheader text-center'>APPLICATION FOR BANK/CREDIT FACILITIES Form</h1>
    <p className='text-center text-lg font-medium'>Kindly fill this form before submitting, so we can generate the pdf file for you.</p>
   </div>
   <section>
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
     <CustomInput value={details.address} placeholder={"address"} name={"address"} type={"text"} label={"Address"} handleChange={handleChange} />
     <CustomInput value={details.state} placeholder={"state"} name={"state"} type={"text"} label={"State"} handleChange={handleChange} />
     <CustomInput value={details.date} placeholder={"Today's date"} name={"date"} type={"date"} label={"Date"} handleChange={handleChange} />
     <CustomInput value={details.name} placeholder={"Fullname"} name={"name"} type={"text"} label={"name"} handleChange={handleChange} />
     <CustomInput value={details.amount} placeholder={"amount"} name={"amount"} type={"text"} label={"Amount"} handleChange={handleChange} />
     <CustomInput value={details.purpose} placeholder={"Purpose"} name={"purpose"} type={"text"} label={"Purpose"} handleChange={handleChange} />
     <CustomInput value={details.tenure} placeholder={"Tenur"} name={"tenure"} type={"text"} label={"Tenure"} handleChange={handleChange} />
     <CustomInput value={details.pay_back_period} placeholder={"payback period"} name={"pay_back_period"} type={"text"} label={"Pay back period"} handleChange={handleChange} />
     <CustomInput value={details.issuing_company} placeholder={"Your issuing company"} name={"issuing_company"} type={"text"} label={"Issuing Company"} handleChange={handleChange} />
     <CustomInput value={details.lpo_and_date} placeholder={"Your LPO number and Date"} name={"lpo_and_date"} type={"text"} label={"L.P.O No and Date"} handleChange={handleChange} />
     <CustomInput value={details.shares_held} placeholder={"Number of shares held"} name={"shares_held"} type={"text"} label={"Shares held"} handleChange={handleChange} />
     <CustomInput value={details.shares_receipt_number} placeholder={"Shares receipt No"} name={"shares_receipt_number"} type={"text"} label={"Shares receipt No"} handleChange={handleChange} />
    </div>

    <div className='my-4'>
     <h2 className='font-bold greenheader'>Security assets:</h2>
     <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <CustomInput value={details.security_asset.first} placeholder={"Asset 1"} name={"first"} type={"text"} label={"Security asset 1"} handleChange={handleSecurityAsset} />
      <CustomInput value={details.security_asset.second} placeholder={"Asset 2"} name={"second"} type={"text"} label={"Security asset 2"} handleChange={handleSecurityAsset} />
      <CustomInput value={details.security_asset.third} placeholder={"Asset 3"} name={"third"} type={"text"} label={"Security asset 3"} handleChange={handleSecurityAsset} />
     </article>
    </div>

    <div className='my-4'>
     <h2 className='font-bold greenheader'>Personal Data</h2>
     <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
      <CustomInput value={details.applicant_name} placeholder={"Applicant name"} name={"applicant_name"} type={"text"} label={"Applicant name"} handleChange={handleChange} />
      <CustomInput value={details.applicant_address} placeholder={"Applicant address"} name={"applicant_address"} type={"text"} label={"Applicant address"} handleChange={handleChange} />
      <CustomInput value={details.tel} placeholder={"Applicant phone number"} name={"tel"} type={"tel"} label={"Applicant phone no."} handleChange={handleChange} />
      <CustomInput value={details.length_of_stay} placeholder={"How long have you stayed here"} name={"length_of_stay"} type={"text"} label={"Length of stay in this address"} handleChange={handleChange} />
      <CustomInput value={details.state_of_origin} placeholder={"State of origin"} name={"state_of_origin"} type={"text"} label={"State of origin"} handleChange={handleChange} />
      <CustomInput value={details.permanent_address} placeholder={"Permanent address"} name={"permanent_address"} type={"text"} label={"Permanent address"} handleChange={handleChange} />
      <CustomInput value={details.business} placeholder={"Business type"} name={"business"} type={"text"} label={"business"} handleChange={handleChange} />
      <CustomInput value={details.business_length} placeholder={"Business length"} name={"business_length"} type={"text"} label={"business length"} handleChange={handleChange} />
      <CustomInput value={details.marital_status} placeholder={"Marital status"} name={"marital_status"} type={"text"} label={"Marital status"} handleChange={handleChange} />
      <CustomInput value={details.nok} placeholder={"Next of kin"} name={"nok"} type={"text"} label={"Next of kin"} handleChange={handleChange} />
      <CustomInput value={details.nok_address} placeholder={"Next of kin address"} name={"nok_address"} type={"text"} label={"Next of kin address"} handleChange={handleChange} />
      <CustomInput value={details.relationship} placeholder={"Relationship to Next of kin address"} name={"relationship"} type={"text"} label={"Relationship with N.O.K"} handleChange={handleChange} />
     </article>
    </div>

      <div className='my-4'>
       <h2 className='font-bold greenheader'>Guarantors</h2>
       <article className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <CustomInput value={details.guarantors.first} placeholder={"Guarantor 1"} name={"first"} type={"text"} label={"Guarantor 1"} handleChange={handleGuarantor} />
        <CustomInput value={details.guarantors.second} placeholder={"Guarantor 2"} name={"second"} type={"text"} label={"Guarantor 2"} handleChange={handleGuarantor} />
       </article>
      </div>
    <article className='ml-auto '>
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
        className="w-[80%] h-full object-cover"
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

export default BCFForm