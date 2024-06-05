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
    </div>
  );
}

export default AccountOpeningForm;
