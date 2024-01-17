import React from 'react'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import AdminLogin from './Pages/AdminLogin'
import Layout from './Layout'
import InvestmentNoteForm from './Pages/Investment_note/InvestmentNoteForm'
import OfferInvestment from './Pages/Offer_of_investment/OfferInvestment'
import AccountOpeningForm from './Pages/Users/account_opening_form/AccountOpeningForm'
// import Dashboard from './Pages/Dashboard'


const App = () => {
 const router = createBrowserRouter(
  createRoutesFromElements(
   <>
   <Route path='/user/open-account' element={<AccountOpeningForm />} />
    <Route path='/' element={<AdminLogin />} />
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