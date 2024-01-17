import React from 'react'
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom'
import Logo from './mainlogo.png'
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { MdOutlineDashboard } from "react-icons/md";
import { FaWpforms } from "react-icons/fa6";
import { TiDocument } from "react-icons/ti";


const Layout = () => {
 const [isNavbarCollapsed, setIsNavbarCollapsed] = useState(false);

 const toggleNavbar = () => {
  setIsNavbarCollapsed((prev) => !prev);
 };

 return (
  <main >
   <header className='w-full h-auto shadow-lg'>
    <nav className='flex justify-between p-4'>
     <figure>
      <img src={Logo} alt="" className='w-[250px]' />
     </figure>
     <button
      className='text-[30px] focus:outline-none'
      onClick={toggleNavbar}
     >
      {isNavbarCollapsed ? <IoMenu /> : <RxCross2 />}
     </button>
    </nav>
   </header>
   <section className='flex w-full relative'>
    <div className={isNavbarCollapsed ? 'hidden' : 'absolute bg-slate-300 w-[80%] inset-y-0 left-0 z-[1000] md:w-[50%] lg:w-[30%] xl:w-[20%] myshadow min-h-screen flex flex-col p-4'}>
     <ul className='flex flex-col gap-6'>
      {/* <li className='dashboardLinks'>
      <MdOutlineDashboard />
      <Link to='/admin/dashboard'>Dashboard</Link>
      </li> */}
      <li className='dashboardLinks' onClick={toggleNavbar}>
       <FaWpforms />
       <Link to='/admin/dashboard/create-investmentnote'>Investment Note</Link>
      </li>
      <li className='dashboardLinks' onClick={toggleNavbar}>
       <TiDocument />
       <Link to='/admin/dashboard/create-offerofinvestment'>Offer Investment Form</Link>
      </li>
      <li className='dashboardLinks' onClick={toggleNavbar}>
       <MdOutlineDashboard />
       <Link to=''>Others</Link>
      </li>
     </ul>
    </div>
    <div className={'w-full p-4'}>
     <Outlet />
    </div>
   </section>
  </main>
 )
}

export default Layout