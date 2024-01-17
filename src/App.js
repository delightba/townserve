import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import AdminLogin from './Pages/AdminLogin'
import Layout from './Layout'
import InvestmentNoteForm from './Pages/Investment_note/InvestmentNoteForm'
import OfferInvestment from './Pages/Offer_of_investment/OfferInvestment'
import AccountOpeningForm from './Pages/Users/account_opening_form/AccountOpeningForm'
import DepositPage from './Pages/Users/investment_deposit/DepositPage'
import HomePage from './Pages/HomePage'
import LoanPage from './Pages/Users/loan_application/LoanPage'
// import Dashboard from './Pages/Dashboard'


const App = () => {
 const router = createBrowserRouter(
  createRoutesFromElements(
   <>
    <Route path='/' element={<HomePage />} />
    <Route path='/user/open-account' element={<AccountOpeningForm />} />
    <Route path='/user/deposit-form' element={<DepositPage />} />
    <Route path='/user/loan-form' element={<LoanPage />} />
    <Route path='/login' element={<AdminLogin />} />
    <Route path='/admin/dashboard' element={<Layout />}>
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