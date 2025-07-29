import { SignedIn, SignIn } from '@clerk/nextjs'
import React from 'react'
import { Session } from '@clerk/nextjs/server'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const DashboardPage = async () => {

    const {userId} = await auth()
    
    if(!userId) {
        redirect('/')
     }

  return (
   <div>DashboardPage</div>
  )
}

export default DashboardPage