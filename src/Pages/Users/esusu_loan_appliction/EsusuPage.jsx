import React, { useRef, useState } from 'react';
import { GrDocumentPdf } from "react-icons/gr";
import { readFileAsDataURL } from '../../../Components/FormatDate';
import { useNavigate } from 'react-router-dom';
import EsusuForm from './EsusuForm';
import EsusuPdf from './EsusuPdf';
import { useReactToPrint } from 'react-to-print';
import InstructionPopUp from '../../../Components/InstructionPopUp';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import Loading from '../../../Components/Loading';
import ProceedModal from '../../../ProceedModal';

const EsusuPage = () => {
  const targetRef = useRef();
  const navigate = useNavigate();
  const localStorageKey = 'EsusuPage';
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isFillingForm, setIsFillingForm] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  // Initial form state
  const initialFormState = {
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
  };

  const [details, setDetails] = useState(() => {
    const storedFormData = sessionStorage.getItem(localStorageKey);
    return storedFormData ? JSON.parse(storedFormData) : initialFormState;
  });

  const fileName = `${details?.name || 'Esusu'}(ESUSU Form).pdf`;
  const apiUrl = "https://townserve.itl.ng/api/auth/upload";

  const saveFormDataToLocalStorage = (formData) => {
    sessionStorage.setItem(localStorageKey, JSON.stringify(formData));
  };

  const closeModal = () => setIsOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();

    setDetails(prev => {
      const newDetails = {
        ...prev,
        [name]: uppercaseValue
      };
      saveFormDataToLocalStorage(newDetails);
      return newDetails;
    });
  };

  const handleFileUpload = async (e, field, nestedField = null) => {
    const file = e.target.files[0];
    if (file) {
      const dataUrl = await readFileAsDataURL(file);
      if (nestedField) {
        setDetails(prev => {
          const newDetails = {
            ...prev,
            [nestedField]: {
              ...prev[nestedField],
              [field]: dataUrl
            }
          };
          saveFormDataToLocalStorage(newDetails);
          return newDetails;
        });
      } else {
        setDetails(prev => {
          const newDetails = {
            ...prev,
            [field]: dataUrl
          };
          saveFormDataToLocalStorage(newDetails);
          return newDetails;
        });
      }
    }
  };

  const handleSecurityAssetChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    
    setDetails(prev => {
      const newDetails = {
        ...prev,
        security_asset: {
          ...prev.security_asset,
          [name]: uppercaseValue
        }
      };
      saveFormDataToLocalStorage(newDetails);
      return newDetails;
    });
  };

  const handleGuarantorsChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();

    setDetails(prev => {
      const newDetails = {
        ...prev,
        guarantor: {
          ...prev.guarantor,
          [name]: uppercaseValue
        }
      };
      saveFormDataToLocalStorage(newDetails);
      return newDetails;
    });
  };

  const handleSubmit = () => {
    // Required fields validation
    const requiredFields = [
      'address', 'state', 'date', 'name', 'amount', 'purpose', 
      'tenure', 'repayment', 'tel', 'length_of_stay', 'business',
      'business_length', 'marital_status', 'signature', 'applicant_passport_photo'
    ];

    const missingFields = requiredFields.filter(field => !details[field]);
    
    // Guarantor required fields
    const guarantorRequiredFields = [
      'name', 'address', 'occupation', 
      'relationship_with_applicant', 'tel', 'passport_photo', 'signature'
    ];
    
    const missingGuarantorFields = guarantorRequiredFields.filter(
      field => !details.guarantor[field]
    );

    // Security assets validation
    const securityAssetsFilled = Object.values(details.security_asset).some(
      value => value.trim() !== ''
    );

    if (missingFields.length > 0 || missingGuarantorFields.length > 0 || !securityAssetsFilled) {
      alert('Please fill in all required fields');
      return;
    }

    setIsFillingForm(false);
    setShowModal(true);
  };

  const handlePrinting = async () => {
    try {
      setIsUploading(true);
      const input = targetRef.current;
      if (!input) throw new Error('Form reference not found');

      // Create a new PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      // Calculate the PDF dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const margin = 10; // 10mm margin on all sides
      const contentWidth = pdfWidth - 2 * margin;
      const contentHeight = pdfHeight - 2 * margin;

      // Capture the form as an image
      const canvas = await html2canvas(input, {
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
        scrollX: 0,
        scrollY: 0,
        windowWidth: input.scrollWidth,
        windowHeight: input.scrollHeight
      });

      // Calculate aspect ratio
      const imgRatio = canvas.height / canvas.width;
      let imgWidth = contentWidth;
      let imgHeight = imgWidth * imgRatio;

      // If image is too tall, scale it down
      if (imgHeight > contentHeight) {
        const scaleFactor = contentHeight / imgHeight;
        imgWidth *= scaleFactor;
        imgHeight = contentHeight;
      }

      // Calculate position to center the image
      const xPos = (pdfWidth - imgWidth) / 2;
      const yPos = (pdfHeight - imgHeight) / 2;

      // Add the image to the PDF
      pdf.addImage(canvas, 'JPEG', xPos, yPos, imgWidth, imgHeight);

      // Generate PDF as Blob
      const pdfBlob = pdf.output('blob');

      // Prepare form data for upload
      const formData = new FormData();
      formData.append('pdf_file', pdfBlob, fileName);

      // Upload to server
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000
      });

      if (response.status === 200) {
        setShowSuccess(true);
        sessionStorage.clear();
      } else {
        throw new Error(`Server error: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error during PDF generation or upload:', error);
      alert(`Error: ${error.message || 'Failed to generate or upload PDF'}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
    documentTitle: fileName,
    onAfterPrint: handlePrinting
  });

  const handleBackToForm = () => {
    setIsFillingForm(true);
    setShowModal(false);
  };

  return (
    <div className="w-full md:w-[80%] mx-auto mt-8">
      {isOpen && <InstructionPopUp closeModal={closeModal} />}
      {isUploading && <Loading />}

      {isFillingForm ? (
        <EsusuForm 
          details={details}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleSignature={(e) => handleFileUpload(e, 'signature')}
          handleSecurityAsset={handleSecurityAssetChange}
          handleGuarantor={handleGuarantorsChange}
          customerpassport={(e) => handleFileUpload(e, 'applicant_passport_photo')}
          guarantorpassport={(e) => handleFileUpload(e, 'passport_photo', 'guarantor')}
          guarantorsignature={(e) => handleFileUpload(e, 'signature', 'guarantor')}
        />
      ) : (
        <div className="relative">
          {/* PDF container with exact A4 dimensions */}
          <div 
            ref={targetRef}
            className="bg-white p-6 mx-auto shadow-md"
            style={{
              width: '210mm',
              minHeight: '297mm',
              boxSizing: 'border-box'
            }}
          >
            <EsusuPdf details={details} />
          </div>

          {/* Action buttons */}
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={handleBackToForm}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Back to Edit
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2"
            >
              <GrDocumentPdf /> Download PDF
            </button>
          </div>

          {/* Download confirmation modal */}
          {showModal && (
            <ProceedModal 
              handleDownload={handlePrint}
              closeModal={() => setShowModal(false)}
            />
          )}
        </div>
      )}

      {/* Success modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
            <p className="mb-6">Your ESUSU form has been successfully submitted.</p>
            <button
              onClick={() => {
                setShowSuccess(false);
                navigate('/');
              }}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Return to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EsusuPage;