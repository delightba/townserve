import React, { useRef, useState } from 'react'
import OfferInvestmentLetter from './OfferInvestmentLetter';
import OfferForm from './OfferForm'
import { readFileAsDataURL } from '../../Components/FormatDate';
import { GrDocumentPdf } from "react-icons/gr";
// import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print'
import InstructionPopUp from '../../Components/InstructionPopUp';





const OfferInvestment = () => {
  const targetRef = useRef()
  // const navigate = useNavigate()
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

  const [isOpen, setIsOpen] = useState(true)
  const closeModal = () => {
    setIsOpen(false)
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
  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
    documentTitle: `${details?.name}`,
    onAfterPrint: () => {
      setTimeout(() => {
        alert('Now attach the file you downloaded')
        window.location.href = `mailto:tmfbapplicationform@gmail.com?subject=My%20Credit%20Application%20Form&body='Attached to this mail is OFFER INVESTMENT Form for ${details.name} , kindly treat as urgent. Thank you.'`;
        sessionStorage.clear()
        window.location.reload()
        // navigate('/')
      }, 200)
    }
  })
  return (
    <div className="w-full md:w-[80%] mx-auto mt-8">
      {isOpen && <InstructionPopUp closeModal={closeModal} />}
      {isFillingForm && <OfferForm details={details} handleChange={handleChange} handleSubmit={handleSubmit} handleSignature={handleCustomerSignatureChange} />}
      {!isFillingForm &&
        <div className="relative flex flex-col gap-3">
          <OfferInvestmentLetter details={details} targetRef={targetRef} />
          <div className="mx-auto flex gap-3">
            <button type='button' onClick={handlePrint}>Download<GrDocumentPdf size={24} className='text-blue-600' /></button>
            <button type="button" className='back' onClick={() => setIsFillingForm(true)}>Make changes</button>
          </div>
        </div>
      }
    </div>
  )
}

export default OfferInvestment