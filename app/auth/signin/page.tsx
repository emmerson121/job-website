"use client"

import { loginWithGitHub, loginWithGoogle } from "@/lib/auth"

export default function SigninPage() {
    return(
        <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 bg-[linear-gradient(71deg,_#fff,_#fff,_#cbcdd5)] md:p-8 p-4 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="text-base md:text-3xl font-bold text-gray-900 mb-2">
                        Welcome to the JobBoard</h2>
                    <p className="text-gray-600 text-xs md:text-base">
                        Sign in to post jobs or apply for opportunities
                    </p>
                

                <div className="mt-5 mb-5">
                    <button 
                        onClick={loginWithGoogle} className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                        <div className="">
                        <svg 
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 512 512">
                        <path d="M500 261.8C500 403.3 403.1 504 260 504 122.8 504 12 393.2 12 256S122.8 8 260 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9c-88.3-85.2-252.5-21.2-252.5 118.2 0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9l-140.8 0 0-85.3 236.1 0c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>
                        </div>
                        <span className="text-xs md:text-base font-medium">Continue with Google</span>
                    </button>
                </div>


                {/* <div className="text-black text-xs text-center font-bold">OR</div> */}


                <div className="mt-5">
                    <button 
                        onClick={loginWithGitHub} className="w-full flex items-center justify-center gap-3  py-3 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200">
                        <div className="">
                        <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 512 512"
                        aria-hidden="true"
                        >
                            <path 
                            fillRule="evenodd"
                            d="M216.5 362.5c-66-8-112.5-55.5-112.5-117 0-25 9-52 24-70-6.5-16.5-5.5-51.5 2-66 20-2.5 47 8 63 22.5 19-6 39-9 63.5-9s44.5 3 62.5 8.5c15.5-14 43-24.5 63-22 7 13.5 8 48.5 1.5 65.5 16 19 24.5 44.5 24.5 70.5 0 61.5-46.5 108-113.5 116.5 17 11 28.5 35 28.5 62.5l0 52C323 491.5 335.5 500 350.5 494 441 459.5 512 369 512 257 512 115.5 397 0 255.5 0S0 115.5 0 257c0 111 70.5 203 165.5 237.5 13.5 5 26.5-4 26.5-17.5l0-40c-7 3-16 5-24 5-33 0-52.5-18-66.5-51.5-5.5-13.5-11.5-21.5-23-23-6-.5-8-3-8-6 0-6 10-10.5 20-10.5 14.5 0 27 9 40 27.5 10 14.5 20.5 21 33 21s20.5-4.5 32-16c8.5-8.5 15-16 21-21z"
                            clipRule="evenodd" width={"100%"} height={"100%"} 
                            />
                        </svg>
                        </div>
                        <span className="text-xs md:text-base font-medium">Continue with GitHub</span>
                    </button>
                </div>
            </div>
                <div className="mt-6 text-center text-xs md:text-[13px] text-gray-500">
                    By signing in, you agree to our 
                    <a href="a" className="text-indigo-600 hover:text-indigo-500">
                        {" "}Terms of Service 
                    </a> {" "}
                     and {" "}
                    <a href="a" className="text-indigo-600 hover:text-indigo-500">
                        Privacy Policy
                    </a>
                </div>
            </div>
        </div>
    )
}