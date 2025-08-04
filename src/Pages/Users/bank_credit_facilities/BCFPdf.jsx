import React from 'react'
import Logo from '../../../mainlogo.png'


const BCFPdf = ({ details, targetRef }) => {
  return (
    <div className='p-[20px] lg:py-[60px] lg:px-[70px] w-full xl:w-[60%] mx-auto' ref={targetRef}>
      <p className='font-bold text-lg'>TM 008</p>
      <header className='flex flex-col justify-center text-right text-[14px] w-[55%] h-[100px] mx-auto mb-[20px]'>
        {/* <img src={Logo} alt="" className='w-full h-[100px] mx-auto' /> */}
        {/* <address className='text-asparagus-600'>2 TOS Benson Rd, Ojogbe Junction, Ikorodu Lagos State</address>
        <a href="tel:+"><span className='text-red-600'>Tel:</span>01-7349666, 08078755269</a>
        <a href="mailto:townservemicrofinancebank@yahoo.com"> <span className='text-red-600'>Email:</span> townservemicrofinancebank@yahoo.com</a> */}
      </header>
      <div className='flex flex-col gap-3 font-medium mb-[10px]'>
        <div>
          <h2>{details.name},</h2>
          <address>{details.address},</address>
          <address>{details.state}.</address>
        </div>
        <div className='flex justify-between '>
          <p>Dear Sir,</p>
          <p className=''>Date: {details.date}</p>
        </div>
      </div>
      <section className='my-[5px]'>
        <h2 className='smallheader'>APPLICATION FOR BANK/CREDIT FACILITIES</h2>
        <div className='my-1'>
          <p className='text-lg'>I <span className='font-semibold'>{details.name} </span>Wish to apply for the following banking facilities</p>
        </div>
        {/* loan overdraft */}
        <div className='my-2'>
          <h2 className='smallheader'>LOAN/OVERDRAFT/L.P.O FINANCING/BUSINESS FINANCING</h2>
          <ol className="list-decimal flex flex-col gap-2 my-2 font-semibold li-spacing">
            <li>
              <p>Amount: <span className="font-medium">{details.amount}</span></p>
              <p>Purpose: <span className="font-medium">{details.purpose}</span></p>
              <p>Tenure: <span className="font-medium">{details.tenure}</span></p>
              <p>Pay Back Period: <span className="font-medium">{details.pay_back_period}</span></p>
            </li>
            <li>
              <p>Issuing Company: {details.issuing_company}</p>
              <p>L.P.O No. and Date: <span className="font-medium">{details.lpo_and_date}</span></p>
            </li>
            <li >
              <p>No of share held with TMFB: <span className="font-medium">{details.shares_held}</span></p>
              <p>Shares receipt No: <span className="font-medium">{details.shares_receipt_number}</span></p>
            </li>
            <li>
              <p>As security, the following items are being offered: ________________________</p>
              <ol className='list-lower-alpha'>
                <li><span className="font-medium">{details.security_asset.first}</span></li>
                <li><span className="font-medium">{details.security_asset.second}</span></li>
                <li><span className="font-medium">{details.security_asset.third}</span></li>
              </ol>
            </li>
          </ol>
        </div>
        {/* personal data */}
        <div>
          <h2 className='font-bold text-xl underline'>PERSONAL DATA</h2>
          <ol className="list-decimal flex flex-col gap-2 my-2 font-semibold li-spacing">
            <li>
              Name of Applicant: <span className="font-medium">{details.applicant_name}</span>
            </li>
            <li>Address: <span className="font-medium">{details.applicant_address}</span></li>
            <li>Tel: <span className="font-medium">{details.tel}</span></li>

            <li>
              <ul className='flex gap-8'>
                <li>Length of stay in this address: <span className="font-medium">{details.length_of_stay}</span></li>
                <li>
                  State of origin: <span className="font-medium">{details.state_of_origin}</span>
                </li>
              </ul>

            </li>

            <li>Permanent Home Address in the state of origin: <span className="font-medium">{details.permanent_address}</span></li>
            <li>
              <ul className='flex gap-8'>
                <li>Business engaged in: <span className="font-medium">{details.business}</span></li>
                <li>
                  How long: <span className="font-medium">{details.business_length}</span>
                </li>
              </ul>
            </li>

            <li>
              <ul className='flex gap-8'>
                <li>Marital Status: <span className="font-medium">{details.marital_status}</span></li>
                <li>
                  Next of Kin: <span className="font-medium">{details.nok}</span>
                </li>
              </ul>
            </li>

            <li>
              <ul>
                <li>Address of next of kin: <span className="font-medium">{details.nok_address}</span></li>
                <li>
                  Relationship: <span className="font-medium">{details.relationship}</span>
                </li>
              </ul>
            </li>

          </ol>
        </div>

        <div>
          <h2 className='smallheader'>Name of Guarantors:</h2>
          <ol className="list-decimal flex flex-col items-center gap-2 my-4 font-semibold li-spacing">
            <li>{details.guarantors.first}</li>
            <li>{details.guarantors.second}</li>
          </ol>
        </div>
        {/* yours faitfully */}
        <div>
          <p className='text-lg font-semibold pb-2'>Yours faithfully,</p>
          <article>
            <img src={details.signature} alt="" className='w-[100px]' />
            <p className='text-sm font-bold'>SIGNATURE</p>
          </article>
        </div>
      </section>
    </div>
  )
}

export default BCFPdf