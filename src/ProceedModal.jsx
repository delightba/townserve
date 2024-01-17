import React from 'react'

const ProceedModal = ({ handleDownload, closeModal }) => {
 return (

  <div className="fixed inset-0 z-50 flex items-center justify-center">
   <div className="absolute inset-0 bg-gray-800 opacity-75"></div>
   <div className="z-10 bg-white p-6 rounded-md shadow-md">
    <p className="mb-4">Are you sure you want to submit?</p>
    <div className="flex justify-end">
     <button
      onClick={handleDownload}
      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
     >
      Yes
     </button>
     <button
      onClick={closeModal}
      className="bg-gray-500 text-white px-4 py-2 rounded"
     >
      No
     </button>
    </div>
   </div>
  </div>
 )
}

export default ProceedModal