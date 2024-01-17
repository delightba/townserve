import React, { useState } from 'react'
import { usePDF, Margin } from 'react-to-pdf';
import OfferInvestmentLetter from './OfferInvestmentLetter';
import OfferForm from './OfferForm'

const OfferInvestment = () => {
  const [details, setDetails] = useState({
    date: '',
    name: '',
    address: '',
    state: '',
    amount: '',
    amount_in_words: '',
    rate: '',
    tenor: '',
    effective_date: '',
    maturity_date: '',
    repayment_date: '',
    value_at_maturity: '',
    value_at_maturity_words: '',
    type_of_investment: ''
  })
  const [isFillingForm, setIsFillingForm] = useState(true)
  const options = {
    page: {
      margin: Margin.SMALL,
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase()

    setDetails((prev) => ({
      ...prev,
      [name]: uppercaseValue
    }))
  }

  const handleSubmit = () => {
    for (const key in details) {
      if (details[key] === '') {
        alert(`Please fill in all fields`);
        return; // Stop the submission if any field is empty
      }
    }
    setIsFillingForm(false)
    console.log(details)
  }
  const { toPDF, targetRef } = usePDF({ filename: `${details.name}.pdf` }, options);
  return (
    <div className="w-full md:w-[80%] mx-auto mt-8">
      {isFillingForm && <OfferForm details={details} handleChange={handleChange} handleSubmit={handleSubmit} />}
      {!isFillingForm &&
        <div className="relative flex flex-col gap-3">
          <OfferInvestmentLetter details={details} targetRef={targetRef} />
          <div className="mx-auto">
            <button type='button' onClick={() => toPDF()} className="next">Download</button>
          </div>
        </div>
      }
    </div>
  )
}

export default OfferInvestment