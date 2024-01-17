import React from 'react'

const CustomInput = ({ value, placeholder, label, type, name, handleChange, important, info }) => {
 return (
  <article className='form_input_container'>
   <label htmlFor={name} className='font-semibold text-[14px] whitespace-nowrap'>{label}{important && <span className='important'>*</span>}</label>
   <input type={type} name={name} value={value} placeholder={placeholder} onChange={handleChange} className='formInput' />
   {info && info}
  </article>
 )
}

export default CustomInput