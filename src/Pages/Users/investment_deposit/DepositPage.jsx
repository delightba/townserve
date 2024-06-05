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

 const [isUploading, setIsUploading] = useState(false);

 const fileName =`${details?.name}(BANK-DEPOSIT Form).pdf`

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

 const apiUrl = "https://townserve.itl.ng/api/auth/upload";

 const handlePrinting = async () => {
  try {
    setIsUploading(true)
    const input = targetRef.current;
    if (!input) throw new Error('Target reference is not defined.');

    // Capture the content of the element as a canvas
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');

    // Create a new PDF document with A4 size
    const pdf = new jsPDF('p', 'mm', 'a4');

    // Add the image to the PDF, maintaining aspect ratio
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight = (canvas.height / canvas.width) * imgWidth;

    // Set initial y position
    let yPos = 0;

    // Loop through the canvas and add content to PDF page by page
    let page = 1;
    while (yPos < canvas.height) {
      if (page > 1) {
        pdf.addPage();
      }
      pdf.addImage(imgData, 'PNG', 0, -yPos, imgWidth, imgHeight);
      yPos += pdf.internal.pageSize.getHeight();
      page++;
    }
    // Generate the PDF as a Blob
    const pdfBlob = pdf.output('blob');

    // Create a FormData object and append the Blob with a defined file name
    const formData = new FormData();
    formData.append('pdf_file', pdfBlob, fileName);

    // Send the FormData object to the server using Axios
    const response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status !== 200) {
      throw new Error(`Server error: ${response.statusText}`);
    } else{
      setIsUploading(false)
      sessionStorage.clear()
      navigate('/') 
    }
  } catch (error) {
    console.error('Error during print or upload process:', error);
  } finally{
    setIsUploading(false)
  }
};

 const handlePrint = useReactToPrint({
  content: () => targetRef.current,
  documentTitle: `${details?.name}`,
  onAfterPrint: handlePrinting
 })

 return (
  <div className="w-full md:w-[80%] mx-auto mt-8">
   {isOpen && <InstructionPopUp closeModal={closeModal} />}
   {isUploading && <Loading />}
   {isFillingForm && <DepositForm details={details} handleChange={handleChange} handleSubmit={handleSubmit} handleSignature={handleCustomerSignatureChange} handleEvidence={handleEvidenceChange} />}
   {!isFillingForm &&
    <div className="relative flex flex-col gap-3">
     <DepositPdf details={details} targetRef={targetRef} />
     <div className="mx-auto">
      <button type='button' onClick={handlePrint}><GrDocumentPdf size={24} className='text-blue-600' /></button>
      <button type="button" className='back' onClick={() => setIsFillingForm(true)}>Make changes</button>
     </div>
    </div>
   }
  </div >
 )
}

export default DepositPage