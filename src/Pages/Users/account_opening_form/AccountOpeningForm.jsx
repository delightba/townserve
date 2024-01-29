import Home from './Home';
import Download from './Download';
import ProceedModal from '../../../ProceedModal'
import React, { useRef, useState } from "react";
import { useReactToPrint } from 'react-to-print'
import { useNavigate } from "react-router-dom";


function AccountOpeningForm() {
  const targetRef = useRef()
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)
  const name = sessionStorage.getItem('TM001FormData')
  const parsed = JSON.parse(name)

  const handlePrint = useReactToPrint({
    content: () => targetRef.current,
    documentTitle: `${parsed?.fullname}`,
    onAfterPrint: () => {
      setTimeout(() => {
        alert('Now attach the file you downloaded')
        window.location.href = `mailto:tmfbapplicationform@gmail.com?subject=My%20Account%20Form&body='Attached to this mail is my ACCOUNT OPENING Form, kindly treat as urgent. Thank you.'`;
        sessionStorage.clear()
        window.location.reload()
        navigate('/')
      }, 200)
    }
  })

  return (
    <div>
      <Home pdf={() => setShowModal(true)} />
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
