import { useState } from "react";
import { usePDF, Margin } from 'react-to-pdf';
import Form from "./Form";
import Letter from './Letter'
import { GrDocumentPdf } from "react-icons/gr";


function InvestmentNote() {
  const localStorageKey = 'investmentNote';
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
    state: '',
    amount: '',
    amount_in_words: '',
    rate: '',
    tenor: '',
    effective_date: '',
    maturity_date: '',
    repayment_date: '',
    value_at_maturity: '',
    value_at_maturity_words: '',
    type_of_investment: ''
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
      [name]: uppercaseValue
    })
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
  const { toPDF, targetRef } = usePDF({ filename: `${details.name}.pdf` }, options);
  return (
    <div className="w-full md:w-[80%] mx-auto mt-8">
      {isFillingForm && <Form details={details} handleChange={handleChange} handleSubmit={handleSubmit} />}
      {!isFillingForm &&
        <div className="relative flex flex-col gap-3">
          <Letter details={details} targetRef={targetRef} />
          <div className="mx-auto flex gap-3">
            <button type='button' onClick={() => {
              toPDF().then(() => {
                setTimeout(() => {
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
  );
}

export default InvestmentNote;
