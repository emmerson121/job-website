"use client"

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react";

// import { logout} from "@/lib/auth";


export default function Navbar() {
    const { data: session} = useSession();
    const [toggle, setToggle] = useState<boolean>(true);

    return(
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 md:block sm:hidden">
                <div className="flex justify-between h-16 relative">
                    <div className="flex">
                        <Link href="/" className="flex items-center">
                            <Image 
                                src="/logo.png" 
                                alt="Job Board Logo"
                                width={40}
                                height={40}
                                className="h-8 w-auto" 
                            />
                            <span className="ml-2 text-base md:text-xl font-semibold text-[#2f3a5b]">
                                JobSphere
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center md:hidden">
                        <div onClick={() => setToggle(!toggle)}>
                            <svg 
                                className="w-6 h-6"
                                fill="#2f3a5b"
                                viewBox="0 0 448 512">
                                <path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z"/>
                            </svg>
                        </div>
                    </div>

                    <div className="items-center space-x-4 hidden md:flex">
                        <Link 
                        href={"/jobs"}
                        className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Browse Jobs
                        </Link>
                        
                        {session ? 
                        (
                        <>
                        <Link 
                        href={"/jobs/post"}
                        className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Post a Job
                        </Link>
                        <Link 
                        href="/dashboard"
                        className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Dashboard
                        </Link>
                        <button
                        onClick={() =>
                                        signOut({
                                            callbackUrl: "/auth/signin",
                                        })
                                    }
                        className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Sign Out
                        </button>
                        </>
                        )
                        : 
                        <Link 
                        href="/auth/signin"
                        className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Sign in
                        </Link>
                        }       
                    </div>
                </div>

               
                {!toggle && (
                   
                    <div className="absolute bg-[linear-gradient(71deg,_#fff,_#fff,_#cbcdd5)] w-full top-0 bottom-0 right-0 left-0 flex ">     
                    <div className="w-full bg-[linear-gradient(71deg,_#fff,_#fff,_#cbcdd5)] h-[100vh] backdrop-blur-[35px]">
                        <div className="flex justify-between items-center bg-white max-w-7xl mx-auto px-4 h-16 mb-5">
                            <div className="flex items-center">
                        <Link href="/" className="flex items-center">
                            <Image 
                                src="/logo.png" 
                                alt="Job Board Logo"
                                width={40}
                                height={40}
                                className="h-8 w-auto" 
                            />
                            <span className="ml-2 text-base md:text-xl font-semibold text-[#2f3a5b]">
                                JobSphere
                            </span>
                        </Link>
                    </div>
                        <div className="w-10 md:hidden h-auto text-[20px]"><FontAwesomeIcon onClick={() => setToggle(true)} className="p-4" icon={faXmark} fill="#2f3a5b" /></div>

                        </div>

                    
                       
                        <ul onClick={() => setToggle(!toggle)} className="flex flex-col gap-3 items-center">
                        <div className="flex items-center">   
                            <svg 
                                className="w-5 h-5"
                                fill="gray-400"
                                viewBox="0 0 512 512"
                                >
                                    <path d="M200 48l112 0c4.4 0 8 3.6 8 8l0 40-128 0 0-40c0-4.4 3.6-8 8-8zm-56 8l0 40-80 0C28.7 96 0 124.7 0 160l0 96 512 0 0-96c0-35.3-28.7-64-64-64l-80 0 0-40c0-30.9-25.1-56-56-56L200 0c-30.9 0-56 25.1-56 56zM512 304l-192 0 0 16c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-16-192 0 0 112c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-112z"/>
                            </svg>
                            
                        <Link 
                        href={"/jobs"}
                        className="text-[#2f3a5b] hover:text-gray-900 px-3 py-2 rounded-md text-base font-bold"
                        >
                            Browse Jobs
                        </Link>
                        </div>
                        
                        {session ? 
                        (
                        <>
                        <div className="flex items-center">
                            <svg 
                            className="w-5 h-5"
                                fill="gray-400"
                            viewBox="0 0 512 512"
                            >
                                <path d="M91.8 32C59.9 32 32.9 55.4 28.4 86.9L.6 281.2c-.4 3-.6 6-.6 9.1L0 416c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-125.7c0-3-.2-6.1-.6-9.1L483.6 86.9C479.1 55.4 452.1 32 420.2 32L91.8 32zm0 64l328.5 0 27.4 192-59.9 0c-12.1 0-23.2 6.8-28.6 17.7l-14.3 28.6c-5.4 10.8-16.5 17.7-28.6 17.7l-120.4 0c-12.1 0-23.2-6.8-28.6-17.7l-14.3-28.6c-5.4-10.8-16.5-17.7-28.6-17.7L64.3 288 91.8 96z"/>
                            </svg>
                        <Link 
                        href={"/jobs/post"}
                        className="text-[#2f3a5b] text-base hover:text-gray-900 px-3 py-2 rounded-md font-bold"
                        >
                            Post a Job
                        </Link>
                        </div>

                        <div className="flex items-center">
                            <svg 
                                className="w-5 h-5"
                                fill="gray-400"
                                viewBox="0 0 448 512">
                                    <path d="M0 96C0 60.7 28.7 32 64 32l320 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96zm64 64l0 256 128 0 0-256-128 0zm320 0l-128 0 0 256 128 0 0-256z"/>
                            </svg>
                        <Link 
                        href="/dashboard"
                        className="text-[#2f3a5b] text-base hover:text-gray-900 px-2 py-2 rounded-md font-bold"
                        >
                            Dashboard
                        </Link>
                        </div>
                        <div className="flex items-center">
                            <svg 
                            className="w-5 h-5"
                                fill="gray-400"
                            viewBox="0 0 512 512">
                                <path d="M505 273c9.4-9.4 9.4-24.6 0-33.9L361 95c-6.9-6.9-17.2-8.9-26.2-5.2S320 102.3 320 112l0 80-112 0c-26.5 0-48 21.5-48 48l0 32c0 26.5 21.5 48 48 48l112 0 0 80c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2L505 273zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>
                            </svg>
                        <Link href=''
                        onClick={() =>
                                        signOut({
                                            callbackUrl: "/auth/signin",
                                        })
                                    }
                        className="text-[#2f3a5b] text-base hover:text-gray-900 px-2 py-2 rounded-md font-bold"
                        >
                            Sign Out
                        </Link>
                        </div>
                        </>
                        )
                        : 
                        <div>
                            <svg  
                             className="w-5 h-5"
                            fill="gray-400"
                            viewBox="0 0 512 512">
                                <path d="M345 273c9.4-9.4 9.4-24.6 0-33.9L201 95c-6.9-6.9-17.2-8.9-26.2-5.2S160 102.3 160 112l0 80-112 0c-26.5 0-48 21.5-48 48l0 32c0 26.5 21.5 48 48 48l112 0 0 80c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2L345 273zm7 143c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c53 0 96-43 96-96l0-256c0-53-43-96-96-96l-64 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l64 0c17.7 0 32 14.3 32 32l0 256c0 17.7-14.3 32-32 32l-64 0z"/>
                            </svg>
                        <Link 
                        href="/auth/signin"
                        className="text-[#2f3a5b] text-base hover:text-gray-900 px-2 py-2 rounded-md font-bold"
                        >
                            Sign in
                        </Link>
                        </div>
                        }       
                    </ul>
                    </div> 
                    </div>
                   
                )}
                
            </div>
        </nav>
    )
}