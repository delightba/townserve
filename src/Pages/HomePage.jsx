/* eslint-disable react/style-prop-object */
import React, { useEffect, useRef } from 'react'
import Logo from '../mainlogo.png'
import '../css/style.css'
import { Link, useNavigate } from 'react-router-dom'
import Openaccount from '../images/openaccount.png'
import Deposit from '../images/deposit.png'
import Guarantor from '../images/guarantor.png'
import Esusu from '../images/esusu.png'
import Credit from '../images/credit.png'
// import Loan from '../images/loan.jpg'
import { FaArrowRight } from "react-icons/fa";



const HomePage = () => {
 const navigate = useNavigate()

 const containerRef = useRef(null);
 useEffect(() => {
  containerRef.current.scrollIntoView({ behavior: 'smooth' });
 }, []);

 return (
  <div className='mb-[30px] pb-[40px]' ref={containerRef}>
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
     <img src={Logo} alt='other' className='w-[30%] mx-auto h-full' />
     <div className="text-center text-xl md:text-2xl lg:text-3xl py-4" >
      <h1>Kindly complete the undernoted forms</h1>
     </div>
     <div class="py-[40px]">
      <div class="flex gap-4 gap-y-6 flex-wrap justify-center my-8">

       <article class="fcard myshadow group" onClick={() => navigate('/user/open-account')}>
        <figure class="">
         <img src={Openaccount} className='w-full h-[150px]' alt='' />
        </figure>
        <div class="article-content">
         <article className='flex gap-1 items-center justify-center text-center'>
          <FaArrowRight className='hidden group-hover:block group-hover:animate-ping' />
          <Link to="/user/open-account" class="card-cartegory">bank account opening form</Link>
         </article>
        </div>
       </article>

       <article class="fcard myshadow group" onClick={() => navigate('/user/deposit-form')}>
        <figure class="">
         <img src={Deposit} className='w-full h-[150px]' alt='' />
        </figure>
        <div class="article-content">
         <article className='flex gap-1 items-center justify-center text-center'>
          <FaArrowRight className='hidden group-hover:block group-hover:animate-ping' />
          <Link to="/user/deposit-form" class="card-cartegory">INVESTMENT/DEPOSIT form</Link>
         </article>
        </div>
       </article>

       <article class="fcard myshadow group" onClick={() => navigate('/user/gua-form')}>
        <figure class="">
         <img src={Guarantor} className='w-full h-[150px]' alt='' />
        </figure>
        <div class="article-content">
         <article className='flex gap-1 items-center justify-center text-center'>
          <FaArrowRight className='hidden group-hover:block group-hover:animate-ping' />
          <Link to="/user/gua-form" class="card-cartegory !text-center">GUARANTOR form</Link>
         </article>
        </div>
       </article>

       <article class="fcard myshadow group" onClick={() => navigate('/user/esusu-form')}>
        <figure class="">
         <img src={Esusu} className='w-full h-[150px]' alt='' />
        </figure>
        <div class="article-content">
         <article className='flex gap-1 items-center justify-center text-center'>
          <FaArrowRight className='hidden group-hover:block group-hover:animate-ping' />
          <Link to="/user/esusu-form" class="card-cartegory">ESUSU FORM</Link>
         </article>
        </div>
       </article>

       <article class="fcard myshadow group" onClick={() => navigate('/user/bcf-form')}>
        <figure class="">
         <img src={Credit} className='w-full h-[150px]' alt='' />
        </figure>
        <div class="article-content">
         <article className='flex gap-1 items-center justify-center text-center'>
          <FaArrowRight className='hidden group-hover:block group-hover:animate-ping' />
          <Link to="/user/bcf-form" class="card-cartegory">BANK/CREDIT APPLICATION form</Link>
         </article>
        </div>
       </article>

       {/* <article class="fcard myshadow group" onClick={() => navigate('')}>
        <figure class="">
         <img src={Loan} className='w-full h-[150px]' alt='' />
        </figure>
        <div class="article-content">
         <h3 class="card-title">CREATE LOAN INVESTMENT APPLICATION</h3>
         <article className='flex gap-1 items-center justify-center text-center'>
          <FaArrowRight className='hidden group-hover:block group-hover:animate-ping' />
          <Link to="" class="card-cartegory">LOAN INVESTMENT APPLICATION FORM</Link>
         </article>
        </div>
       </article> */}
      </div>
     </div>
    </div>
   </section>
  </div>
 )
}

export default HomePage