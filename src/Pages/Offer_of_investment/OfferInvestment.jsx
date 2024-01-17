import React, { useState } from 'react'
import { usePDF, Margin } from 'react-to-pdf';
import OfferInvestmentLetter from './OfferInvestmentLetter';
import OfferForm from './OfferForm'
import { readFileAsDataURL } from '../../Components/FormatDate';

const OfferInvestment = () => {
  const localStorageKey = 'offerInvestmentPage';
  // Function to load form data from localStorage
  const loadFormDataFromLocalStorage = () => {
    const storedFormData = sessionStorage.getItem(localStorageKey);
    return storedFormData ? JSON.parse(storedFormData) : null;
  };

  const saveFormDataToLocalStorage = (formData) => {
    sessionStorage.setItem(localStorageKey, JSON.stringify(formData));
  };
  const [details, setDetails] = useState(loadFormDataFromLocalStorage() || {
    date: '',
    name: '',
    address: '',
    local_government: '',
    state: '',
    product: '',
    tenor1: '',
    tenor2: '',
    interest1: '',
    interest2: '',
    principal_range1: '',
    principal_range2: '',
    signature: ''
  })
  const [isFillingForm, setIsFillingForm] = useState(true)
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase()

    setDetails((prev) => ({
      ...prev,
      [name]: uppercaseValue
    }))
    saveFormDataToLocalStorage({
      ...details,
      [name]: uppercaseValue,
    });
  }

  const handleSubmit = () => {
    for (const key in details) {
      if (details[key] === '') {
        alert(`Please fill in all fields`);
        return; // Stop the submission if any field is empty
      }
    }
    setIsFillingForm(false)
    console.log(details)
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
  const { toPDF, targetRef } = usePDF({ filename: `${details.name}.pdf` }, options);
  return (
    <div className="w-full md:w-[80%] mx-auto mt-8">
      {isFillingForm && <OfferForm details={details} handleChange={handleChange} handleSubmit={handleSubmit} handleSignature={handleCustomerSignatureChange} />}
      {!isFillingForm &&
        <div className="relative flex flex-col gap-3">
          <OfferInvestmentLetter details={details} targetRef={targetRef} />
          <div className="mx-auto">
            <button type='button' onClick={() => toPDF()} className="next">Download</button>
          </div>
        </div>
      }
    </div>
  )
}

export default OfferInvestment