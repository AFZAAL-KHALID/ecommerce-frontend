import React from 'react'
import Title from './../components/Title'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
  <div className="mainDiv">
      <div className='w-full text-2xl text-center border-t pt-8'>
      <Title text1={'ABOUT'} text2={'US'}/>
    </div>

    <div className="my-10 flex flex-col md:flex-row gap-16 mb-20 ">
     {/* left */}
      <img src="./../../public/Assests/Images/about.jfif" className='w-full md:max-w-[300px] md:w-2/4' alt="" />

     {/* right */}
      <div className='flex flex-col justify-center gap-6 md-w-2/4 text-gray-600'>

          <p >Lorem ipsum, dolor sit amet consectetur adipisicing elit. Id porro quidem ipsa rerum? Quam blanditiis eius quae nemo incidunt fugiat quibusdam! Illo, possimus sed officiis in architecto distinctio nulla quia?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, est praesentium accusamus voluptatem cupiditate voluptas dolorum quaerat quibusdam aut facere vel qui error doloribus alias ex optio! Aliquam, facilis reprehenderit.</p>
      </div>
    </div>

    <NewsLetterBox/>
  </div>

  )
}

export default About