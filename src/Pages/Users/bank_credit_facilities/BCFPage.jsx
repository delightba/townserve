import React, { useState } from 'react'
import { usePDF, Margin } from 'react-to-pdf';
import { GrDocumentPdf } from "react-icons/gr";
import { readFileAsDataURL } from '../../../Components/FormatDate';
import { useNavigate } from 'react-router-dom';
import BCFForm from './BCFForm';
import BCFPdf from './BCFPdf';

const BCFPage = () => {
 const navigate = useNavigate()
 const localStorageKey = 'BCFPage';
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
  address: '',
  state: '',
  date: '',
  name: '',
  amount: '',
  purpose: '',
  tenure: '',
  pay_back_period: '',
  issuing_company: '',
  lpo_and_date: '',
  shares_held: '',
  shares_receipt_number: '',
  security_asset: {
   first: '',
   second: '',
   third: ''
  },
  applicant_name: '',
  applicant_address: '',
  tel: '',
  length_of_stay: '',
  state_of_origin: '',
  permanent_address: '',
  business: '',
  business_length: '',
  marital_status: '',
  nok: '',
  nok_address: '',
  relationsip: '',
  guarantors: {
   first: '',
   second: ''
  },
  signature: '',
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

 const handleSecurityAssetChange = (e) => {
  const { name, value } = e.target;
  const uppercaseValue = value.toUpperCase()
  setDetails((prevDetails) => ({
   ...prevDetails,
   security_asset: {
    ...prevDetails.security_asset,
    [name]: uppercaseValue
   }
  }));
  saveFormDataToLocalStorage({
   ...details,
   security_asset: { ...details.security_asset, [name]: uppercaseValue },
  })
 };

 const handleGuarantorsChange = (e) => {
  const { name, value } = e.target;
  const uppercaseValue = value.toUpperCase()

  setDetails((prevDetails) => ({
   ...prevDetails,
   guarantors: {
    ...prevDetails.guarantors,
    [name]: uppercaseValue
   }
  }));
  saveFormDataToLocalStorage({
   ...details,
   guarantors: {
    ...details.guarantors,
    [name]: uppercaseValue
   }
  })
 };

 const { toPDF, targetRef } = usePDF({ filename: `${details.name}.pdf` }, options);
 return (
  <div className="w-full md:w-[80%] mx-auto mt-8">
   {isFillingForm && <BCFForm details={details} handleChange={handleChange} handleSubmit={handleSubmit} handleSignature={handleCustomerSignatureChange} handleSecurityAsset={handleSecurityAssetChange} handleGuarantor={handleGuarantorsChange} />}
   {!isFillingForm &&
    <div className="relative flex flex-col gap-3">
     <BCFPdf details={details} targetRef={targetRef} />
     <div className="mx-auto">
      <button type='button' onClick={() => {
       toPDF().then(() => {
        setTimeout(() => {
         navigate('/')
        }, 5000)
       })
      }} className="next"><GrDocumentPdf /></button>
     </div>
    </div>
   }
  </div>
 )
}

export default BCFPage