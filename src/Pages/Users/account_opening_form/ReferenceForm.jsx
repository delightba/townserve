/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import CustomInput from '../../../Components/CustomInput';
import Logo from '../../../mainlogo.png'


const ReferenceForm = () => {
  const sessionStorageKeyTM003 = 'TM003FormData';

  const loadFormDataFromSessionStorageTM003 = () => {
    const storedFormData = sessionStorage.getItem(sessionStorageKeyTM003);
    return storedFormData ? JSON.parse(storedFormData) : null;
  };

  const saveFormDataToSessionStorageTM003 = (formData) => {
    sessionStorage.setItem(sessionStorageKeyTM003, JSON.stringify(formData));
  };
  const [reference, setReference] = useState(loadFormDataFromSessionStorageTM003() || {
    applicant: '',
    time: '',
    bank_name: '',
    address: '',
    account_number: '',
    refree1: {
      name: '',
      address: '',
      date: '',
      signature: ''
    },
    refree2: {
      name: '',
      address: '',
      date: '',
      signature: ''
    }
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setReference((prev) => ({
      ...prev,
      [name]: uppercaseValue,
    }));
    // Save the updated form data to localStorage
    saveFormDataToSessionStorageTM003({
      ...reference,
      [name]: uppercaseValue,
    });
  };

  const handleRefree1Change = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setReference((prev) => ({
      ...prev,
      refree1: {
        ...prev.refree1,
        [name]: uppercaseValue,
      },
    }));

    // Save the entire form data to sessionStorage
    saveFormDataToSessionStorageTM003({
      ...reference,
      refree1: {
        ...reference.refree1,
        [name]: uppercaseValue,
      },
    });
  };

  const handleRefree2Change = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setReference((prev) => ({
      ...prev,
      refree2: {
        ...prev.refree2,
        [name]: uppercaseValue,
      },
    }));

    // Save the entire form data to sessionStorage
    saveFormDataToSessionStorageTM003({
      ...reference,
      refree2: {
        ...reference.refree2,
        [name]: uppercaseValue,
      },
    });
  };

  const handleRefree1ImageUpload = (fileField, file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setReference((prev) => ({
        ...prev,
        refree1: {
          ...prev.refree1,
          [fileField]: reader.result,
        },
      }));

      // Save the entire form data to sessionStorage
      saveFormDataToSessionStorageTM003({
        ...reference,
        refree1: {
          ...reference.refree1,
          [fileField]: reader.result,
        },
      });
    };

    // Read the file as a data URL
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleRefree2ImageUpload = (fileField, file) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      setReference((prev) => ({
        ...prev,
        refree2: {
          ...prev.refree2,
          [fileField]: reader.result,
        },
      }));

      // Save the entire form data to sessionStorage
      saveFormDataToSessionStorageTM003({
        ...reference,
        refree2: {
          ...reference.refree2,
          [fileField]: reader.result,
        },
      });
    };

    // Read the file as a data URL
    if (file) {
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className='px-4 py-8 w-full lg:max-w-[80%] mx-auto'>
      <div>
        <p>TM003</p>
        <div className=' ml-auto'>
          <img src={Logo} alt="logo" className='w-[30%] ml-auto' />
        </div>
      </div>
      <div>
        <h2 className='greenheader'>REFERECE FORM</h2>
        <p>To be completed by Referee</p> <br />

        <p className='font-bold'>Caution: It is dangerous to introduce any person(s) who is / are not well known to you.</p>
      </div>
      <section>
        <CustomInput label={'Name of applicant'} value={reference.applicant} handleChange={handleInputChange} name='applicant' type={'text'} />
        <CustomInput label={'I/We wish to confirm that I/We have known the above named individual(s)/company for a period of'} value={reference.time} handleChange={handleInputChange} name='time' type={'text'} />
        <p className='my-8'>He/She is well known to me/us and I/we consider him/her suitable to maintain a current account with the bank.</p>
        <div className='my-8'>
          <h2>I/We maintain a current account with:</h2>
          <form>
            <CustomInput label={'Name of Bank'} value={reference.bank_name} handleChange={handleInputChange} name='bank_name' type={'text'} />
            <CustomInput label={'Address'} value={reference.address} handleChange={ handleInputChange} name='address' type={'text'} />
            <CustomInput label={'Account Number'} value={reference.account_number} handleChange={handleInputChange} name='account_number' type={'text'} />

            <p>Yours faithfully,</p>
            <section className='flex flex-col gap-3 justify-evenly '>
              <h1 className='greenheader my-4'>Refrees</h1>
              <article className='flex flex-col gap-2 my-1'>
                <CustomInput name={'name'} type={'text'} value={reference.refree1.name} label={'Name:'} handleChange={handleRefree1Change} />
                <CustomInput name={'address'} type={'text'} value={reference.refree1.address} label={'Address:'} handleChange={handleRefree1Change} />
                <CustomInput name={'date'} type={'text'} value={reference.refree1.date} label={'Date:'} handleChange={handleRefree1Change} />
                <div className="border-b">
                  <h2>Signature</h2>
                  {/* Input for image upload */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleRefree1ImageUpload('signature', e.target.files[0])}
                    className="hidden"
                    id={`signatureInput1`}
                  />
                  {/* Display area for the image */}
                  <label htmlFor={`signatureInput1`} className="relative block cursor-pointer">
                    {reference.refree1.signature && (
                      <img
                        src={reference.refree1.signature}
                        alt="Signature"
                        className="w-[300px] h-[400px] object-contain"
                      />
                    )}
                    {!reference.refree1.signature && (
                      <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
                        <span className="text-gray-500">Upload Signature</span>
                      </div>
                    )}
                  </label>
                </div>

              </article>
              <article className='flex flex-col gap-2 my-1'>
                <CustomInput name={'name'} type={'text'} value={reference.refree2.name} label={'Name:'} handleChange={handleRefree2Change} />
                <CustomInput name={'address'} type={'text'} value={reference.refree2.address} label={'Address:'} handleChange={handleRefree2Change} />
                <CustomInput name={'date'} type={'text'} value={reference.refree2.date} label={'Date:'} handleChange={handleRefree2Change} />
                <div className="border-b">
                  <h2>Signature</h2>
                  {/* Input for image upload */}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleRefree2ImageUpload('signature', e.target.files[0])}
                    className="hidden"
                    id={`signatureInput2`}
                  />
                  {/* Display area for the image */}
                  <label htmlFor={`signatureInput2`} className="relative block cursor-pointer">
                    {reference.refree2.signature && (
                      <img
                        src={reference.refree2.signature}
                        alt="Signature"
                        className="w-[300px] h-[400px] object-contain"
                      />
                    )}
                    {!reference.refree2.signature && (
                      <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
                        <span className="text-gray-500">Upload Signature</span>
                      </div>
                    )}
                  </label>
                </div>
              </article>

            </section>

          </form>
        </div>
      </section>
    </div>
  )
}

export default ReferenceForm