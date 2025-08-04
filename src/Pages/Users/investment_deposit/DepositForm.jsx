import React, { useEffect, useRef } from 'react'
import CustomInput from '../../../Components/CustomInput'

const DepositForm = ({ details, handleChange, handleSubmit, handleSignature, handleEvidence }) => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    containerRef.current.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <form className='flex flex-col gap-3 p-[15px]' ref={containerRef}>
      <div>
        <h1 className='greenheader text-center'>Townserve Investment/Deposit Application Form</h1>
      </div>
      <div>
        <h1 className='text-xl'>Please send your money to</h1>
        <ul className='my-3 flex flex-col gap-3 text-xl text-green-600 font-bold'>
          <li>Bank - Zenith Bank</li>
          <li>Name: Townserve Microfinance Bank Limited</li>
          <li>No: 1311664758.</li>
        </ul>
      </div>
      <section>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          <CustomInput 
            value={details.date} 
            placeholder={"Today's date"} 
            name={"date"} 
            type={"date"} 
            label={"Date"} 
            handleChange={handleChange} 
          />
          <CustomInput 
            value={details.name} 
            placeholder={"Fullname"} 
            name={"name"} 
            type={"text"} 
            label={"Name"} 
            handleChange={handleChange} 
          />
          <CustomInput 
            value={details.name_of_investors} 
            placeholder={"Investor(s) name(s)"} 
            name={"name_of_investors"} 
            type={"text"} 
            label={"Investor(s)"} 
            handleChange={handleChange} 
          />
          <CustomInput 
            value={details.type_of_investment} 
            placeholder={"Your investment type"} 
            name={"type_of_investment"} 
            type={"text"} 
            label={"Investment type"} 
            handleChange={handleChange} 
          />
          <CustomInput 
            value={details.amount_to_invest} 
            placeholder={"Your amount to invest"} 
            name={"amount_to_invest"} 
            type={"number"} 
            label={"Amount (figure)"} 
            handleChange={handleChange} 
          />
          
          {/* Interest Rate Field */}
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Interest Rate</label>
            <div className="flex gap-2">
              <select
                value={details.interest_rate_type || ''}
                onChange={handleChange}
                name="interest_rate_type"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select type</option>
                <option value="Yearly">Yearly</option>
                <option value="Monthly">Monthly</option>
              </select>
              <input
                type="number"
                value={details.interest_rate_value || ''}
                onChange={handleChange}
                name="interest_rate_value"
                placeholder="Rate %"
                className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>

          <CustomInput 
            value={details.duration} 
            placeholder={"Your duration"} 
            name={"duration"} 
            type={"text"} 
            label={"Duration (days)"} 
            handleChange={handleChange} 
          />
          <CustomInput 
            value={details.commencement_date} 
            placeholder={"Your commencement date"} 
            name={"commencement_date"} 
            type={"date"} 
            label={"Commencement date"} 
            handleChange={handleChange} 
          />
          <CustomInput 
            value={details.maturity_date} 
            placeholder={"Your maturity date"} 
            name={"maturity_date"} 
            type={"date"} 
            label={"Maturity date"} 
            handleChange={handleChange} 
          />
          <CustomInput 
            value={details.transferred_amount} 
            placeholder={"Amount transferred"} 
            name={"transferred_amount"} 
            type={"number"} 
            label={"Amount transferred"} 
            handleChange={handleChange} 
          />
        </div>

        <div className='my-4'>
          <h2 className='font-bold greenheader'>Transferred from:</h2>
          <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <CustomInput 
              value={details.from_bank} 
              placeholder={"Sender Bank name"} 
              name={"from_bank"} 
              type={"text"} 
              label={"Sender bank name"} 
              handleChange={handleChange} 
            />
            <CustomInput 
              value={details.from_account_number} 
              placeholder={"Sender account number"} 
              name={"from_account_number"} 
              type={"number"} 
              label={"Sender account number"} 
              handleChange={handleChange} 
            />
            <CustomInput 
              value={details.from_date_transferred} 
              placeholder={"Date transferred"} 
              name={"from_date_transferred"} 
              type={"date"} 
              label={"Date transferred"} 
              handleChange={handleChange} 
            />
          </section>
        </div>

        <div className='my-4'>
          <h2 className='font-bold greenheader'>Transferred to:</h2>
          <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <CustomInput 
              value={details.bank_name} 
              placeholder={"Bank name"} 
              name={"bank_name"} 
              type={"text"} 
              label={"Receiver bank name"} 
              handleChange={handleChange} 
            />
            <CustomInput 
              value={details.account_number} 
              placeholder={"Receiver account number"} 
              name={"account_number"} 
              type={"number"} 
              label={"Receiver account number"} 
              handleChange={handleChange} 
            />
            <CustomInput 
              value={details.date_transferred} 
              placeholder={"Date transferred"} 
              name={"date_transferred"} 
              type={"date"} 
              label={"Date transferred"} 
              handleChange={handleChange} 
            />
          </section>
        </div>

        <article className='ml-auto my-2'>
          <h1 className='greenheader pb-3'>Upload your signature below</h1>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleSignature(e)}
            className="hidden form-input"
            id="customerSignatureInput"
          />
          <label htmlFor="customerSignatureInput" className="relative block cursor-pointer">
            {details.signature ? (
              <img
                src={details.signature}
                alt="Signature"
                className="w-[200px] h-[100px] object-contain"
              />
            ) : (
              <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
                <span className="text-gray-500 py-4">Upload Signature</span>
              </div>
            )}
          </label>
        </article>
        
        <article className='ml-auto my-2'>
          <h1 className='greenheader pb-3'>Upload your evidence below</h1>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleEvidence(e)}
            className="hidden form-input"
            id="evidence"
          />
          <label htmlFor="evidence" className="relative block cursor-pointer">
            {details.evidence ? (
              <img
                src={details.evidence}
                alt="Evidence"
                className="w-[400px] h-full object-cover"
              />
            ) : (
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