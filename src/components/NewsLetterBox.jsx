import React from 'react'

const NewsLetterBox = () => {
const submitHandler = (e) => { e.preventDefault(); 
};

  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Sebcribe now & get 20% off</p>
        <p className='text-gray-400 mt-3'>Lorem ipsum dolor,  elit. Quod, provident? Quae exercitationem, eaque adipisci ab soluta ducimus </p>

           <form onSubmit={()=>submitHandler()} action="" className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-4 border pl-3'>

            <input required className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter Your Email'/>

            <button type='submit' className='bg-black text-white py-2 px-4 cursor-pointer'>Subcribe</button>
            </form> 
    </div>
  )
}

export default NewsLetterBox