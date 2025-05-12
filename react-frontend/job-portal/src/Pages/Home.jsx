import React from 'react'
import Hero from '../components/Hero'
import JobsPage from './JobsPage'

const Home = () => {
  return (
    <>
      <Hero />
      <JobsPage location={'home'}/>
    </>
  )
}

export default Home