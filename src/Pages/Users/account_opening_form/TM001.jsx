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
    nin:'',
    bvn:'',
    nationality: '',
    // rc: {},
    office_address: '',
    residential_address: '',
    phone: '',
    occupation: '',
    email: '',
    state_of_origin: '',
    local_government: '',
    landmark: '',
    district: '',
    mother_maiden_name: '',
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
  // const handleRCChange = (e, fieldName) => {
  //   const { value } = e.target;
  //   setForm1((prev) => ({
  //     ...prev,
  //     rc: {
  //       ...prev.rc,
  //       [fieldName]: value.toUpperCase(),
  //     },
  //   }));
  //   saveFormDataToLocalStorage({
  //     ...form1,
  //     rc: {
  //       ...form1.rc,
  //       [fieldName]: value.toUpperCase(),
  //     },
  //   });
  // };

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
        {/* <div className='mb-4'>
          <img src={Logo} alt="logo" className='mx-auto w-[25%]' />
        </div> */}
        <section>
          <h2 className='greenheader'>APPLICATION FOR OPENING PERSONAL/JOINT, CORPORATE, CLUB/ASS. ACCOUNT</h2>
          <article className='flex flex-col md:flex-row gap-2 my-1'>
            <CustomInput name={'branch'} type={'text'} value={form1.branch} label={'Branch:'} handleChange={handleChange} />
            <CustomInput name={'account_type'} type={'text'} value={form1.account_type} label={'Type of account:'} handleChange={handleChange} />
          </article>
          <CustomInput name={'fullname'} type={'text'} value={form1.fullname} label={'Name Individiual /Corporate name:'} handleChange={handleChange} />
          <article className="flex flex-col md:flex-row gap-2 my-1">
          <CustomInput name={'nin'} type={'number'} value={form1.nin} label={'NIN'} handleChange={handleChange} />
          <CustomInput name={'bvn'} type={'number'} value={form1.bvn} label={'BVN'} handleChange={handleChange} />
          </article>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <CustomInput name={'state_of_origin'} type={'text'} value={form1.state_of_origin} label={'State of origin:'} handleChange={handleChange} />
            <CustomInput name={'local_government'} type={'text'} value={form1.local_government} label={'Local government:'} handleChange={handleChange} />
            <CustomInput name={'landmark'} type={'text'} value={form1.landmark} label={'landmark:'} handleChange={handleChange} />
            <CustomInput name={'district'} type={'text'} value={form1.district} label={'district:'} handleChange={handleChange} />
            <CustomInput name={'mother_maiden_name'} type={'text'} value={form1.mother_maiden_name} label={"Mother's maiden name"} handleChange={handleChange} />
          </div>
          <CustomInput name={'company_name'} type={'text'} value={form1.company_name} label={'Company Name:'} handleChange={handleChange} />
          <article className='flex flex-col md:flex-row gap-2 my-1'>
            <CustomInput name={'dob'} type={'date'} value={form1.dob} label={'Date Of Birth/Registration:'} handleChange={handleChange} />
            <CustomInput name={'nationality'} type={'text'} value={form1.nationality} label={'Nationality:'} handleChange={handleChange} />
          </article>
          {/* <table className="tables mt-4">
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
          </table> */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <CustomInput name={'office_address'} type={'text'} value={form1.office_address} label={'Office address:'} handleChange={handleChange} />
            <CustomInput name={'residential_address'} type={'text'} value={form1.residential_address} label={'Residential address:'} handleChange={handleChange} />
            <CustomInput name={'email'} type={'text'} value={form1.email} label={'Email:'} handleChange={handleChange} />
          </div>
          <article className='flex flex-col md:flex-row gap-2 my-1'>
            <CustomInput name={'phone'} type={'tel'} value={form1.phone} label={'Phone:'} handleChange={handleChange} />
            <CustomInput name={'occupation'} type={'text'} value={form1.occupation} label={'Occupation/Business Type:'} handleChange={handleChange} />
          </article>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <CustomInput name={'current_employer'} type={'text'} value={form1.current_employer} label={'Current employer:'} handleChange={handleChange} />
            <CustomInput name={'employer_address'} type={'text'} value={form1.employer_address} label={'Employers address:'} handleChange={handleChange} />
            <CustomInput name={'position'} type={'text'} value={form1.position} label={'Position:'} handleChange={handleChange} />
            <CustomInput name={'length_of_employment'} type={'text'} value={form1.length_of_employment} label={'Length of employment:'} handleChange={handleChange} />
            <CustomInput name={'initial_deposit'} type={'text'} value={form1.initial_deposit} label={'Desired initial deposit:'} handleChange={handleChange} />
          </div>
        </section>
        {/* OTHER BANKS */}
        <section className='my-[12px]'>
          <h2 className='greenheader my-4'>ACCOUNTS WITH OTHER BANKS (INCLUDING TMFB, BRANCH)</h2>
          <table className="tables mb-2 w-full">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Name of Bank and Address</th>
                <th className="py-2 px-4 border-b">Account Number</th>
              </tr>
            </thead>
            <tbody className='w-full'>
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
                label={`Referee's Name:`}
                handleChange={(e) => handleChangeReferences(index, 'name', e.target.value)}
              />
              <CustomInput
                name={`references[${index}].bank`}
                type={'text'}
                value={form1.references[index].bank}
                label={'Bank:'}
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
          <h2 className='greenheader my-4'>FOR OTHER ACCOUNTS (PARTICULARLY OF OTHER ACCOUNT HOLDERS)</h2>
          <div className='overflow-scroll w-full'>
            <table className="tables mb-2 w-full">
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
                  <tr key={index} className='w-auto'>
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
                            className="w-[100px] mx-auto h-[150px] object-contain"
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
            <p>I/We request the opening of an account and confirm that the aboe are true, I/We agree to the Terms and Conditions on the reverse of this application</p>
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
                    className="w-[100px] h-[80px] object-contain"
                  />
                )}
                {!form1.customers_signature && (
                  <div className="w-full h-full border-dashed border-2 border-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">Upload Signature</span>
                  </div>
                )}
              </label>
              <CustomInput name={'date_of_registration'} type={'date'} value={form1.date_of_registration} label={''} handleChange={handleChange} />
              <p>Customer's Signature and date</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  )
}

export default TM001