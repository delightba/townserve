import React from 'react'
import Logo from '../../../mainlogo.png'


const EsusuPdf = ({ details, targetRef }) => {
  return (
    <div className='pt-4 p-[60px] pb-[15px] w-full xl:w-[60%] mx-auto' ref={targetRef}>
      <p className='font-bold text-lg'>TM 008</p>
      <header className='flex flex-col justify-center text-right text-[14px] w-[55%] h-[100px] mx-auto mb-[20px]'>
        <img src={Logo} alt="" className='w-full h-[100px] mx-auto' />
        <address className='text-asparagus-600'>26,Gbasemo Street, Aga, Ikorodu, Lagos State</address>
        <a href="tel:+"><span className='text-red-600'>Tel:</span>01-7349666, 08078755269</a>
        <a href="mailto:townservemicrofinancebank@yahoo.com"> <span className='text-red-600'>Email:</span> townservemicrofinancebank@yahoo.com</a>
      </header>
      <div className='flex flex-col gap-3 font-medium mb-[10px]'>
        <div>
          <h2>{details.name},</h2>
          <address>{details.address},</address>
          <address>{details.state}.</address>
        </div>
        <div className='flex justify-between  my-2'>
          <article>
            <p className=''>Date: {details.date}</p>
            <p>Dear Sir,</p>
          </article>
          <figure>
            <h3 className='py-2 font-bold'>Applicant passport photo</h3>
            <img src={details.applicant_passport_photo} alt="" className='w-[150px] h-[150px] object-contain' />
          </figure>
        </div>
      </div>
      <section className='my-[5px]'>
        <h2 className='smallheader'>APPLICATION FOR ESUSU CONTRIBUTION LOAN (ECL)</h2>
        <div className='my-1'>
          <p className='text-lg'>I <span className='font-semibold'>{details.name} </span>wish to apply for a loan facility.</p>
        </div>
        {/* loan overdraft */}
        <div className='my-2'>
          <ol className="flex flex-col gap-2 font-semibold li-spacing">
            <li>
              Amount: <span className="font-medium">{details.amount}</span>
            </li>
            <li>Purpose: <span className="font-medium">{details.purpose}</span></li>
            <li>
              <p>Tenure:  <span className="font-medium">{details.tenure}</span></p>
              <p>Repayment: <span className="font-medium">{details.repayment}</span></p>
            </li>
            <li>
              <p>Security as follows:</p>
              <ol className='flex gap-3'>
                <li><span className="font-medium">{details.security_asset.first}</span></li>
                <li><span className="font-medium">{details.security_asset.second}</span></li>
                <li><span className="font-medium">{details.security_asset.third}</span></li>
              </ol>
            </li>
          </ol>
        </div>
        {/* personal data */}
        <div>
          <h2 className='font-bold text-xl underline'>Personal Details</h2>
          <ol className="list-decimal flex flex-col gap-2 my-2 font-semibold li-spacing">
            <li>Address: <span className="font-medium">{details.address}</span></li>
            <li>
              <ul className='flex gap-8'>
                <li>Tel: <span className="font-medium">{details.tel}</span></li>
                <li>Marital Status: <span className="font-medium">{details.marital_status}</span></li>
              </ul>
            </li>
            <li>
              Length of stay in this address: <span className="font-medium">{details.length_of_stay}</span>
            </li>
            <li>
              <ul className='flex gap-8'>
                <li>Business engaged in: <span className="font-medium">{details.business}</span></li>
                <li>
                  How long: <span className="font-medium">{details.business_length}</span>
                </li>
              </ul>
            </li>
          </ol>
          <article>
            <h3 className='py-2 font-bold'>Signature and Date</h3>
            <img src={details.signature} alt="" className='w-[150px] h-full object-contain' />
            <p className='text-sm font-bold'>{details.date}</p>
          </article>
        </div>

        <div>
          <h2 className='smallheader'>Guarantor's Data:</h2>
          <ol className="list-decimal flex flex-col gap-2 my-4 font-semibold li-spacing">
            <li>Name of Guarantor: <span className="font-medium">{details.guarantor.name}</span></li>
            <li>Address: <span className="font-medium">{details.guarantor.address}</span></li>
            <br />
            <li>Occupation: <span className="font-medium">{details.guarantor.occupation}</span></li>
            <li>Relationship with applicant: <span className="font-medium">{details.guarantor.relationship_with_applicant}</span></li>
            <li>I, <span className="font-medium">{details.guarantor.relationship_with_applicant}</span> herby guarantees the repayment to Townserve Microfinance Bank of any loan not exceeding ₦{details.amount} if granted to Mr./Mrs./Miss {details.name}</li>

          </ol>
          <div className='my-4 flex flex-col gap-4'>
            <article>
              <h3 className='py-3 font-bold'>Signature and date</h3>
              <img src={details.signature} alt="" className='w-[150px] h-full object-contain' />
              <p className='text-sm font-bold'>{details.date}</p>
            </article>
            <figure>
              <h3 className='py-3 font-bold '>Passport photograph</h3>
              <img src={details.guarantor.passport_photo} alt="" className='w-[150px] h-[150px] object-cover' />
            </figure>
          </div>
        </div>
        {/* yours faitfully */}
        <div className='flex justify-between my-[100px]'>
          <article>
            <p>-----------------------</p>
            <p className='text-sm font-bold'>Managing Director</p>
          </article>
          <article>
            <p>-----------------------</p>
            <p className='text-sm font-bold'>Head, Marketing Unit</p>
          </article>
        </div>
      </section>
    </div>
  )
}

export default EsusuPdf