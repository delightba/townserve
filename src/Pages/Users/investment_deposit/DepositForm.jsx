import React from 'react'
import CustomInput from '../../../Components/CustomInput'

const DepositForm = ({ details, handleChange, handleSubmit, handleSignature, handleEvidence }) => {
 return (
  <form className='flex flex-col gap-3'>
   <div>
    <h1 className='greenheader text-center'>TownServe Investment/Deposit Application Form</h1>
    <p className='text-center text-lg font-medium'>Kindly fill this form before submitting, so we can generate the pdf file for you.</p>
   </div>
   <section>
    <CustomInput value={details.date} placeholder={"Today's date"} name={"date"} type={"date"} label={"Date"} handleChange={handleChange} />
    <CustomInput value={details.name} placeholder={"Fullname"} name={"name"} type={"text"} label={"name"} handleChange={handleChange} />
    <CustomInput value={details.name_of_investors} placeholder={"Investor(s) name(s)"} name={"name_of_investors"} type={"text"} label={"Investor(s)"} handleChange={handleChange} />
    <CustomInput value={details.type_of_investment} placeholder={"Your investment type"} name={"type_of_investment"} type={"text"} label={"Investment type"} handleChange={handleChange} />
    <CustomInput value={details.amount_to_invest} placeholder={"Your amount to invest"} name={"amount_to_invest"} type={"number"} label={"Amount (in number)"} handleChange={handleChange} />
    <CustomInput value={details.interest_rate} placeholder={"Your interest rate"} name={"interest_rate"} type={"text"} label={"Interest rate"} handleChange={handleChange} />
    <CustomInput value={details.duration} placeholder={"Your duration"} name={"duration"} type={"text"} label={"Duration"} handleChange={handleChange} />
    <CustomInput value={details.commencement_date} placeholder={"Your commencement date"} name={"commencement_date"} type={"date"} label={"Commencement date"} handleChange={handleChange} />
    <CustomInput value={details.maturity_date} placeholder={"Your maturity date"} name={"maturity_date"} type={"date"} label={"Maturity date"} handleChange={handleChange} />
    <CustomInput value={details.transferred_amount} placeholder={"Amount transferred"} name={"transferred_amount"} type={"number"} label={"Amount transferred"} handleChange={handleChange} />
    <h2 className='font-bold greenheader'>Transferred from:</h2>
    <CustomInput value={details.from_bank} placeholder={"Sender Bank name"} name={"from_bank"} type={"text"} label={"Sender bank name"} handleChange={handleChange} />
    <CustomInput value={details.from_account_number} placeholder={"Sender account number"} name={"from_account_number"} type={"number"} label={"Sender account number"} handleChange={handleChange} />
    <CustomInput value={details.from_date_transferred} placeholder={"Date transferred"} name={"from_date_transferred"} type={"date"} label={"Date transferred"} handleChange={handleChange} />
    <h2 className='font-bold greenheader'>Transferred to:</h2>
    <CustomInput value={details.bank_name} placeholder={"Bank name"} name={"bank_name"} type={"text"} label={"Receiver bank name"} handleChange={handleChange} />
    <CustomInput value={details.account_number} placeholder={"Receiver account number"} name={"account_number"} type={"number"} label={"Receiver account number"} handleChange={handleChange} />
    <CustomInput value={details.date_transferred} placeholder={"Date transferred"} name={"date_transferred"} type={"date"} label={"Date transferred"} handleChange={handleChange} />
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
    <article className='ml-auto '>
     <h1 className='greenheader pb-3'>Upload your evidence below</h1>
     {/* Input for image upload */}
     <input
      type="file"
      accept="image/*"
      onChange={(e) => handleEvidence(e)}
      className="hidden form-input"
      id="evidence"
     />
     {/* Display area for the image */}
     <label htmlFor="evidence" className="relative block cursor-pointer">
      {details.evidence && (
       <img
        src={details.evidence}
        alt="Evidence"
        className="w-[80%] h-full object-cover"
       />
      )}
      {!details.evidence && (
       <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
        <span className="text-gray-500 py-4">Upload Evidence</span>
       </div>
      )}
     </label>
    </article>
   </section>

   <button type="button" className='next' onClick={handleSubmit}>Submit</button>
  </form>
 )
}

export default DepositForm