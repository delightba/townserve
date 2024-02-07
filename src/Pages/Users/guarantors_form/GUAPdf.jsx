import React from 'react'
import Logo from '../../../mainlogo.png'
import { formatDate } from '../../../Components/FormatDate'


const GUAPdf = ({ details, targetRef }) => {
 return (
  <div ref={targetRef} className='p-[20px] lg:py-[60px] lg:px-[70px] w-full lg:w-[60%] mx-auto'>
   <header className='flex flex-col justify-center text-right text-[14px] w-[55%] h-[100px] mx-auto mb-[20px]'>
    <img src={Logo} alt="" className='w-full h-[100px] mx-auto' />
    <address className='text-asparagus-600'>26,Gbasemo Street, Aga, Ikorodu, Lagos State</address>
    <a href="tel:+"><span className='text-red-600'>Tel:</span>01-7349666, 08078755269</a>
    <a href="mailto:townservemicrofinancebank@yahoo.com"> <span className='text-red-600'>Email:</span> townservemicrofinancebank@yahoo.com</a>
   </header>
   {/* Guarator's form */}
   <section className='my-8'>
    <figure className='flex justify-end items-end my-4 ml-auto'>
     <img src={details.guarantor.passport_photo} alt="passport" className='w-[200px] h-[200px] object-contain' />
    </figure>
    <div>
     <h2 className="text-xl md:text-2xl lg:text-4xl underline text-center font-bold">GUARANTOR'S FORM</h2>
    </div>
    <div className='my-4'>
     <ol className="list-decimal flex flex-col gap-3 font-semibold li-spacing">
      <li>
       NAME OF GUARANTOR: <span className="font-medium">{details.guarantor.name}</span>
      </li>
      <li>
       ADDRESS: <span className="font-medium">{details.guarantor.address}</span>
      </li>
      <li>
       OCCUPATION: <span className="font-medium">{details.guarantor.occupation}</span>
      </li>
      <li>
       PLACE OF WORK: <span className="font-medium">{details.guarantor.place_of_work}</span>
      </li>
      <li>
       <ul>
        <li>
         NAME OF BANK: <span className="font-medium">{details.guarantor.name_of_bank}</span>
        </li>
        <li>
         ADDRESS OF BANK: <span className="font-medium">{details.guarantor.address_of_bank}</span>
        </li>
        <li>
         ACCOUNT NUMBER: <span className="font-medium">{details.guarantor.account_number}</span>
        </li>
       </ul>
      </li>
      <li>
       PERMANENT HOME ADDRESS: <span className="font-medium">{details.guarantor.permanent_address}</span>
      </li>
      <li>
       RELATIONSHIP WITH THE APPLICANT: <span className="font-medium">{details.guarantor.relationship_with_applicant}</span>
      </li>
      <li>
       In case of default by any cause at the due daate, I, <span className="font-semibold underline">{details.guarantor.name} hereby guarantee the REPAYMENT to Townserve Microfinance Bank Ltd of any Loan/Overdraft/L.P.O Finance/Business Finance not exceeding <span className="semi-bold underline">#{details.amount}</span>granted to Mr./Mrs./Miss <span className="semi-bold underline">{details.name}</span>he applicant</span>
      </li>
     </ol>
     <h2>Tel. No: {details.guarantor.tel}</h2>
     <div className='flex flex-col gap-3 justify-center items-center my-4'>
      <figure>
       <img src={details.guarantor.signature} alt="" className='w-[200px] h-[50px] object-contain' />
      </figure>
      <p>Signarute of Guarantor</p>
     </div>
    </div>
   </section>
   {/* DOG */}
   <section className='my-8'>
    <h2 className='myh2'>DEED OF GUARANTEE</h2>
    <div className='my-2'>
     <p>WHEREAS <span className="font-semibold underline">{details.name}</span> of <span className="font-semibold underline">{details.address}</span> (hereafter) referred to as "the customer" and Townserve Microfinance Bank Ltd (hereafter referred to as the company).</p>

     <div className='mt-2'>
      <p>NOW THEREFORE IN CONSIDERATION of the offer of facility by the company to the customer <span className="font-semibold underline">{details.name}</span> </p>
      <p className='mt-2'>I <span className="font-semibold underline">{details.guarantor.name}</span> of <span className="font-semibold underline">{details.guarantor.address}</span> (hereafter referred to as: "the guarantor")</p>
     </div>

     <article className='mt-5'>
      <h2 className='text-lg font-medium'>HEREBY AGREE as follows:</h2>
      <ol className="list-decimal ml-2 flex flex-col gap-4 p-2">
       <li>
        I hold myself responsible for  producing the customer as and when necessary in the event that he/she abconds or defaults with a view to avoiding criminal prosecution.
       </li>
       <li>
        I agree to indemnify the company for all financial losses arising from any malpractice of the client, in effecting payment.
       </li>
      </ol>
      IN WITNESS whereof, I the withing named Guarantor have hereunto set my hand ans deal this {details.date}
     </article>
    </div>
    <div className='my-4'>
     <h2 className='font-bold'>SIGNED, SEALED & DELIVERED</h2>
     <p className='text-sm'>By the within-named Guarantor</p>
     <figure className='mt-3'>
      <img src={details.guarantor.signature} alt="" className='w-[200px] h-[50px] object-contain' />
     </figure>
     <p className='italic'>Guarantor</p>
    </div>
   </section>
   {/* DECLARATION */}
   <section className='my-8'>
    <h2 className='myh2'>DECLARATION</h2>
    <div className='text-lg my-2'>
     <p>I, <span className="font-medium underline">{details.name}</span> a <span className="font-medium underline">{details.nationality}</span> of <span className="font-medium underline">{details.address}</span></p>
    </div>
    <div className='my-3'>
     <h2 className='text-lg font-medium'>Do hereby solemnly and sincerely decalre as follows:</h2>
     <ol className="list-decimal ml-2 flex flex-col gap-4 p-2">
      <li>
       That <span className="font-medium">{details.name}</span> is proposing with my full knowledge and consent, to take up a loan facility of <span className="font-medium">#{details.amount}</span> from Townserce Microfinance Bank Limited (hereafter referred to as the Company)
      </li>
      <li>
       That the particulars of the Guarantor as given in part 1 hereof are correct
      </li>
      <li>
       That i will be responsible for any financial loss suffered by Townserve Microfinance Bank Limited in case of default.
      </li>
     </ol>
     <div className="flex flex-col gap-3 justify-center items-center">
      <figure>
       <img src={details.guarantor.signature} alt="" className="w-[200px] h-[50px] object-contain" />
       <p>{formatDate(details.date)}</p>
      </figure>
      <p>GUARANTOR'S SIGNATURE & DATE</p>
     </div>
    </div>
   </section>
  </div>
 )
}

export default GUAPdf