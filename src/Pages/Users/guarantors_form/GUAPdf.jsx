import React from 'react'
import Logo from '../../../mainlogo.png'


const GUAPdf = ({ details, targetRef }) => {
 return (
  <div ref={targetRef}>
   <header className='flex flex-col justify-center text-right text-[14px] w-[55%] h-[100px] mx-auto mb-[20px]'>
    <img src={Logo} alt="" className='w-full h-[100px] mx-auto' />
    <address className='text-asparagus-600'>26,Gbasemo Street, Aga, Ikorodu, Lagos State</address>
    <a href="tel:+"><span className='text-red-600'>Tel:</span>01-7349666, 08078755269</a>
    <a href="mailto:townservemicrofinancebank@yahoo.com"> <span className='text-red-600'>Email:</span> townservemicrofinancebank@yahoo.com</a>
   </header>
   {/* Guarator's form */}
   <section>
    <div>
     <h2 className="text-xl underline">GUARANTOR'S FORM</h2>
     <figure>
      <img src={details.guarantor.passport_photo} alt="" className='w-[150px] h-[100px]' />
     </figure>
    </div>
    <div>
     <ol className="flex flex-col gap-2 font-semibold li-spacing">
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
     </ol>
    </div>
   </section>
   {/* DOD */}
   <section>

   </section>
   {/* DECLARATION */}
   <section>

   </section>
  </div>
 )
}

export default GUAPdf