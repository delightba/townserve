import { usePDF, Margin } from "react-to-pdf";
import Home from './Home';
import Download from './Download';
import ProceedModal from '../../../ProceedModal'
import React, { useState } from "react";



function AccountOpeningForm() {
  const [showModal, setShowModal] = useState(false)
  const name = sessionStorage.getItem('TM001FormData')
  const parsed = JSON.parse(name)
  const options = {
    page: {
      margin: Margin.MEDIUM,
    },
    overrides: {
      pdf: {
        compress: true
      },
      canvas: {
        useCORS: true
      }
    }
  }
  const { toPDF, targetRef } = usePDF({
    method: "save",
    filename: `${parsed?.fullname || 'myform'}.pdf`, options
  });


  const handleCreateAccount = () => {
    toPDF().then(() => {
      setTimeout(() => {
        alert('Now attach the file you downloaded')
        window.location.href = `mailto:tmfbapplicationform@gmail.com?subject=My%20Account%20Form&body=I%20${parsed?.fullname}%20wants%20an%20with%20your%20bank`;
        sessionStorage.clear()
        window.location.reload()
      }, 5000)
    }).catch((error) => console.log(error))
  }


  return (
    <div>
      <Home pdf={() => setShowModal(true)} />
      {
        showModal &&
        <>
          <ProceedModal handleDownload={handleCreateAccount} closeModal={() => setShowModal(false)} />
          <Download targetRef={targetRef} />
        </>
      }
    </div>
  );
}

export default AccountOpeningForm;
