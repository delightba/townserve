import Home from './Home';
import Download from './Download';
import ProceedModal from '../../../ProceedModal'
import React, { useRef, useState } from "react";
import { useReactToPrint } from 'react-to-print'
import { useNavigate } from "react-router-dom";
import InstructionPopUp from '../../../Components/InstructionPopUp';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import axios from "axios";
import Loading from '../../../Components/Loading';

function AccountOpeningForm() {
  const targetRef = useRef()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const name = sessionStorage.getItem('TM001FormData')
  const parsed = JSON.parse(name)

  const fileName =`${parsed?.fullname}(ACCOUNT-OPENING Form).pdf`

  const [isOpen, setIsOpen] = useState(true)
  const closeModal = () => {
    setIsOpen(false)
  }

  const [isUploading, setIsUploading] = useState(false);

  const apiUrl = "https://townserve.itl.ng/api/auth/upload";

  const handlePrinting = async () => {
    try {
      setIsUploading(true)
      const input = targetRef.current;
      if (!input) throw new Error('Target reference is not defined.');

      // Capture the content of the element as a canvas
      const canvas = await html2canvas(input);

      // Compress to JPEG and lower quality to reduce file size
      const imgData = canvas.toDataURL('image/jpeg', 0.6); // 60% quality

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
        pdf.addImage(imgData, 'JPEG', 0, -yPos, imgWidth, imgHeight, '', 'FAST');
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
        timeout: 20000 // 20 seconds timeout
      });

      if (response.status !== 200) {
        throw new Error(`Server error: ${response.statusText}`);
      } else {
        setIsUploading(false)
        setShowSuccess(true)
        sessionStorage.clear()
      }
    } catch (error) {
      console.error('Error during print or upload process:', error);
      alert('Upload failed: ' + (error?.message || error));
      setIsUploading(false)
    }
  };

  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
    documentTitle: `${parsed?.fullname}`,
    onAfterPrint: handlePrinting
  })

  return (
    <div>
      <Home pdf={() => setShowModal(true)} />
      {isOpen && <InstructionPopUp closeModal={closeModal} />}
      {isUploading && <Loading />}
      {
        showModal &&
        <>
          <ProceedModal handleDownload={handlePrint} closeModal={() => setShowModal(false)} />
          <Download targetRef={targetRef} />
        </>
      }
      {showSuccess && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            padding: '2rem',
            borderRadius: '8px',
            textAlign: 'center',
            minWidth: '300px'
          }}>
            <h2 style={{ color: 'green', marginBottom: '1rem' }}>Upload Successful!</h2>
            <p>Your form has been uploaded successfully.</p>
            <button
              style={{
                marginTop: '1.5rem',
                padding: '0.5rem 1.5rem',
                background: '#16a34a',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={() => {
                setShowSuccess(false);
                navigate('/');
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountOpeningForm;