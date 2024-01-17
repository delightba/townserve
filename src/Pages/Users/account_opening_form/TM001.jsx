/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Logo from '../../../mainlogo.png'
import CustomInput from '../../../Components/CustomInput';
import { readFileAsDataURL } from '../../../Components/FormatDate';

const TM001 = () => {
  const localStorageKey = 'TM001FormData';
  // Function to load form data from localStorage
  const loadFormDataFromLocalStorage = () => {
    const storedFormData = sessionStorage.getItem(localStorageKey);
    return storedFormData ? JSON.parse(storedFormData) : null;
  };

  const saveFormDataToLocalStorage = (formData) => {
    sessionStorage.setItem(localStorageKey, JSON.stringify(formData));
  };

  const [form1, setForm1] = useState(loadFormDataFromLocalStorage() || {
    branch: '',
    account_type: '',
    fullname: '',
    company_name: '',
    dob: '',
    nationality: '',
    rc: {},
    office_address: '',
    residential_address: '',
    phone: '',
    occupation: '',
    email: '',
    current_employer: '',
    employer_address: '',
    position: '',
    length_of_employment: '',
    initial_deposit: '',
    other_banks: Array(2).fill({}),
    references: Array(2).fill({ name: '', bank: '', accountNo: '' }),
    other_accounts: Array(4).fill({ name: '', address: '', signature: '', telephone: '', email: '' }),
    membership: '',
    fax: '',
    customers_signature: '',
    date_of_registration: ''
  })

  const handleOtherAccountsChange = (index, fieldName, fieldValue) => {
    setForm1((prevForm) => {
      const updatedOtherAccounts = [...prevForm.other_accounts];

      // If the index doesn't exist, create a new object at that index
      if (!updatedOtherAccounts[index]) {
        updatedOtherAccounts[index] = {};
      }

      // Update the specified field in the object at the given index
      updatedOtherAccounts[index] = {
        ...updatedOtherAccounts[index],
        [fieldName]: fieldValue.toUpperCase(),
      };

      return {
        ...prevForm,
        other_accounts: updatedOtherAccounts,
      };
    });
    // Save the updated form data to localStorage
    saveFormDataToLocalStorage({
      ...form1,
      other_accounts: form1.other_accounts.map((item, i) =>
        i === index
          ? { ...item, [fieldName]: fieldValue.toUpperCase() }
          : item
      ),
    });
  };

  const handleChangeReferences = (index, fieldName, value) => {
    setForm1((prevForm) => {
      const updatedReferences = [...prevForm.references];

      if (!updatedReferences[index]) {
        updatedReferences[index] = {};
      }

      updatedReferences[index] = {
        ...updatedReferences[index],
        [fieldName]: value.toUpperCase(),  // Convert the value to uppercase
      };

      // Save the updated references to localStorage
      saveFormDataToLocalStorage({
        ...prevForm,
        references: updatedReferences,
      });

      return {
        ...prevForm,
        references: updatedReferences,
      };
    });
  };


  const handleChangeOtherBanks = (index, fieldName, value) => {
    setForm1((prevForm) => {
      const updatedOtherBanks = [...prevForm.other_banks];

      if (!updatedOtherBanks[index]) {
        updatedOtherBanks[index] = {};
      }

      updatedOtherBanks[index] = {
        ...updatedOtherBanks[index],
        [fieldName]: value.toUpperCase(),  // Convert the value to uppercase
      };

      // Save the updated other_banks to localStorage
      saveFormDataToLocalStorage({
        ...prevForm,
        other_banks: updatedOtherBanks,
      });

      return {
        ...prevForm,
        other_banks: updatedOtherBanks,
      };
    });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setForm1((prev) => ({
      ...prev,
      [name]: uppercaseValue,
    }));
    // Save the updated form data to localStorage
    saveFormDataToLocalStorage({
      ...form1,
      [name]: uppercaseValue,
    });
  };
  const handleRCChange = (e, fieldName) => {
    const { value } = e.target;
    setForm1((prev) => ({
      ...prev,
      rc: {
        ...prev.rc,
        [fieldName]: value.toUpperCase(),
      },
    }));
    saveFormDataToLocalStorage({
      ...form1,
      rc: {
        ...form1.rc,
        [fieldName]: value.toUpperCase(),
      },
    });
  };

  const handleImageChange = async (index, file) => {
    // Convert the file to a data URL
    const dataUrl = await readFileAsDataURL(file);

    setForm1((prevForm) => {
      const updatedOtherAccounts = [...prevForm.other_accounts];

      // If the index doesn't exist, create a new object at that index
      if (!updatedOtherAccounts[index]) {
        updatedOtherAccounts[index] = {};
      }

      // Update the signature field in the object at the given index
      updatedOtherAccounts[index] = {
        ...updatedOtherAccounts[index],
        signature: dataUrl,
      };

      // Save the updated form data to localStorage
      saveFormDataToLocalStorage({
        ...prevForm,
        other_accounts: updatedOtherAccounts,
      });

      return {
        ...prevForm,
        other_accounts: updatedOtherAccounts,
      };
    });
  };

  // Function to read a file as a data URL
  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  const handleCustomerSignatureChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Convert the file to a data URL
      const dataUrl = await readFileAsDataURL(file);
      setForm1((prevForm) => ({
        ...prevForm,
        customers_signature: dataUrl,
      }));
      // Save the updated form data to localStorage
      saveFormDataToLocalStorage({
        ...form1,
        customers_signature: dataUrl,
      });
    }
  };




  return (
    <main className='px-4 py-8'>
      <div>
        <p className='font-bold'>TM 001</p>
        <div className='mb-4'>
          <img src={Logo} alt="logo" className='mx-auto w-[25%]' />
        </div>
        <section>
          <h2 className='greenheader'>APPLICATION FOR OPENING PERSONAL/JOINT, CORPORATE, CLUB/ASS. ACCOUNT</h2>
          <article className='flex flex-col md:flex-row gap-2 my-1'>
            <CustomInput name={'branch'} type={'text'} value={form1.branch} label={'BRANCH:'} handleChange={handleChange} />
            <CustomInput name={'account_type'} type={'text'} value={form1.account_type} label={'TYPE OF ACCOUNT:'} handleChange={handleChange} />
          </article>
          <CustomInput name={'fullname'} type={'text'} value={form1.fullname} label={'NAME:'} handleChange={handleChange} />
          <CustomInput name={'company_name'} type={'text'} value={form1.company_name} label={'COMPANY NAME:'} handleChange={handleChange} />
          <article className='flex flex-col md:flex-row gap-2 my-1'>
            <CustomInput name={'dob'} type={'text'} value={form1.dob} label={'DATE OF BIRTH/REGISTRATION:'} handleChange={handleChange} />
            <CustomInput name={'nationality'} type={'text'} value={form1.nationality} label={'NATIONALITY:'} handleChange={handleChange} />
          </article>
          <table className="tables mt-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">RC NUMBER</th>
                <th className="py-2 px-4 border-b">MAILING ADDRESS</th>
                <th className="py-2 px-4 border-b">ADDRESS ABROAD (with Box No, if any)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border-b">
                  <input
                    type="text"
                    value={form1.rc.rcNumber}
                    onChange={(e) => handleRCChange(e, 'rcNumber')}
                    className="w-full outline-none py-6 border-2 border-black indent-2"
                  />
                </td>
                <td className="border-b">
                  <input
                    type="text"
                    value={form1.rc.mailingAddress}
                    onChange={(e) => handleRCChange(e, 'mailingAddress')}
                    className="w-full outline-none py-6 border-2 border-black indent-2"
                  />
                </td>
                <td className="border-b">
                  <input
                    type="text"
                    value={form1.rc.addressAbroad}
                    onChange={(e) => handleRCChange(e, 'addressAbroad')}
                    className="w-full outline-none py-6 border-2 border-black indent-2"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <CustomInput name={'office_address'} type={'text'} value={form1.office_address} label={'OFFICE ADDRESS:'} handleChange={handleChange} />
          <CustomInput name={'residential_address'} type={'text'} value={form1.residential_address} label={'RESIDENTIAL ADDRESS:'} handleChange={handleChange} />
          <CustomInput name={'email'} type={'text'} value={form1.email} label={'EMAIL:'} handleChange={handleChange} />
          <article className='flex flex-col md:flex-row gap-2 my-1'>
            <CustomInput name={'phone'} type={'tel'} value={form1.phone} label={'PHONE:'} handleChange={handleChange} />
            <CustomInput name={'occupation'} type={'text'} value={form1.occupation} label={'OCCUPATION/BUSINESS TYPE:'} handleChange={handleChange} />
          </article>
          <CustomInput name={'current_employer'} type={'tel'} value={form1.current_employer} label={'CURRENT EMPLOYER:'} handleChange={handleChange} />
          <CustomInput name={'employer_address'} type={'text'} value={form1.employer_address} label={'EMPLOYERS ADDRESS:'} handleChange={handleChange} />
          <CustomInput name={'position'} type={'text'} value={form1.position} label={'POSITION:'} handleChange={handleChange} />
          <CustomInput name={'length_of_employment'} type={'text'} value={form1.length_of_employment} label={'LENGTH OF EMPLOYMENT:'} handleChange={handleChange} />
          <CustomInput name={'initial_deposit'} type={'text'} value={form1.initial_deposit} label={'DESIRED INITIAL DEPOSIT:'} handleChange={handleChange} />
        </section>
        {/* OTHER BANKS */}
        <section className='my-[12px]'>
          <h2 className='greenheader my-4'>ACCOUNTS WITH OTHER BANKS (INCLUDING TMFB LTD, BRANCH)</h2>
          <table className="tables mb-2">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name of Bank and Address</th>
                <th className="py-2 px-4 border-b">Account Number</th>
              </tr>
            </thead>
            <tbody>
              {form1.other_banks.map((bank, index) => (
                <tr key={index}>
                  <td className="border-b">
                    <input
                      type="text"
                      value={bank.name}
                      onChange={(e) => handleChangeOtherBanks(index, 'name', e.target.value)}
                      className="otherbank_input"
                    />
                  </td>
                  <td className="border-b">
                    <input
                      type="text"
                      value={bank.accountNo}
                      onChange={(e) => handleChangeOtherBanks(index, 'accountNo', e.target.value)}
                      className="otherbank_input"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* REFERECES */}
          {form1.references.map((reference, index) => (
            <article className='flex flex-col md:flex-row gap-2 my-1' key={index}>
              <CustomInput
                name={`references[${index}].name`}
                type={'text'}
                value={form1.references[index].name}
                label={`REFEREE'S NAME:`}
                handleChange={(e) => handleChangeReferences(index, 'name', e.target.value)}
              />
              <CustomInput
                name={`references[${index}].bank`}
                type={'text'}
                value={form1.references[index].bank}
                label={'BANK:'}
                handleChange={(e) => handleChangeReferences(index, 'bank', e.target.value)}
              />
              <CustomInput
                name={`references[${index}].accountNo`}
                type={'text'}
                value={form1.references[index].accountNo}
                label={'A/C NO.:'}
                handleChange={(e) => handleChangeReferences(index, 'accountNo', e.target.value)}
              />
            </article>
          ))}

        </section>
        {/* OTHER ACCOUNTS */}
        <section className='my-[12px]'>
          <h2 className='greenheader my-4'>FOR OTHER ACCOUNTS'S (PARTICULARLY OF OTHER ACCOUNTS'S HOLDERS)</h2>
          <div className='overflow-scroll'>
            <table className="tables mb-2 ">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Name</th>
                  <th className="py-2 px-4 border-b">Address</th>
                  <th className="py-2 px-4 border-b">Signature</th>
                  <th className="py-2 px-4 border-b">Telephone</th>
                  <th className="py-2 px-4 border-b">Email</th>
                </tr>
              </thead>
              <tbody>
                {form1.other_accounts.map((row, index) => (
                  <tr key={index}>
                    <td className="border-b">
                      <input
                        type="text"
                        value={row.name}
                        onChange={(e) => handleOtherAccountsChange(index, 'name', e.target.value)}
                        className="otherbank_input"
                      />
                    </td>
                    <td className="border-b">
                      <input
                        type="text"
                        value={row.address}
                        onChange={(e) => handleOtherAccountsChange(index, 'address', e.target.value)}
                        className="otherbank_input"
                      />
                    </td>
                    <td className="border-b">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(index, e.target.files[0])}
                        className="hidden"
                        id={`fileInput${index}`}
                      />
                      {/* Display area for the image */}
                      <label htmlFor={`fileInput${index}`} className="relative block cursor-pointer">
                        {row.signature && (
                          <img
                            src={row.signature}
                            alt="Signature"
                            className="w-[80%] mx-auto h-[150px] object-contain"
                          />
                        )}
                        {!row.signature && (
                          <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
                            <span className="text-gray-500">Upload Signature</span>
                          </div>
                        )}
                      </label>
                    </td>
                    <td className="border-b">
                      <input
                        type="text"
                        value={row.telephone}
                        onChange={(e) => handleOtherAccountsChange(index, 'telephone', e.target.value)}
                        className="otherbank_input"
                      />
                    </td>
                    <td className="border-b">
                      <input
                        type="text"
                        value={row.email}
                        onChange={(e) => handleOtherAccountsChange(index, 'email', e.target.value)}
                        className="otherbank_input"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        <section>
          <article className='flex flex-col md:flex-row gap-2 my-1'>
            <CustomInput name={'membership'} type={'text'} value={form1.membership} label={'Professional membership/no (if applicable):'} handleChange={handleChange} />
            <CustomInput name={'fax'} type={'text'} value={form1.fax} label={'Fax no (if any):'} handleChange={handleChange} />
          </article>
          <div className='my-3 border-t-4 border-red-700 flex flex-col gap-3'>
            <p>I/We request the opening of an account and confirm that the aboe are true, I/We agree to the Terms and conditions on the reverse of this application</p>
            <article className='ml-auto '>
              {/* Input for image upload */}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleCustomerSignatureChange(e)}
                className="hidden form-input"
                id="customerSignatureInput"
              />
              {/* Display area for the image */}
              <label htmlFor="customerSignatureInput" className="relative block cursor-pointer">
                {form1.customers_signature && (
                  <img
                    src={form1.customers_signature}
                    alt="Signature"
                    className="w-[80%] h-[150px] object-contain"
                  />
                )}
                {!form1.customers_signature && (
                  <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">Upload Signature</span>
                  </div>
                )}
              </label>
              <CustomInput name={'date_of_registration'} type={'text'} value={form1.date_of_registration} label={''} handleChange={handleChange} />
              <p>Customer's Signature and date</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  )
}

export default TM001