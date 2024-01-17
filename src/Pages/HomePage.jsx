/* eslint-disable react/style-prop-object */
import React from 'react'
import Logo from '../mainlogo.png'
import '../css/style.css'
import { Link } from 'react-router-dom'
import Image from '../WhatsApp Image 2024-01-16 at 12.13.42_c436269d.jpg'

const HomePage = () => {
 return (
  <div className='mb-[30px]'>
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
     <img src={Logo} alt='other' className='w-[60%] mx-auto h-[40vh] lg:h-[60vh] object-fill' />
     <div className="text-center text-xl lg:text-2xl py-4" >
      <h1><i class="fa-solid fa-door-open"></i>WELCOME TO <span class="diff">TOWNSERVE</span> MICROFINANCE BANK
      </h1>
     </div>
     <h1 style={{ textAlign: 'center' }} className='text-lg font-bold'>HOW CAN WE SERVE YOU?</h1>
     <div class="my-[40px]">
      <div class="flex gap-4 flex-wrap justify-center my-8">

       <article class="fcard myshadow">
        <figure class="">
         <img src={Image} className='w-full h-full' alt='' />
        </figure>
        <div class="article-content">
         <h3 class="card-title">HOW TO OPEN YOUR ACCT</h3>
         <Link to="/user/open-account" class="card-cartegory">bank account opening form</Link>
        </div>
       </article>

       <article class="fcard myshadow">
        <figure class="">
         <img src={Image} className='w-full h-full' alt='' />
        </figure>
        <div class="article-content">
         <h3 class="card-title">HOW TO DEPOSIT</h3>
         <Link to="/user/deposit-form" class="card-cartegory">INVESTMENT/DEPOSIT form</Link>
        </div>
       </article>

       <article class="fcard myshadow">
        <figure class="">
         <img src={Image} className='w-full h-full' alt='' />
        </figure>
        <div class="article-content">
         <h3 class="card-title">HOW TO CREATE GUARANTOR FORM</h3>
         <Link to="" class="card-cartegory">GUARANTOR form</Link>
        </div>
       </article>

       <article class="fcard myshadow">
        <figure class="">
         <img src={Image} className='w-full h-full' alt='' />
        </figure>
        <div class="article-content">
         <h3 class="card-title">cREATE ESUSU FORM</h3>
         <Link to="" class="card-cartegory">ESUSU FORM form</Link>
        </div>
       </article>

       <article class="fcard myshadow">
        <figure class="">
         <img src={Image} className='w-full h-full' alt='' />
        </figure>
        <div class="article-content">
         <h3 class="card-title">cREATE BANK/CREDIT APPLICATION</h3>
         <Link to="" class="card-cartegory">BANK/CREDIT APPLICATION form</Link>
        </div>
       </article>

       <article class="fcard myshadow">
        <figure class="">
         <img src={Image} className='w-full h-full' alt='' />
        </figure>
        <div class="article-content">
         <h3 class="card-title">cREATE LOAN INVESTMENT APPLICATION</h3>
         <Link to="" class="card-cartegory">LOAN INVESTMENT APPLICATION form</Link>
        </div>
       </article>
      </div>
     </div>
    </div>
   </section>
  </div>
 )
}

export default HomePage