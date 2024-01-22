import React from 'react'
import CustomInput from '../../../Components/CustomInput'


const GUAForm = ({ details, handleChange, handleSubmit, handleGuarantor, guarantorpassport, guarantorsignature }) => {
 return (
  <form className='flex flex-col gap-3 p-[15px]'>
   <div>
    <h1 className='greenheader text-center'>APPLICATION FOR ESUSU CONTRIBUTION LOAN FORM</h1>
    <p className='text-center text-lg font-medium'>Kindly fill this form before submitting, so we can generate the pdf file for you.</p>
   </div>
   <section>
    <h2 className='font-bold greenheader'>Guarantor</h2>

    <CustomInput value={details.guarantor.name} placeholder={"Guarantor's name"} name={"name"} type={"text"} label={"Guarantor's name"} handleChange={handleGuarantor} />
    <CustomInput value={details.guarantor.address} placeholder={"Guarantor's address"} name={"address"} type={"text"} label={"Guarantor's address"} handleChange={handleGuarantor} />
    <CustomInput value={details.guarantor.occupation} placeholder={"Guarantor's occupation"} name={"occupation"} type={"text"} label={"Guarantor's occupation"} handleChange={handleGuarantor} />
    <CustomInput value={details.guarantor.place_of_work} placeholder={"Guarantor's place of work"} name={"place_of_work"} type={"text"} label={"Guarantor's place of work"} handleChange={handleGuarantor} />
    <CustomInput value={details.guarantor.name_of_bank} placeholder={"Guarantor's bank name"} name={"name_of_bank"} type={"text"} label={"Guarantor's bank name"} handleChange={handleGuarantor} />
    <CustomInput value={details.guarantor.address_of_bank} placeholder={"Guarantor's bank address"} name={"address_of_bank"} type={"text"} label={"Guarantor's bank address"} handleChange={handleGuarantor} />
    <CustomInput value={details.guarantor.account_number} placeholder={"Guarantor's account number"} name={"account_number"} type={"text"} label={"Guarantor's account number"} handleChange={handleGuarantor} />
    <CustomInput value={details.guarantor.permanent_address} placeholder={"Guarantor's permanent address"} name={"permanent_address"} type={"text"} label={"Guarantor's permanent address"} handleChange={handleGuarantor} />
    <CustomInput value={details.guarantor.tel} placeholder={"Guarantor's tel"} name={"tel"} type={"tel"} label={"Guarantor's tel"} handleChange={handleGuarantor} />
    <CustomInput value={details.guarantor.relationship_with_applicant} placeholder={"Guarantor's relationship with applicant"} name={"relationship_with_applicant"} type={"text"} label={"Guarantor's relationship with applicant"} handleChange={handleGuarantor} />
    {/* sisgnature for guarantor */}
    <article className='ml-auto my-3'>
     <h1 className='greenheader pb-3'>Upload Gurantor's signature below</h1>
     {/* Input for image upload */}
     <input
      type="file"
      accept="image/*"
      onChange={(e) => guarantorsignature(e)}
      className="hidden form-input"
      id="guarantorSignatureInput"
     />
     {/* Display area for the image */}
     <label htmlFor="guarantorSignatureInput" className="relative block cursor-pointer">
      {details.guarantor.signature && (
       <img
        src={details.guarantor.signature}
        alt="Signature"
        className="w-[100px] h-full object-cover"
       />
      )}
      {!details.guarantor.signature && (
       <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
        <span className="text-gray-500 py-4">Upload Signature</span>
       </div>
      )}
     </label>
    </article>
    {/* passport photo for guuarantor */}
    <article className='ml-auto my-3'>
     <h1 className='greenheader pb-3'>Upload Gurantor's passport below</h1>
     {/* Input for image upload */}
     <input
      type="file"
      accept="image/*"
      onChange={(e) => guarantorpassport(e)}
      className="hidden form-input"
      id="guarantorPassportInput"
     />
     {/* Display area for the image */}
     <label htmlFor="guarantorPassportInput" className="relative block cursor-pointer">
      {details.guarantor.passport_photo && (
       <img
        src={details.guarantor.passport_photo}
        alt="Signature"
        className="w-[100px] h-full object-cover"
       />
      )}
      {!details.guarantor.passport_photo && (
       <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
        <span className="text-gray-500 py-4">Upload Passport</span>
       </div>
      )}
     </label>
    </article>

    <h2 className='font-bold greenheader'>Applicant's Personal Data</h2>
    <CustomInput value={details.name} placeholder={"Fullname"} name={"name"} type={"text"} label={"name"} handleChange={handleChange} />
    <CustomInput value={details.address} placeholder={"address"} name={"address"} type={"text"} label={"Address"} handleChange={handleChange} />
    <CustomInput value={details.state} placeholder={"state"} name={"state"} type={"text"} label={"State"} handleChange={handleChange} />

    <CustomInput value={details.date} placeholder={"Today's date"} name={"date"} type={"date"} label={"Date"} handleChange={handleChange} />

    <CustomInput value={details.amount} placeholder={"amount"} name={"amount"} type={"number"} label={"Amount"} handleChange={handleChange} />

    <CustomInput value={details.tel} placeholder={"Applicant phone number"} name={"tel"} type={"tel"} label={"Applicant phone no."} handleChange={handleChange} />

    <CustomInput value={details.nationality} placeholder={"Applicant nationality"} name={"nationality"} type={"text"} label={"Applicant nationality."} handleChange={handleChange} />

   </section>

   <button type="button" className='next' onClick={handleSubmit}>Submit</button>
  </form>
 )
}

export default GUAForm