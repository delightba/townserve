import React from 'react'
import CustomInput from '../../Components/CustomInput'

const Form = ({details, handleChange, handleSubmit}) => {
 
 return (
  <form className='flex flex-col gap-3'>
   <div>
    <h1 className='greenheader text-center'>TownServe Investment Note/Certificate Form</h1>
    <p className='text-center text-lg font-medium'>Kindly fill this form before submitting, so we can generate the pdf file for you.</p>
   </div>
   <section>
    <CustomInput value={details.date} placeholder={"Today's date"} name={"date"} type={"date"} label={"Date"} handleChange={handleChange} />
    <CustomInput value={details.name} placeholder={"Fullname"} name={"name"} type={"text"} label={"name"} handleChange={handleChange} />
    <CustomInput value={details.address} placeholder={"Your street name and number"} name={"address"} type={"text"} label={"Address"} handleChange={handleChange} />
    <CustomInput value={details.state} placeholder={"Your state"} name={"state"} type={"text"} label={"State"} handleChange={handleChange} />
    <CustomInput value={details.amount} placeholder={"Your amount"} name={"amount"} type={"number"} label={"Amount (figure)"} handleChange={handleChange} />
    <CustomInput value={details.amount_in_words} placeholder={"Your amount in words"} name={"amount_in_words"} type={"text"} label={"Amount (in words)"} handleChange={handleChange} />
    <CustomInput value={details.rate} placeholder={"%"} name={"rate"} type={"number"} label={"Rate"} handleChange={handleChange} />
    <CustomInput value={details.tenor} placeholder={"Your tenor here"} name={"tenor"} type={"number"} label={"Tenor"} handleChange={handleChange} />
    <CustomInput value={details.effective_date} placeholder={"Your effective date"} name={"effective_date"} type={"date"} label={"Effective date"} handleChange={handleChange} />
    <CustomInput value={details.maturity_date} placeholder={"Your maturity date"} name={"maturity_date"} type={"date"} label={"Maturity date"} handleChange={handleChange} />
    <CustomInput value={details.value_at_maturity} placeholder={"Your matured value"} name={"value_at_maturity"} type={"number"} label={"Matured value (figure)"} handleChange={handleChange} />
    <CustomInput value={details.value_at_maturity_words} placeholder={"Your matured value in words"} name={"value_at_maturity_words"} type={"text"} label={"Matured value in words"} handleChange={handleChange} />
    <CustomInput value={details.repayment_date} placeholder={"Your repayment date"} name={"repayment_date"} type={"date"} label={"Repayment date"} handleChange={handleChange} />
    <CustomInput value={details.type_of_investment} placeholder={"Your investment type"} name={"type_of_investment"} type={"text"} label={"Invetment type"} handleChange={handleChange} />
   </section>

   <button type="button" className='next' onClick={handleSubmit}>Submit</button>
  </form>
 )
}

export default Form