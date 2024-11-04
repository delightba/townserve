import React, { useEffect, useRef } from 'react'
import CustomInput from '../../../Components/CustomInput'




const EsusuForm = ({ details, handleChange, handleSubmit, handleSignature, handleSecurityAsset, handleGuarantor, customerpassport, guarantorpassport, guarantorsignature }) => {
  const containerRef = useRef(null);
  useEffect(() => {
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <form className='flex flex-col gap-3 p-[15px]' ref={containerRef}>
      <div>
        <h1 className='greenheader text-center'>APPLICATION FOR ESUSU CONTRIBUTION LOAN FORM</h1>
        {/* <p className='text-center text-lg font-medium'>Kindly fill this form before submitting, so we can generate the pdf file for you.</p> */}
      </div>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <CustomInput value={details.address} placeholder={"address"} name={"address"} type={"text"} label={"Address"} handleChange={handleChange} />
          <CustomInput value={details.state} placeholder={"state"} name={"state"} type={"text"} label={"State"} handleChange={handleChange} />
          <CustomInput value={details.date} placeholder={"Today's date"} name={"date"} type={"date"} label={"Date"} handleChange={handleChange} />
          <CustomInput value={details.name} placeholder={"Fullname"} name={"name"} type={"text"} label={"name"} handleChange={handleChange} />
          <CustomInput value={details.amount} placeholder={"amount"} name={"amount"} type={"text"} label={"Amount"} handleChange={handleChange} />
          <CustomInput value={details.purpose} placeholder={"Purpose"} name={"purpose"} type={"text"} label={"Purpose"} handleChange={handleChange} />
          <CustomInput value={details.tenure} placeholder={"Tenor"} name={"tenure"} type={"date"} label={"Tenor"} handleChange={handleChange} />
          <CustomInput value={details.repayment} placeholder={"repayment period"} name={"repayment"} type={"text"} label={"Repayment (month)"} handleChange={handleChange} />
        </div>

        <section className='my-4'>
          <h2 className='font-bold greenheader'>Collateral details:</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <CustomInput value={details.security_asset?.first} placeholder={"Asset 1"} name={"first"} type={"text"} label={"Collateral details 1"} handleChange={handleSecurityAsset} />
            <CustomInput value={details.security_asset?.second} placeholder={"Asset 2"} name={"second"} type={"text"} label={"Collateral details 2"} handleChange={handleSecurityAsset} />
            <CustomInput value={details.security_asset?.third} placeholder={"Asset 3"} name={"third"} type={"text"} label={"Collateral details 3"} handleChange={handleSecurityAsset} />
          </div>
        </section>

        <section className='my-4'>
          <h2 className='font-bold greenheader'>Personal Data</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <CustomInput value={details.tel} placeholder={"Applicant phone number"} name={"tel"} type={"tel"} label={"Applicant phone no."} handleChange={handleChange} />
            <CustomInput value={details.length_of_stay} placeholder={"How long have you stayed here"} name={"length_of_stay"} type={"text"} label={"Length of stay in this address (years)"} handleChange={handleChange} />
            <CustomInput value={details.business} placeholder={"Business type"} name={"business"} type={"text"} label={"business"} handleChange={handleChange} />
            <CustomInput value={details.business_length} placeholder={"Business length"} name={"business_length"} type={"text"} label={"business length (years)"} handleChange={handleChange} />
            <CustomInput value={details.marital_status} placeholder={"Marital status"} name={"marital_status"} type={"text"} label={"Marital status"} handleChange={handleChange} />
          </div>
        </section>
        {/* applicants signature */}
        <article className='ml-auto my-3'>
          <h1 className='greenheader pb-3'>Upload Applicants signature below</h1>
          {/* Input for image upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleSignature(e)}
            className="hidden form-input"
            id="applicantSignatureInput"
          />
          {/* Display area for the image */}
          <label htmlFor="applicantSignatureInput" className="relative block cursor-pointer">
            {details.signature && (
              <img
                src={details.signature}
                alt="Signature"
                className="w-[100px] h-full object-cover"
              />
            )}
            {!details.signature && (
              <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
                <span className="text-gray-500 py-4">Upload Signature</span>
              </div>
            )}
          </label>
        </article>
        {/* Applicants pasport */}
        <article className='ml-auto my-3'>
          <h1 className='greenheader pb-3'>Upload Applicants passport below</h1>
          {/* Input for image upload */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => customerpassport(e)}
            className="hidden form-input"
            id="applicantPassportInput"
          />
          {/* Display area for the image */}
          <label htmlFor="applicantPassportInput" className="relative block cursor-pointer">
            {details.applicant_passport_photo && (
              <img
                src={details.applicant_passport_photo}
                alt="Signature"
                className="w-[100px] h-full object-cover"
              />
            )}
            {!details.applicant_passport_photo && (
              <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
                <span className="text-gray-500 py-4">Upload Passport</span>
              </div>
            )}
          </label>
        </article>


        <section className='my-4'>
          <h2 className='font-bold greenheader'>Guarantor</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <CustomInput value={details.guarantor.name} placeholder={"Guarantor's name"} name={"name"} type={"text"} label={"Guarantor's name"} handleChange={handleGuarantor} />
            <CustomInput value={details.guarantor.address} placeholder={"Guarantor's address"} name={"address"} type={"text"} label={"Guarantor's address"} handleChange={handleGuarantor} />
            <CustomInput value={details.guarantor.occupation} placeholder={"Guarantor's occupation"} name={"occupation"} type={"text"} label={"Guarantor's occupation"} handleChange={handleGuarantor} />
            <CustomInput value={details.guarantor.tel} placeholder={"Guarantor's tel"} name={"tel"} type={"tel"} label={"Guarantor's tel"} handleChange={handleGuarantor} />
            <CustomInput value={details.guarantor.relationship_with_applicant} placeholder={"Guarantor's relationship with applicant"} name={"relationship_with_applicant"} type={"text"} label={"Guarantor's relationship with applicant"} handleChange={handleGuarantor} />
          </div>
        </section>
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
      </section>

      <button type="button" className='next' onClick={handleSubmit}>Submit</button>
    </form>
  )
}

export default EsusuForm