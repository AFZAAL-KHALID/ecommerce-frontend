import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import NewsLetterBox from '../components/NewsLetterBox'
import { useSelector } from 'react-redux'


const Home = () => {
const token = useSelector(state => state.counter.token)
  
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home