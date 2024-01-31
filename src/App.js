import React, { useState } from 'react'
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import AdminLogin from './Pages/AdminLogin'
import Layout from './Layout'
import InvestmentNoteForm from './Pages/Investment_note/InvestmentNoteForm'
import OfferInvestment from './Pages/Offer_of_investment/OfferInvestment'
import AccountOpeningForm from './Pages/Users/account_opening_form/AccountOpeningForm'
import DepositPage from './Pages/Users/investment_deposit/DepositPage'
import HomePage from './Pages/HomePage'
import LoanPage from './Pages/Users/loan_application/LoanPage'
import BCFPage from './Pages/Users/bank_credit_facilities/BCFPage'
import EsusuPage from './Pages/Users/esusu_loan_appliction/EsusuPage'
import GUAPage from './Pages/Users/guarantors_form/GUAPage'
// import Dashboard from './Pages/Dashboard'


const App = () => {
 const [admin, setAdmin] = useState({
  token: '',
  user: ''
 })


 const router = createBrowserRouter(
  createRoutesFromElements(
   <>
    <Route path='/' element={<HomePage />} />
    <Route path='/user/open-account' element={<AccountOpeningForm />} />
    <Route path='/user/deposit-form' element={<DepositPage />} />
    <Route path='/user/loan-form' element={<LoanPage />} />
    <Route path='/user/bcf-form' element={<BCFPage />} />
    <Route path='/user/esusu-form' element={<EsusuPage />} />
    <Route path='/user/gua-form' element={<GUAPage />} />
    <Route path='/login' element={<AdminLogin setAdmin={setAdmin} admin={admin} />} />
    <Route path='/admin/dashboard' element={!admin ? <Navigate to='/' replace /> : <Layout />}>
     {/* <Route index element={<Dashboard />} /> */}
     <Route index path='create-investmentnote' element={<InvestmentNoteForm />} />
     <Route path='create-offerofinvestment' element={<OfferInvestment />} />

    </Route>

   </>
  )
 )
 return (
  <div>
   <RouterProvider router={router} />
  </div>
 )
}

export default App