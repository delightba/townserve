import React, { useRef, useState } from 'react'
import { GrDocumentPdf } from "react-icons/gr";
import { readFileAsDataURL } from '../../../Components/FormatDate';
import { useNavigate } from 'react-router-dom';
import BCFForm from './BCFForm';
import BCFPdf from './BCFPdf';
import { useReactToPrint } from 'react-to-print'
import InstructionPopUp from '../../../Components/InstructionPopUp';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";

const BCFPage = () => {
 const targetRef = useRef()
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
  relationship: '',
  guarantors: {
   first: '',
   second: ''
  },
  signature: '',
 })

 const fileName =`${details?.name}(BANK-CREDIT Form).pdf`

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

 const handleSubmit = () => {
  for (const key in details) {
   if (details[key] === '') {
    alert(`Please fill in all fields`);
    return;
   }
  }
  setIsFillingForm(false)
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

 const apiUrl = "https://townserve.itl.ng/api/auth/upload";

 const handlePrinting = async () => {
  try {
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
      sessionStorage.clear()
      navigate('/') 
    }
  } catch (error) {
    console.error('Error during print or upload process:', error);
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
   {isFillingForm && <BCFForm details={details} handleChange={handleChange} handleSubmit={handleSubmit} handleSignature={handleCustomerSignatureChange} handleSecurityAsset={handleSecurityAssetChange} handleGuarantor={handleGuarantorsChange} />}
   {!isFillingForm &&
    <div className="relative flex flex-col gap-3">
     <BCFPdf details={details} targetRef={targetRef} />
     <div className="mx-auto flex gap-3">
      <button type='button' onClick={handlePrint}>Download<GrDocumentPdf size={24} className='text-blue-600' /></button>
      <button type="button" className='back' onClick={() => setIsFillingForm(true)}>Make changes</button>
     </div>
    </div>
   }
  </div>
 )
}

export default BCFPage