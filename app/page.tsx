import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button"


export default async function Home() {
 


 return (
  <main className="flex flex-col justify-center items-center h-screen bg-amber-400">
    <h1>Hello from home</h1>
    <SignedOut>
    <SignInButton>
      <Button asChild className="bg-blue-600 mt-6 text-white p-2 rounded-md">Sign in</Button>
    </SignInButton>

    <SignUpButton>
      <Button asChild className="bg-blue-600 mt-6 text-white p-2 rounded-md">Sign Up</Button>
    </SignUpButton>

    </SignedOut>

    <SignedIn>
    <div>
      <UserButton/>
      <SignOutButton>
      <Button asChild className="bg-blue-600 mt-6 text-white p-2 rounded-md">Logout</Button>
    </SignOutButton>
    </div>
     </SignedIn>
  </main>
 )
}