import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (<>
    <div className='flex justify-evenly px-20 py-10 bg-slate-200'>
      <div className='w-1/4'>
        <h3>Popular Links</h3>
        <ul className='w-full text-sm'>
          <li><Link to="#">Link1</Link></li>
          <li><Link to="#">Link1</Link></li>
          <li><Link to="#">Link1</Link></li>
          <li><Link to="#">Link1</Link></li>
        </ul>
      </div>
      <div className='w-1/4'>
        <h3 className='font-bold underline underline-offset-2'>Popular Links</h3>
        <ul className='w-full text-sm'>
          <li><Link to="#">Facebook</Link></li>
          <li><Link to="#">Instagram</Link></li>
          <li><Link to="#">LinkedIn</Link></li>
        </ul>
      </div>
      <form className='w-1/2 px-5'>
        <h3 className='font-bold underline underline-offset-2'>Sign up for our newsletter</h3>
        <p className='text-sm text-justify'>
          Get connected and receive notifications about latest vacancies and trend in the industry.
        </p>
        <input type="text" className='input' />
        <button className='bg-main text-white btn'>Subscribe Now!</button>
      </form>
    </div>
    <div className='bg-main text-center text-white py-10'>
      &copy; Copyright 2024-2025.
    </div>
  </>
  )
}

export default Footer