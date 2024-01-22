import React, { useState } from 'react'
import { usePDF, Margin } from 'react-to-pdf';
import { GrDocumentPdf } from "react-icons/gr";
import { readFileAsDataURL } from '../../../Components/FormatDate';
import { useNavigate } from 'react-router-dom';
import GUAForm from './GUAForm';
import GUAPdf from './GUAPdf';



const GUAPage = () => {
 const navigate = useNavigate()
 const localStorageKey = 'GUAPage';
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
  tel: '',
  nationality:'',
  guarantor: {
   name: '',
   address: '',
   occupation: '',
   place_of_work: '',
   name_of_bank: '',
   address_of_bank: '',
   account_number: '',
   permanent_address: '',
   relationship_with_applicant: '',
   tel: '',
   passport_photo: "",
   signature: '',
  }
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

 const handleSubmit = () => {
  console.log(details)
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
   margin: Margin.MEDIUM,
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

 const handleGuarantorsChange = (e) => {
  const { name, value } = e.target;
  const uppercaseValue = value.toUpperCase()

  setDetails((prevDetails) => ({
   ...prevDetails,
   guarantor: {
    ...prevDetails.guarantor,
    [name]: uppercaseValue
   }
  }));
  saveFormDataToLocalStorage({
   guarantor: {
    ...details.guarantor,
    [name]: uppercaseValue
   }
  })
 };

 const handleGuarantorPassportChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
   // Convert the file to a data URL
   const dataUrl = await readFileAsDataURL(file);
   setDetails((prev) => ({
    ...prev,
    guarantor: {
     ...prev.guarantor,
     passport_photo: dataUrl
    }
   }));
   // Save the updated form data to localStorage
   saveFormDataToLocalStorage({
    guarantor: {
     ...details.guarantor,
     passport_photo: dataUrl
    }
   });
  }
 };
 const handleGuarantorSignatureChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
   // Convert the file to a data URL
   const dataUrl = await readFileAsDataURL(file);
   setDetails((prev) => ({
    ...prev,
    guarantor: {
     ...prev.guarantor,
     signature: dataUrl
    }
   }));
   // Save the updated form data to localStorage
   saveFormDataToLocalStorage({
    guarantor: {
     ...details.guarantor,
     signature: dataUrl
    }
   });
  }
 };

 const { toPDF, targetRef } = usePDF({ filename: `${details.name} guarantor.pdf` }, options);
 return (
  <div className="w-full md:w-[80%] mx-auto mt-8">
   {isFillingForm && <GUAForm details={details} handleChange={handleChange} handleSubmit={handleSubmit} handleGuarantor={handleGuarantorsChange} guarantorpassport={handleGuarantorPassportChange} guarantorsignature={handleGuarantorSignatureChange} />}
   {!isFillingForm &&
    <div className="relative flex flex-col gap-3">
     <GUAPdf details={details} targetRef={targetRef} />
     <div className="mx-auto flex gap-3">
      <button type='button' onClick={() => {
       toPDF().then(() => {
        setTimeout(() => {
         alert('Now attach the file you downloaded')
         window.location.href = `mailto:tmfbapplicationform@gmail.com?subject=My%20Guarantor%20Form&body=''`;
         sessionStorage.clear()
         window.location.reload()
         navigate('/')
        }, 5000)
       })
      }} ><GrDocumentPdf size={24} className='text-blue-600' /></button>
      <button type="button" className='back' onClick={() => setIsFillingForm(true)}>Make changes</button>
     </div>
    </div>
   }
  </div>
 )
}

export default GUAPage