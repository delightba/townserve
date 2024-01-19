/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import CustomInput from '../../../Components/CustomInput';
import Logo from '../../../mainlogo.png'



const TM002 = () => {
 const sessionStorageKeyTM002Mandate = 'TM002FormDataMandate';
 const sessionStorageKeyTM002Mandates = 'TM002FormDataMandates';

 const loadFormDataFromSessionStorageTM002 = () => {
  const storedFormData = sessionStorage.getItem(sessionStorageKeyTM002Mandate);
  return storedFormData ? JSON.parse(storedFormData) : null;
 };

 const loadFormDataFromSessionStorageTM002Mandates = () => {
  const storedFormData = sessionStorage.getItem(sessionStorageKeyTM002Mandates);
  return storedFormData ? JSON.parse(storedFormData) : null;
 };

 const saveFormDataToSessionStorageTM002 = (formData) => {
  sessionStorage.setItem(sessionStorageKeyTM002Mandate, JSON.stringify(formData));
 };
 const saveFormDataToSessionStorageTM002Mandates = (formData) => {
  sessionStorage.setItem(sessionStorageKeyTM002Mandates, JSON.stringify(formData));
 };

 const [mandate, setMandate] = useState(loadFormDataFromSessionStorageTM002() || {
  branch: '',
  account_type: '',
  account_number: '',
  account_name: '',
  office_address: "",
  stamp: "",
  date: '',
  ao_initial: '',
  csu: ''
 })

 const [mandates, setMandates] = useState(loadFormDataFromSessionStorageTM002Mandates() || [
  {
   residential_address: '',
   telephone: '',
   dob: '',
   nok: { name: '', gsm: '', spouse_name: '', occupation: '', address: '' },
   mandate_details: { name: '', signature: '', cos: '', nin: '', moi: '', passport_photograph: '', bvn: '' },
  },
 ],)

 const handleInputChange = (index, field, value) => {
  const updatedMandates = [...mandates];

  if (index >= 0 && index < updatedMandates.length) {
   const uppercaseValue = value.toUpperCase();
   updatedMandates[index][field] = uppercaseValue;
   setMandates(updatedMandates);

   // Save the updated form data to sessionStorage
   saveFormDataToSessionStorageTM002Mandates(updatedMandates);
  }
 };

 const handleNokInputChange = (index, field, value) => {
  const updatedMandates = [...mandates];

  if (index >= 0 && index < updatedMandates.length && 'nok' in updatedMandates[index]) {
   const uppercaseValue = value.toUpperCase();
   updatedMandates[index].nok[field] = uppercaseValue;
   setMandates(updatedMandates);

   // Save the updated form data to sessionStorage
   saveFormDataToSessionStorageTM002Mandates(updatedMandates);
  }
 };

 const handleMandateDetailsInputChange = (index, field, value) => {
  const updatedMandates = [...mandates];

  if (index >= 0 && index < updatedMandates.length && 'mandate_details' in updatedMandates[index]) {
   const uppercaseValue = value.toUpperCase();
   updatedMandates[index].mandate_details[field] = uppercaseValue;
   setMandates(updatedMandates);

   // Save the updated form data to sessionStorage
   saveFormDataToSessionStorageTM002Mandates(updatedMandates);
  }
 };

 const handleFileUpload = (index, fileField, event) => {
  const updatedMandates = [...mandates];

  if (index >= 0 && index < updatedMandates.length && 'mandate_details' in updatedMandates[index]) {
   const file = event.target.files[0];

   if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
     updatedMandates[index].mandate_details[fileField] = reader.result;
     setMandates(updatedMandates);
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
   }
  }
 };

 const addMandate = () => {
  setMandates([...mandates, {
   residential_address: '',
   telephone: '',
   dob: '',
   nok: { name: '', gsm: '', spouse_name: '', occupation: '', address: '' },
   mandate_details: { name: '', signature: '', cos: '', nin: '', moi: '', passport_photograph: '', bvn: '' },
  }]);
 };

 const handleChange = (e) => {
  const { name, value } = e.target;
  const uppercaseValue = value.toUpperCase();
  setMandate((prev) => ({
   ...prev,
   [name]: uppercaseValue,
  }));
  // Save the updated form data to localStorage
  saveFormDataToSessionStorageTM002({
   ...mandate,
   [name]: uppercaseValue,
  });
 };

 const handleCheckboxChange = (e) => {
  const { name, checked } = e.target;

  setMandate((prev) => ({
   ...prev,
   [name]: checked,
  }));

  // Save the updated form data to sessionStorage
  saveFormDataToSessionStorageTM002({
   ...mandate,
   [name]: checked,
  });
 };


 return (
  <div className='px-4 py-8 w-full lg:max-w-[90%] mx-auto'>
   <div className='flex justify-between gap-3'>
    <div className=' w-full'>
     <p>TM 002</p>
     <h1 className='text-2xl font-bold text-green-600'>Account Signature/Mandate Card</h1>
    </div>
    <div className=' ml-auto'>
     <img src={Logo} alt="logo" className='w-[50%] ml-auto' />
    </div>
   </div>
   <section>
    <form>
     <article className='flex flex-col md:flex-row gap-2 my-1'>
      <CustomInput name={'branch'} type={'text'} value={mandate.branch} label={'Branch:'} handleChange={handleChange} />
      <CustomInput name={'account_type'} type={'text'} value={mandate.account_type} label={'Type of Account:'} handleChange={handleChange} />

     </article>
     <CustomInput name={'account_number'} type={'text'} value={mandate.account_number} label={'Account Number:'} handleChange={handleChange} />
     <CustomInput name={'account_name'} type={'text'} value={mandate.account_name} label={'Account Name:'} handleChange={handleChange} />
     <CustomInput name={'office_address'} type={'text'} value={mandate.office_address} label={'Office Address:'} handleChange={handleChange} />

     <section className='mt-8 '>
      {
       mandates.map((mandate, index) => {
        return (
         <div key={index} className='mt-4'>
          <h1 className='text-lg font-bold'>Mandate {index + 1}</h1>
          <CustomInput
           name={'residential_address'}
           type={'text'}
           value={mandate.residential_address}
           label={'Residential Address:'}
           handleChange={(e) => handleInputChange(index, 'residential_address', e.target.value)}
          />
          <CustomInput
           name={'telephone'}
           type={'tel'}
           value={mandate.telephone}
           label={'Telephone:'}
           handleChange={(e) => handleInputChange(index, 'telephone', e.target.value)}
          />
          <CustomInput
           name={'dob'}
           type={'text'}
           value={mandate.dob}
           label={'Date of Birth:'}
           handleChange={(e) => handleInputChange(index, 'dob', e.target.value)}
          />
          <h3 className='my-4'>Next of Kin</h3>
          <article className='flex flex-col md:flex-row gap-2 my-1'>
           <CustomInput
            name={'name'}
            type={'text'}
            value={mandate.nok.name}
            label={'Next of Kin Name:'}
            handleChange={(e) => handleNokInputChange(index, 'name', e.target.value)}
           />
           <CustomInput
            name={'gsm'}
            type={'text'}
            value={mandate.nok.gsm}
            label={'GSM'}
            handleChange={(e) => handleNokInputChange(index, 'gsm', e.target.value)}
           />
          </article>
          <article className='flex flex-col md:flex-row gap-2 my-1'>
           <CustomInput
            name={'spouse_name'}
            type={'text'}
            value={mandate.nok.spouse_name}
            label={'Spouse Name:'}
            handleChange={(e) => handleNokInputChange(index, 'spouse_name', e.target.value)}
           />
           <CustomInput
            name={'occupation'}
            type={'text'}
            value={mandate.nok.occupation}
            label={'Occupation:'}
            handleChange={(e) => handleNokInputChange(index, 'occupation', e.target.value)}
           />
          </article>
          <article className='flex flex-col md:flex-row gap-2 my-1'>
           <CustomInput
            name={'address'}
            type={'text'}
            value={mandate.nok.address}
            label={'Address:'}
            handleChange={(e) => handleNokInputChange(index, 'address', e.target.value)}
           />
           {/* Add any additional NOK fields as needed */}
          </article>
          <table className="tables my-6">
           <thead>
            <tr>
             <th className="py-2 px-4 border-b">Name(s)</th>
             <th className="py-2 px-4 border-b">Class of Signature</th>
             <th className="py-2 px-4 border-b">NIN</th>
             <th className="py-2 px-4 border-b">BVN</th>
            </tr>
           </thead>
           <tbody>
            <tr key={index}>
             <td className="border-b">
              <input
               type="text"
               value={mandate.mandate_details.name}
               onChange={(e) => handleMandateDetailsInputChange(index, 'name', e.target.value)}
               className="otherbank_input"
              />
             </td>
             <td className="border-b">
              <input
               type="text"
               value={mandate.mandate_details.cos}
               onChange={(e) => handleMandateDetailsInputChange(index, 'cos', e.target.value)}
               className="otherbank_input"
              />
             </td>
             <td className="border-b">
              <input
               type="text"
               value={mandate.mandate_details.nin}
               onChange={(e) => handleMandateDetailsInputChange(index, 'nin', e.target.value)}
               className="otherbank_input"
              />
             </td>
             <td className="border-b">
              <input
               type="text"
               value={mandate.mandate_details.bvn}
               onChange={(e) => handleMandateDetailsInputChange(index, 'bvn', e.target.value)}
               className="otherbank_input"
              />
             </td>
            </tr>
           </tbody>
          </table>
          <section className='mt-3 flex flex-col gap-3'>
           <div className="border-b">
            <h2>Signature</h2>
            {/* Input for image upload */}
            <input
             type="file"
             accept="image/*"
             onChange={(e) => handleFileUpload(index, 'signature', e)}
             className="hidden"
             id={`signatureInput${index}`}
            />
            {/* Display area for the image */}
            <label htmlFor={`signatureInput${index}`} className="relative block cursor-pointer">
             {mandate.mandate_details.signature && (
              <img
               src={mandate.mandate_details.signature}
               alt="Signature"
               className="w-[200px] h-[100px] object-contain"
              />
             )}
             {!mandate.mandate_details.signature && (
              <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
               <span className="text-gray-500">Upload Signature</span>
              </div>
             )}
            </label>
           </div>

           <div className="border-b">
            <h1>Means of Identification</h1>
            {/* Input for image upload */}
            <input
             type="file"
             accept="image/*"
             onChange={(e) => handleFileUpload(index, 'moi', e)}
             className="hidden"
             id={`moiInput${index}`}
            />
            {/* Display area for the image */}
            <label htmlFor={`moiInput${index}`} className="relative block cursor-pointer">
             {mandate.mandate_details.moi && (
              <img
               src={mandate.mandate_details.moi}
               alt="Means of Identification"
               className="w-[200px] h-[100px] object-contain"
              />
             )}
             {!mandate.mandate_details.moi && (
              <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
               <span className="text-gray-500">Upload Means of Identification</span>
              </div>
             )}
            </label>
           </div>
           <div className="border-b">
            <h1>Passport Photograph</h1>
            {/* Input for image upload */}
            <input
             type="file"
             accept="image/*"
             onChange={(e) => handleFileUpload(index, 'passport_photograph', e)}
             className="hidden"
             id={`passportPhotographInput${index}`}
            />
            {/* Display area for the image */}
            <label htmlFor={`passportPhotographInput${index}`} className="relative block cursor-pointer">
             {mandate.mandate_details.passport_photograph && (
              <img
               src={mandate.mandate_details.passport_photograph}
               alt="Passport Photograph"
               className="w-[200px] h-[100px] object-contain"
              />
             )}
             {!mandate.mandate_details.passport_photograph && (
              <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
               <span className="text-gray-500">Upload Passport Photograph</span>
              </div>
             )}
            </label>
           </div>
          </section>
         </div>
        )
       })
      }
     </section>

     <button type="button" onClick={addMandate} className='next'>Add Mandate</button>

     <div>
      <article>
       {/* <CustomInput name={''} type={'text'} value={''} label={'GSM No:'} handleChange={''} /> */}
       <p>Stamp/Seal impression (if required)</p>
      </article>
      <div className='flex flex-col md:flex-row gap-2 my-3'>
       <CustomInput name={'stamp'} type={'checkbox'} value={mandate.stamp} label={'Stamp/Seal required:'} handleChange={handleCheckboxChange} />
       <CustomInput name={'ao_initial'} type={'checkbox'} value={mandate.ao_initial} label={'A/O initial/date:'} handleChange={handleCheckboxChange} />
      </div>
      <div className='flex flex-col md:flex-row gap-2 my-3'>
       <CustomInput name={'date'} type={'checkbox'} value={mandate.date} label={'Date A/C opened:'} handleChange={handleCheckboxChange} />
       <CustomInput name={'csu'} type={'checkbox'} value={mandate.csu} label={'CSU initial/date:'} handleChange={handleCheckboxChange} />
      </div>
     </div>
    </form>
   </section>
  </div>
 )
}

export default TM002