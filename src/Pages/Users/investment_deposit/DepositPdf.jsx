import React from 'react'
import { formatDate } from '../../../Components/FormatDate'

const DepositPdf = ({ details, targetRef }) => {
 return (
  <div ref={targetRef} className='py-[60px] px-[70px] shadow-xl w-full xl:w-[60%] mx-auto flex flex-col gap-6'>
   <header className='flex flex-col gap-3 font-bold text-xl'>
    <h2>DATE: {formatDate(details.date)}</h2>
    <article>
     <h3>THE MANAGER</h3>
     <h3>TOWNSERVE MICROFINANCE BANK LTD</h3>
     <h3>IKORODU,</h3>
     <h3>LAGOS</h3>
    </article>
    <h1>Dear Sir</h1>
   </header>
   <p className='text-center underline text-2xl'>INVESTMENT/DEPOSIT APPLICATION LETTER</p>
   <section>
    <p className='text-xl font-semibold'>I/We: {details.name} hereby wish to invest with your bank as follows;</p>
    <div>
     <ul className="my-6 w-full font-bold">
      <li className='list'>
       <p>NAME OF INVESTOR(S):</p>
       <p>{details.name_of_investors}</p>
      </li>
      <li className='list'>
       <p>TYPE OF INVESTMENT:</p>
       <p>{details.type_of_investment}</p>
      </li>
      <li className='list'>
       <p>AMOUNT TO INVEST:</p>
       <p>{details.amount_to_invest}</p>
      </li>
      <li className='list'>
       <p>PROPOSED INTEREST RATE:</p>
       <p>{details.interest_rate}% Per Month/Annum</p>
      </li>

      <li className='list'>
       <p>DURATION OF INVESTMENT:</p>
       <p>{details.duration}</p>
      </li>
      <li className='list'>
       <p>COMMENCEMENT DATE OF INVESTMENT:</p>
       <p>{formatDate(details.commencement_date)}</p>
      </li>
      <li className='list'>
       <p>MATURITY DATE OF INVESTMENT:</p>
       <p>{formatDate(details.maturity_date)}</p>
      </li>
     </ul>
     <p className='font-medium text-lg'>THE SUM OF <span className='font-bold text-xl'>{details.transferred_amount}</span> HAS BEEN DEPOSITED/TRANSFERRED</p>
     <br />
     <h4 className='underline font-semibold text-lg'>to your:</h4>
     <article className='flex flex-col md:flex-row gap-3 text-xl font-bold'>
      <p>BANK NAME: {details.bank_name}</p>
      <p>A/c NUMBER: {details.account_number}</p>
     </article>
     <p>DATE: {details.date_transferred}</p>

     <figure className='my-4'>
      <h2 className='greenheader mb-3'>Evidence</h2>
      <img src={details.evidence} alt="" className='w-[200px] ' />
     </figure>
     <h4 className='underline font-semibold text-lg'>from my/our:</h4>
     <article className='flex flex-col md:flex-row gap-3 text-xl font-bold'>
      <p>BANK NAME: {details.bank_name}</p>
      <p>A/c NUMBER: {details.account_number}</p>
     </article>

     <p className='text-xl font-semibold'>DATE: {details.date_transferred}</p>
    </div>
    <div className='my-6 text-lg font-semibold'>
     <h3>Thank you.</h3>
     <p className='mb-3'>Yours faithfully,</p>
     <img src={details.signature} alt="signature" className='w-[200px] ' />

     <p>Name: {details.name}</p>
    </div>
   </section>
  </div>
 )
}

export default DepositPdf