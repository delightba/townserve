import React, { useRef, useState } from 'react'
import DepositForm from './DepositForm'
import DepositPdf from './DepositPdf'
import { GrDocumentPdf } from "react-icons/gr";
import { readFileAsDataURL } from '../../../Components/FormatDate';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print'
import InstructionPopUp from '../../../Components/InstructionPopUp';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import Loading from '../../../Components/Loading';

const DepositPage = () => {
  const navigate = useNavigate()
  const targetRef = useRef()
  const localStorageKey = 'DepositPage';
  
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

  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const fileName = `${details?.name || 'bank-deposit'}(BANK-DEPOSIT Form).pdf`
  const apiUrl = "https://townserve.itl.ng/api/auth/upload";

  const [isOpen, setIsOpen] = useState(true)
  const closeModal = () => {
    setIsOpen(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase()

    const updatedDetails = {
      ...details,
      [name]: uppercaseValue
    }

    setDetails(updatedDetails)
    saveFormDataToLocalStorage(updatedDetails)
  }

  const handleCustomerSignatureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const dataUrl = await readFileAsDataURL(file);
        const updatedDetails = {
          ...details,
          signature: dataUrl,
        };
        setDetails(updatedDetails);
        saveFormDataToLocalStorage(updatedDetails);
      } catch (err) {
        setError('Failed to upload signature');
      }
    }
  };

  const handleEvidenceChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const dataUrl = await readFileAsDataURL(file);
        const updatedDetails = {
          ...details,
          evidence: dataUrl,
        };
        setDetails(updatedDetails);
        saveFormDataToLocalStorage(updatedDetails);
      } catch (err) {
        setError('Failed to upload evidence');
      }
    }
  };

  const handleSubmit = () => {
    const requiredFields = [
      'date', 'name', 'name_of_investors', 'type_of_investment',
      'amount_to_invest', 'interest_rate', 'duration', 'commencement_date',
      'maturity_date', 'bank_name', 'account_number', 'signature'
    ];

    const missingFields = requiredFields.filter(field => !details[field]);

    if (missingFields.length > 0) {
      setError(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }
    setIsFillingForm(false)
    setError(null);
  }

  const handlePrinting = async () => {
    try {
      setIsUploading(true)
      const input = targetRef.current;
      if (!input) throw new Error('Target reference is not defined.');

      const canvas = await html2canvas(input, {
        scale: 0.8,
        quality: 0.7
      });
      const imgData = canvas.toDataURL('image/jpeg', 0.7);

      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height / canvas.width) * imgWidth;

      let yPos = 0;
      let page = 1;
      while (yPos < canvas.height) {
        if (page > 1) {
          pdf.addPage();
        }
        pdf.addImage(imgData, 'JPEG', 0, -yPos, imgWidth, imgHeight);
        yPos += pdf.internal.pageSize.getHeight();
        page++;
      }

      const pdfBlob = pdf.output('blob');
      if (pdfBlob.size > 2 * 1024 * 1024) {
        throw new Error('PDF size exceeds 2MB limit');
      }

      const formData = new FormData();
      formData.append('pdf_file', pdfBlob, fileName);

      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        maxContentLength: 2 * 1024 * 1024,
        maxBodyLength: 2 * 1024 * 1024
      });

      if (response.status !== 200) {
        throw new Error(`Server error: ${response.statusText}`);
      }
      
      setIsUploading(false)
      sessionStorage.clear()
      navigate('/') 
    } catch (error) {
      console.error('Error:', error);
      setError(error.message || 'Failed to process document');
    } finally {
      setIsUploading(false)
    }
  };

  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
    documentTitle: details?.name || 'bank-deposit',
    onAfterPrint: handlePrinting
  })

  return (
    <div className="w-full md:w-[80%] mx-auto mt-8">
      {isOpen && <InstructionPopUp closeModal={closeModal} />}
      {isUploading && <Loading />}
      {error && <div className="text-red-500 mb-4 p-2">{error}</div>}
      
      {isFillingForm ? (
        <DepositForm 
          details={details} 
          handleChange={handleChange} 
          handleSubmit={handleSubmit} 
          handleSignature={handleCustomerSignatureChange} 
          handleEvidence={handleEvidenceChange} 
        />
      ) : (
        <div className="relative flex flex-col gap-3">
          <DepositPdf details={details} targetRef={targetRef} />
          <div className="mx-auto flex gap-4">
            <button 
              type='button' 
              onClick={handlePrint}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800"
            >
              <GrDocumentPdf size={24} />
              <span>Save PDF</span>
            </button>
            <button 
              type="button" 
              onClick={() => setIsFillingForm(true)}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Make changes
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DepositPage