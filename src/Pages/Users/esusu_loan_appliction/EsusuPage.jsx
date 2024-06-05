import React, { useRef, useState } from 'react'
import { GrDocumentPdf } from "react-icons/gr";
import { readFileAsDataURL } from '../../../Components/FormatDate';
import { useNavigate } from 'react-router-dom';
import EsusuForm from './EsusuForm';
import EsusuPdf from './EsusuPdf';
import { useReactToPrint } from 'react-to-print'
import InstructionPopUp from '../../../Components/InstructionPopUp';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import Loading from '../../../Components/Loading';

const EsusuPage = () => {
  const targetRef = useRef()
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
  const [isUploading, setIsUploading] = useState(false);

  const fileName =`${details?.name}(ESUSU Form).pdf`

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
      {isFillingForm && <EsusuForm details={details} handleChange={handleChange} handleSubmit={handleSubmit} handleSignature={handleCustomerSignatureChange} handleSecurityAsset={handleSecurityAssetChange} handleGuarantor={handleGuarantorsChange} customerpassport={handleCustomerPassportChange} guarantorpassport={handleGuarantorPassportChange} guarantorsignature={handleGuarantorSignatureChange} />}
      {!isFillingForm &&
        <div className="relative flex flex-col gap-3">
          <EsusuPdf details={details} targetRef={targetRef} />
          <div className="mx-auto flex gap-3">
            <button type='button' onClick={handlePrint} >Download<GrDocumentPdf size={24} className='text-blue-600' /></button>
            <button type="button" className='back' onClick={() => setIsFillingForm(true)}>Make changes</button>
          </div>
        </div>
      }
    </div>
  )
}

export default EsusuPage