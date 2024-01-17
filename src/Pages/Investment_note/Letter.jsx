import React from 'react'
import Logo from '../../mainlogo.png'



const Letter = ({ details, targetRef }) => {
 const formatDate = (inputDate) => {
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  const formattedDate = new Date(inputDate).toLocaleDateString('en-US', options);

  return formattedDate;
 };

 return (
  <div ref={targetRef} className='p-6 shadow-xl w-full xl:w-[60%] mx-auto'>
   <header className='flex jusfity-center w-full '>
    <img src={Logo} alt='logo' className='w-[25%] mx-auto' />
   </header>
   <section className='flex justify-between my-4'>
    {/* user side */}
    <div>
     <p>{formatDate(details.date)}</p>
     <article className='font-bold text-lg'>
      <p className='text-xl'>{details.name}</p>
      <address>{details.address},{details.state}.</address>
      <br />
      <h1>Dear Sir,</h1>
     </article>
    </div>
    {/* admin address */}
    <div className='text-lg font-medium'>
     <address>2, TOS Benson Rd,</address>
     <address>Ojogbe Junction, Ikorodu, Lagos State,</address>
     <p>Tel: 08133031328, 08033063405, 08027746564</p>
     <p>E-mail: <a href="mailto:info@townservemicrofinancebank.com">info@townservemicrofinancebank.com</a>,<br /><a href="mailto:townservemicrofinancebank@yahoo.com">townservemicrofinancebank@yahoo.com</a> </p>
    </div>
   </section>
   <section>
    <h2 className='underline text-xl font-bold'>INVESTMENT NOTE</h2>
    <p className='text-lg'>We ackowledge the receipt of your <span>{details.amount}({details.amount_in_words})</span> cash lodgement into our Call Investment Appreciation Note.</p>
    <p>Your investment is hereby confirmed under the following terms and conditions:</p>
    <ul className="mt-6 w-full lg:w-[80%] font-bold">
     <li className='list'>
      <p>AMOUNT:</p>
      <p>{details.amount}</p>
     </li>
     <li className='list'>
      <p>RATE:</p>
      <p>{details.rate}</p>
     </li>
     <li className='list'>
      <p>TENOR:</p>
      <p>{details.tenor}</p>
     </li>
     <li className='list'>
      <p>EFFECTIVE DATE:</p>
      <p>{formatDate(details.effective_date)}</p>
     </li>
     <li className='list'>
      <p>MATURITY DATE:</p>
      <p>{formatDate(details.maturity_date)}</p>
     </li>

     <li className='list'>
      <p>REPAYMENT DATE:</p>
      <p>{formatDate(details.repayment_date)}</p>
     </li>
     <li className='list'>
      <p>AMOUNT AT MATURITY:</p>
      <p>{details.value_at_maturity} ({details.value_at_maturity_words})</p>
     </li>
    </ul>
   </section>
   <section className='my-3 flex flex-col gap-4 font-medium text-lg'>
    <p>Kindly note that interest is payable at maturity less 10% Withholding Tax (WHT). However, a minimum of 5 working days shall be required in a case of premature termination either in part or in full. this shall also attract a penalty of 25% of the accrued interest on your investment.</p>
    <p>Kindly confirm your acceptance by acknowleding and returning to us the duplicate copy of this letter.</p>
    <p>Thank you for your continued patronage.</p>
   </section>
   <section className='flex justify-between items-end my-4'>
    <div>
     <article>
      <p className='font-bold'>Yours faithfully,</p>
      <h1 className='font-bold text-xl'>TOWNSERVE MICROFINANCE BANK LIMITED</h1>
      <br />
      <h2 className='font-medium text-lg'>Adelaja Oluwaseyijeje</h2>
      <p>Treasury & Financial Services Unit</p>
     </article>
    </div>
    <div>
     <h2 className='font-medium text-lg'>Abdulfatai-S Ganiyat</h2>
     <p>Ag, Managing Director</p>
    </div>
   </section>
  </div>
 )
}

export default Letter