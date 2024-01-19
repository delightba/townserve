import React from 'react'
import { formatDate } from '../../Components/FormatDate'

const OfferInvestmentLetter = ({ details, targetRef }) => {
  return (
    <div ref={targetRef} className='p-[100px] shadow-xl w-full xl:w-[60%] mx-auto'>
      <section className='flex justify-between my-4'>
        {/* user side */}
        <div>
          <p>{formatDate(details.date)}</p>
          <article className='font-bold text-lg'>
            <p className='text-xl'>{details.name}</p>
            <address>{details.address},</address>
            <address>{details.local_government},</address>
            <address>{details.state}.</address>
            <br />
            <h1>Dear Sir,</h1>
          </article>
        </div>
      </section>
      <section>
        <h2 className='underline text-xl font-bold'>Offer of Fixed Deposit Investment</h2>
        <p className='text-lg font-medium'>We write further to your recent telephone discussion with us on your interest in our products and we wish to make our offer thus:</p>

        <ul className="mt-6 w-full lg:w-[50%] font-bold">
          <li className='list'>
            <p>Product:</p>
            <p>{details.product}</p>
          </li>
          <li className='list'>
            <p>Tenor:</p>
            <article className='flex gap-3'>
              <p>{details.tenor1} -</p>
              <p>{details.tenor2}</p>
            </article>
          </li>
          <li className='list'>
            <p>Interest Offer:</p>
            <article className='flex gap-3'>
              <p>{details.interest1}% pa -</p>
              <p>{details.interest2}% pa</p>
            </article>
          </li>

          <li className='list'>
            <p>Principal Range:</p>
            <article className='flex gap-3'>
              <p>₦{details.principal_range1} -</p>
              <p>₦{details.principal_range2}</p>
            </article>
          </li>
        </ul>
      </section>
      <section className='my-6 flex flex-col gap-4 font-bold text-lg'>
        <p>We look forward to your cheque for the principal as soon as possible.</p>
        <p>Thank you in anticipation of your mutually beneficial business patronage.</p>
      </section>
      <section className='flex justify-between items-end my-4'>
        <div>
          <article>
            <p className='font-bold'>Yours faithfully,</p>
            <h1 className='font-bold text-xl'>TOWNSERVE MICROFINANCE BANK LIMITED</h1>
            <br />
            <figure>
              <img src={details.signature} alt="" className='w-[200px] h-[150px] object-contain' />
            </figure>
            <h2 className='font-medium text-lg'>Abdul Ganiyat</h2>
            <p>Ag, Managing Director </p>
          </article>
        </div>
      </section>
    </div>
  )
}

export default OfferInvestmentLetter