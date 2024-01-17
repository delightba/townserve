/* eslint-disable react/style-prop-object */
import React from 'react'
import Logo from '../mainlogo.png'
import Image from '../WhatsApp Image 2024-01-16 at 12.13.42_c436269d.jpg'
import '../css/style.css'
import { Link } from 'react-router-dom'


const HomePage = () => {
 return (
  <div>
   <header>
    <nav class="navbar">
     <div class="navdiv">
      <div class="logo">
       <a href="/"><img src={Logo} alt="something" /></a></div>
      <ul>
       <button><Link to="/login">Sign in</Link></button>
      </ul>
     </div>
    </nav>
   </header>
   <section className='relative'>
    <div className="containerr">
     <img src={Image} alt='other' className='w-full h-[40vh] lg:h-[60vh] object-fill' />
     <div className="text-center text-xl lg:text-2xl py-4" >
      <h1><i class="fa-solid fa-door-open"></i>WELCOME TO <span class="diff">TOWNSERVE</span> MICROFINANCE BANK
      </h1>
     </div>
     <h1 style={{ textAlign: 'center' }} className='text-lg font-bold'>HOW CAN WE SERVE YOU?</h1>
     <div className="flex justify-center my-4">
      <ul className='flex flex-col gap-3 ulLi'>
       <li className='dashboardLinks'>
        <Link to="/user/open-account">BANK ACCOUNT OPENNING FORM</Link>
       </li>
       <li className='dashboardLinks'>
        <Link to="/user/deposit-form">INVESTMENT/DEPOSIT FORM</Link>
       </li>
       <li className='dashboardLinks'>
        <Link to="/user/loan-form">LOAN/APPLICATION FORM</Link>
       </li>
      </ul>
     </div>
    </div>
   </section>
  </div>
 )
}

export default HomePage