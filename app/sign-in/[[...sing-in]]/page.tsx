import React from 'react'
import { SignIn } from '@clerk/nextjs'

const SingInPage = () => {
  return (
   <div className='flex w-screen h-full justify-center pt-20'>
     <SignIn/>
   </div>
  )
}

export default SingInPage