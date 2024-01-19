import React, { useState } from 'react'
import { usePDF, Margin } from 'react-to-pdf';
import DepositForm from './DepositForm'
import DepositPdf from './DepositPdf'
import { GrDocumentPdf } from "react-icons/gr";
import { readFileAsDataURL } from '../../../Components/FormatDate';
import { useNavigate } from 'react-router-dom';


const DepositPage = () => {
 const navigate = useNavigate()
 const localStorageKey = 'DepositPage';
 // Function to load form data from localStorage
 const loadFormDataFromLocalStorage = () => {
  const storedFormData = sessionStorage.getItem(localStorageKey);
  return storedFormData ? JSON.parse(storedFormData) : null;
 };

 const saveFormDataToLocalStorage = (formData) => {
  sessionStorage.setItem(localStorageKey, JSON.stringify(formData));
 };
 const [isFillingForm, setIsFillingForm] = useState(true)
 const [details, setDetails] = useState(loadFormDataFromLocalStorage() || {
  date: '',
  name: '',
  name_of_investors: '',
  type_of_investment: '',
  amount_to_invest: '',
  interest_rate: '',
  duration: '',
  commencement_date: '',
  maturity_date: '',
  transferred_amount: '',
  bank_name: '',
  account_number: '',
  date_transferred: '',
  from_bank: '',
  from_account_number: '',
  from_date_transferred: '',
  signature: '',
  evidence: ''
 })

 const handleChange = (e) => {
  const { name, value } = e.target;
  const uppercaseValue = value.toUpperCase()

  setDetails((prev) => ({
   ...prev,
   [name]: uppercaseValue
  }))
  saveFormDataToLocalStorage({
   ...details,
   [name]: uppercaseValue
  })
 }
 const handleCustomerSignatureChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
   // Convert the file to a data URL
   const dataUrl = await readFileAsDataURL(file);
   setDetails((prev) => ({
    ...prev,
    signature: dataUrl,
   }));
   // Save the updated form data to localStorage
   saveFormDataToLocalStorage({
    ...details,
    signature: dataUrl,
   });
  }
 };
 const handleEvidenceChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
   // Convert the file to a data URL
   const dataUrl = await readFileAsDataURL(file);
   setDetails((prev) => ({
    ...prev,
    evidence: dataUrl,
   }));
   // Save the updated form data to localStorage
   saveFormDataToLocalStorage({
    ...details,
    evidence: dataUrl,
   });
  }
 };

 const handleSubmit = () => {
  for (const key in details) {
   if (details[key] === '') {
    alert(`Please fill in all fields`);
    return;
   }
  }
  setIsFillingForm(false)
 }

 const options = {
  page: {
   margin: Margin.SMALL,
  },
  overrides: {
   pdf: {
    compress: true
   },
   canvas: {
    useCORS: true
   }
  }
 }

 const { toPDF, targetRef } = usePDF({ filename: `${details.name}.pdf` }, options);

 return (
  <div className="w-full md:w-[80%] mx-auto mt-8">
   {isFillingForm && <DepositForm details={details} handleChange={handleChange} handleSubmit={handleSubmit} handleSignature={handleCustomerSignatureChange} handleEvidence={handleEvidenceChange} />}
   {!isFillingForm &&
    <div className="relative flex flex-col gap-3">
     <DepositPdf details={details} targetRef={targetRef} />
     <div className="mx-auto">
      <button type='button' onClick={() => {
       toPDF().then(() => {
        setTimeout(() => {
         alert('Now attach the file you downloaded')
         window.location.href = `mailto:tmfbapplicationform@gmail.com?subject=My%20Account%20Form&body=''`;
         sessionStorage.clear()
         window.location.reload()
         navigate('/')
        }, 5000)
       })
      }}><GrDocumentPdf size={24} className='text-blue-600' /></button>
      <button type="button" className='back' onClick={() => setIsFillingForm(true)}>Make changes</button>
     </div>
    </div>
   }
  </div>
 )
}

export default DepositPage