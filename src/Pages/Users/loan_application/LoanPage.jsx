import React, { useRef, useState } from 'react'
import { GrDocumentPdf } from "react-icons/gr";
import { useNavigate } from 'react-router-dom';
import { readFileAsDataURL } from '../../../Components/FormatDate';
import LoanForm from './LoanForm'
import LoanPdf from './LoanPdf'
import { useReactToPrint } from 'react-to-print'


const LoanPage = () => {
  const targetRef = useRef()
  const navigate = useNavigate()
  const localStorageKey = 'LoanPage';
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
    console.log(details)
  }

  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
    documentTitle: `${details?.name}`,
    onAfterPrint: () => {
      setTimeout(() => {
        alert('Now attach the file you downloaded')
        window.location.href = `mailto:tmfbapplicationform@gmail.com?subject=My%20Credit%20Application%20Form&body='Attached to this mail is my BANK/CREDIT APPLICATION Form, kindly treat as urgent. Thank you.'`;
        sessionStorage.clear()
        window.location.reload()
        navigate('/')
      }, 200)
    }
  })


  return (
    <div className="w-full md:w-[80%] mx-auto mt-8">
      {isFillingForm && <LoanForm details={details} handleChange={handleChange} handleSubmit={handleSubmit} handleSignature={handleCustomerSignatureChange} handleEvidence={handleEvidenceChange} />}
      {!isFillingForm &&
        <div className="relative flex flex-col gap-3">
          <LoanPdf details={details} targetRef={targetRef} />
          <div className="mx-auto">
            <button type='button' onClick={handlePrint} className="next"><GrDocumentPdf /></button>
          </div>
        </div>
      }
    </div>
  )
}

export default LoanPage