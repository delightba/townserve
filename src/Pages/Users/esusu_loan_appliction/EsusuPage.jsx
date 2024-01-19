import React, { useState } from 'react'
import { usePDF, Margin } from 'react-to-pdf';
import { GrDocumentPdf } from "react-icons/gr";
import { readFileAsDataURL } from '../../../Components/FormatDate';
import { useNavigate } from 'react-router-dom';
import EsusuForm from './EsusuForm';
import EsusuPdf from './EsusuPdf';


const EsusuPage = () => {
  const navigate = useNavigate()
  const localStorageKey = 'EsusuPage';
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
    repayment: '',
    security_asset: {
      first: '',
      second: '',
      third: ''
    },
    tel: '',
    length_of_stay: '',
    business: '',
    business_length: '',
    marital_status: '',
    guarantor: {
      name: '',
      address: '',
      occupation: '',
      relationship_with_applicant: '',
      tel: '',
      passport_photo: "",
      signature: '',
    },
    signature: '',
    applicant_passport_photo: '',
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

  const handleCustomerPassportChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert the file to a data URL
      const dataUrl = await readFileAsDataURL(file);
      setDetails((prev) => ({
        ...prev,
        applicant_passport_photo: dataUrl,
      }));
      // Save the updated form data to localStorage
      saveFormDataToLocalStorage({
        ...details,
        applicant_passport_photo: dataUrl,
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

  const { toPDF, targetRef } = usePDF({ filename: `${details.name}.pdf` }, options);
  return (
    <div className="w-full md:w-[80%] mx-auto mt-8">
      {isFillingForm && <EsusuForm details={details} handleChange={handleChange} handleSubmit={handleSubmit} handleSignature={handleCustomerSignatureChange} handleSecurityAsset={handleSecurityAssetChange} handleGuarantor={handleGuarantorsChange} customerpassport={handleCustomerPassportChange} guarantorpassport={handleGuarantorPassportChange} guarantorsignature={handleGuarantorSignatureChange} />}
      {!isFillingForm &&
        <div className="relative flex flex-col gap-3">
          <EsusuPdf details={details} targetRef={targetRef} />
          <div className="mx-auto flex gap-3">
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
            }} ><GrDocumentPdf size={24} className='text-blue-600' /></button>
            <button type="button" className='back' onClick={() => setIsFillingForm(true)}>Make changes</button>
          </div>
        </div>
      }
    </div>
  )
}

export default EsusuPage