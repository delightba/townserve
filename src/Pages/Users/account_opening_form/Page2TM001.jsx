/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import CustomInput from '../../../Components/CustomInput';

const PageTwoContent = () => {
 const localStorageKey = 'page2';

 const loadFormDataFromLocalStorage = () => {
  const storedFormData = sessionStorage.getItem(localStorageKey);
  return storedFormData ? JSON.parse(storedFormData) : null;
 };

 const saveFormDataToLocalStorage = (formData) => {
  sessionStorage.setItem(localStorageKey, JSON.stringify(formData));
 };
 const [page2, setPage2] = useState(loadFormDataFromLocalStorage() || {
  dated: '',
  to: '',
  date: {
   day: '',
   month: '',
   year: ''
  },
  details: Array(4).fill({ fullname: '', signature: '', address: '' }),
  approvedBy: { by: '', dated: '', signature: '', remarks: '' }
 })

 const handleToChange = (event) => {
  const newValue = event.target.value.toUpperCase();
  setPage2((prevState) => ({
   ...prevState,
   [event.target.name]: newValue,
  }));

  saveFormDataToLocalStorage({ ...page2, [event.target.name]: newValue });
 };
 const handleDateChange = (field, value) => {
  setPage2((prevState) => ({
   ...prevState,
   date: {
    ...prevState.date,
    [field]: value.toUpperCase(),
   },
  }));

  saveFormDataToLocalStorage({
   ...page2,
   date: {
    ...page2.date,
    [field]: value.toUpperCase(),
   },
  });
 };
 const handleDetailsChange = (index, field, value) => {
  setPage2((prevState) => {
   const updatedDetails = [...prevState.details];
   updatedDetails[index] = {
    ...updatedDetails[index],
    [field]: value.toUpperCase(), // Convert to uppercase
   };

   return {
    ...prevState,
    details: updatedDetails,
   };
  });

  saveFormDataToLocalStorage({
   ...page2,
   details: [
    ...page2.details.slice(0, index),
    {
     ...page2.details[index],
     [field]: value.toUpperCase(),
    },
    ...page2.details.slice(index + 1),
   ],
  });
 };

 const handleApprovedByChange = (field, value) => {
  setPage2((prevState) => ({
   ...prevState,
   approvedBy: {
    ...prevState.approvedBy,
    [field]: value.toUpperCase(), // Convert to uppercase
   },
  }));

  saveFormDataToLocalStorage({
   ...page2,
   approvedBy: {
    ...page2.approvedBy,
    [field]: value.toUpperCase(),
   },
  });
 };


 const handleImageChange = async (index, file) => {
  const dataUrl = await readFileAsDataURL(file);

  setPage2((prevForm) => {
   const updatedDetails = [...prevForm.details];

   if (!updatedDetails[index]) {
    updatedDetails[index] = {};
   }

   updatedDetails[index] = {
    ...updatedDetails[index],
    signature: dataUrl,
   };

   saveFormDataToLocalStorage({
    ...prevForm,
    details: updatedDetails,
   });

   return {
    ...prevForm,
    details: updatedDetails,
   };
  });
 };

 // Function to read a file as a data URL
 const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
   const reader = new FileReader();

   reader.onload = () => {
    resolve(reader.result);
   };

   reader.onerror = (error) => {
    reject(error);
   };

   reader.readAsDataURL(file);
  });
 };

 return (
  <div className='py-8 px-4'>
   <div className='flex items-start gap-4 justify-between mb-4'>
    <article>
     <p>
      The Managing Director, <br />
      TOWNSERVE MICROFINANCE BANK PLC
     </p>
     <CustomInput name={'to'} value={page2.to} handleChange={handleToChange} label={''} type={'text'}/>
    </article>

    <div>
     <CustomInput name={'dated'} value={page2.dated} handleChange={handleToChange} label={'Dated this'} type={'date'}/>
    </div>
   </div>
   <p>Dear Sirs,</p>
   <p>
    Please open a personal / joint current account in my/our name(s)
   </p>
   <p>
    I/We request and authorize you until I/We shall give notice in writing
    to the contrary to honor all cheques or other orders which may be drawn
    on the said account provided such cheques or orders are signed by
    me/us, and I/We request and authorize you to debit such cheques or
    orders to the said account with you whether such account be for the time
    being in credit or overdrawn or may become overdrawn in consequence of
    such debit in consideration of which I/We agree:
   </p>
   <ol className="list-decimal list-inside mt-4 text-[14px]">
    <li>To be responsible for the repayment of any such overdraft with interest.</li>
    <li>
     To assure full responsibility for the genuineness, correctness, and
     validity of all endorsements appearing on all cheques, orders, bill
     notes, negotiable instruments, and receipts or other documents
     deposited in my/our account.
    </li>
    <li>To comply with and be bound by the bank’s rules for the conduct of such accounts copy of which I/We have received.</li>
    <li>
     To hold you free from any responsibility  for any loss or damage to funds deposited with you due to any future Government order, law, levy, tax, embargo moratorium, exchange restriction or any other cause beyond your control , and that any of all funds standing to the credit of the account are payable only at your said branch, on demand only and in such local currency as may then be in local circulation.
    </li>
    <li>
     To the bank’s debiting my/our account for any service charges, from time to time set the management, if the account prove to be unremunerative to the bank.
    </li>
    <li>
     To accept as due notification any change in conditions governing the account directed to my/our last known address and to be bound by such change.
    </li>
    <li>
     To accept as due notification any change in conditions governing the account directed to my/our last known address and to be bound by such change.
    </li>
    <li>
     If a cheque to credited to my/our personal/joint account is returned dishonoured, the same may be transmitted to me/us through my/our known post address either by bearer or by post.
    </li>
    <li>
     I/We note that the bank will accept no liability whatsoever for fund handed to member of the staff outside banking hours Or outside the bank’s premises.
    </li>
    <li>
     My/Our attention has been drawn to the necessity of safe guarding my/our cheque book so that unauthorised persons are unable to gain access to it and to the fact that neglect of this precaution may a ground for any consequential loss being charged to my/our account.
    </li>
    <li>
     I/We, understand and agreed that you are under no obligation to honour any cheque(s) drawn on this account unless there are sufficient funds in the account to cover the value of the said cheques and I/We understand and agree that any such cheques maybe returned to me/us unpaid.
    </li>
    <li>
     I/We agree that any disagreements with entries on my bank statement will be made by me/us within 15days of the dispatch of the bank statement. Failing receipt by the bank of a notice of a disagreement of the entries within 15days from the date of dispatch of my bank statement, it will be assumed by the Bank that the statements as rendered is correct.
    </li>
    <li>
     I/We understand that any sum standing to the credit of this current account shall not bear any interest. I/We further understand that any sum standing to the debit of the current account shall be liable to interest charges at the rate fixed by the Bank from time to time. You are authorised to debit from the account your usual banking charges, interest commissions, etc.
    </li>
    <li>
     I/We agree that in addition to any general lien or similar to right to which you as a benker may be entitled by law you may at any time and without notice to me/us combine or consolidate all or any my accounts with and liabilities to you and set of transfer any sum or sums standing to due credit of any one or more of such accounts or any other credit, be it Cash, cheques, valuable deposits, securities, negotiable instruments other assets belonging to me or toward satisfaction of any liabilities to you/us or any other accounts or in any respect whether such liabilities to be actual or contigent primary collateral and several or joint.
    </li>
    <li>
     That the bank may close my/our account upon giving reasonable notice to me/us of it intention to close the account. The length of notice to be given will be at the discretion of this bank. The bank is however not obliged to give, such notice to me/us if the account is closed on grounds of illegality.
    </li>
   </ol>
   {/* ... (more content) */}
   <article className='flex gap-1 items-end my-3'>
    <CustomInput name={'day'} value={page2.date.day} handleChange={(event) => handleDateChange('day', event.target.value)} label={'Dated this'} />
    <CustomInput name={'month'} value={page2.date.month} handleChange={(event) => handleDateChange('month', event.target.value)} label={'day of'} />
    <CustomInput name={'year'} value={page2.date.year} handleChange={(event) => handleDateChange('year', event.target.value)} label={'20'} />
   </article>

   <div>
    {page2.details.map((detail, index) => (
     <div key={index}>
      <article className='flex flex-col md:flex-row gap-2'>
       <CustomInput
        value={detail.fullname}
        handleChange={(event) => handleDetailsChange(index, 'fullname', event.target.value)}
        label={'FULL NAME:'}
       />
       <CustomInput
        value={detail.address}
        handleChange={(event) => handleDetailsChange(index, 'address', event.target.value)}
        label={'ADDRESS:'}
       />
      </article>
      <article className='my-2'>
       <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(index, e.target.files[0])}
        className="hidden form-input"
        id={`customerSignatureInput-${index}`}
       />
       <label htmlFor={`customerSignatureInput-${index}`} className="relative block cursor-pointer">
        {detail.signature && (
         <img
          src={detail.signature}
          alt="Signature"
          className="w-[150] h-[100px] object-contain"
         />
        )}
        {!detail.signature && (
         <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
          <span className="text-gray-500">Upload Signature</span>
         </div>
        )}
       </label>
      </article>
     </div>
    ))}
   </div>

   <div className='flex flex-col'>
    <h2 className='text-center'>FOR BANK USE ONLY</h2>
    <h3 className='underline greenheader'>ACCOUNT OPENING APPROVED BY:</h3>
    <div>
     <CustomInput name={'by'} value={page2.approvedBy.by} handleChange={(event) => handleApprovedByChange('by', event.target.value)} label={'Approved by'} />
     <article className='flex gap-1 items-end my-3'>
      <CustomInput name={'dated'} value={page2.approvedBy.dated} handleChange={(event) => handleApprovedByChange('dated', event.target.value)} label={'Signature:'} />
      <CustomInput name={'signature'} value={page2.approvedBy.signature} handleChange={(event) => handleApprovedByChange('signature', event.target.value)} label={'Date:'} />
     </article>
     <CustomInput name={'remarks'} value={page2.approvedBy.remarks} handleChange={(event) => handleApprovedByChange('remarks', event.target.value)} label={'Remarks'} />
    </div>
    <p className='ml-auto mt-4'>Signature with (₦50 Stamp)</p>
   </div>

  </div>
 );
};

export default PageTwoContent;