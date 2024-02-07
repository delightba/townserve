import React, { useState } from 'react';
import Form from '../images/form.png'
import Submit from '../images/submit.png'
import Download from '../images/download.png'
import Save from '../images/save.png'
import Alert from '../images/alert.png'
import Mail from '../images/mail.png'
import Send from '../images/send.png'

const InstructionPopUp = ({ closeModal }) => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 7));
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };


  const handleNext = () => {
    if (currentStep === 7) {
      closeModal()
    } else {
      nextStep()
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h1 className='font-bold text-xl text-asparagus-400'>Step 1</h1>
            <figure className='h-[70%]'>
              <img src={Form} alt="just a form" className='w-full' />
            </figure>
          </div>
        );
      case 2:
        return (
          <div>
            <h1 className='font-bold text-lg text-asparagus-400'>Step 2</h1>
            <h2 className='font-semibold text-center'>Click the submit button</h2>
            <img src={Submit} alt="" />
          </div>
        );
      case 3:
        return (
          <div>
            <h1 className='font-bold text-xl text-asparagus-400'>Step 3</h1>
            <h2 className='font-semibold text-center'>Scroll to the bottom of the page, click Download PDF if done, or the MAKE CHANGES button if  you want to make changes.</h2>
            <img src={Download} alt="" />
          </div>
        );
      case 4:
        return (
          <div>
            <h1 className='font-bold text-xl text-asparagus-400'>Step 4</h1>
            <h2 className='font-semibold text-center'>A screen comes up after pressing the DOWNLOAD button, kindly press the SAVE button.</h2>
            <img src={Save} alt="" />
          </div>
        );
      case 5:
        return (
          <div>
            <h1 className='font-bold text-xl text-asparagus-400'>Step 5</h1>
            <h2 className='font-semibold text-center'>Click the OK button on the alert.</h2>
            <img src={Alert} alt="" />
          </div>
        );
      case 6:
        return (
          <div>
            <h1 className='font-bold text-xl text-asparagus-400'>Step 6</h1>
            <h2 className='font-semibold text-center'>Another alert comes up, which requests to open your mail, so you can send the file you downloaded, click OPEN MAIL</h2>
            <img src={Mail} alt="" />
          </div>
        );
      case 7:
        return (
          <div>
            <h1 className='font-bold text-xl text-asparagus-400'>Step 7</h1>
            <h2 className='font-semibold text-center'>When your default Mailer opens, attach the file you downloaded, and SEND</h2>
            <p className='font-medium text-center'>All you need is the file you saved, the receiver's mail is pre-written</p>
            <img src={Send} alt="" />
          </div>
        );
      // ... render other steps
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 w-full lg:h-full max-w-lg mx-[10px] overflow-y-scroll z-50">
        <h1 className='font-bold text-2xl text-center text-asparagus-600 py-3 underline'>Please complete the following</h1>
        {renderStep()}

        <div className="flex justify-between mt-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Previous
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white"
            onClick={handleNext}
          >
            {currentStep === 7 ? 'Finish' : 'Next'}
          </button>
        </div>

        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default InstructionPopUp;
