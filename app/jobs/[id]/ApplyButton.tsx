"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";



// export default function ApplyButton({ jobId }: {jobId: string}) {
//     const { data: session, status } = useSession();
//     const router = useRouter();
//     const [errorMessage, setErrorMessage] = useState<string>("")
//     const [applicationStatus, setApplicationStatus] = useState<"idle" | "success" | "error">("idle")

//     const handleApply = async () => {
//         if(!session){
//             router.push("/auth/signin");
//             return;
//         }

//         setErrorMessage("");
//         setApplicationStatus("idle");

//         try {
//             await fetch(`/api/jobs/${jobId}/apply`, {
//                 method: "POST",
//             });
//             setApplicationStatus("success")
//         } catch(error){
//             if (error instanceof Error) {
//                 setErrorMessage(error.message)
//             } else {
//                 setErrorMessage("Failed to apply for the job");
//             }
//             setApplicationStatus("error")
//         }
//     };

//         if(status === "loading"){
//             return ( 
//             <button 
//             disabled
//             className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md opacity-50 cursor-not-allowed"
//              >
//                 Loading...
//             </button>
//         )
//         };

//         if(applicationStatus === "success") {
//             return (
//             <div className="text-center">
//             <p className="text-green-600 font-medium mb-4">Application submitted successfully</p>
//             <Link 
//             href={"/dashboard"}
//             className="text-indigo-600 hover:text-indigo-700 font-medium"
//             >
//                 View your applications</Link>
//             </div>
//             )
//         }
//     return(
//         <>
//         <button 
//         onClick={handleApply}
//         className="w-full bg-[#2f3a5b] text-white px-6 py-3 rounded-md hover:text-blue-400 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//             Apply for this position
//         </button>
//         {applicationStatus === "error" && (
//             <p className="mt-2 text-red-600 text-center">{errorMessage}</p>)}
//         </>
//     )
// }


type ApplicationStatus =
    | "NONE"
    | "PENDING"
    | "ACCEPTED"
    | "REJECTED";

export default function ApplyButton({
    jobId,
}: {
    jobId: string;
}) {
    const { data: session, status: sessionStatus } =
        useSession();

    const router = useRouter();

    const [applicationStatus, setApplicationStatus] =
        useState<ApplicationStatus>("NONE");

    const [loadingApplication, setLoadingApplication] =
        useState(true);

    const [applying, setApplying] = useState(false);

    const [errorMessage, setErrorMessage] =
        useState("");

    // Check application status when the page loads
    useEffect(() => {
        const checkApplicationStatus = async () => {
            // Wait for NextAuth
            if (sessionStatus === "loading") {
                return;
            }

            // User isn't logged in
            if (!session?.user?.id) {
                setApplicationStatus("NONE");
                setLoadingApplication(false);
                return;
            }

            try {
                setLoadingApplication(true);
                setErrorMessage("");

                const response = await fetch(
                    `/api/jobs/${jobId}/apply`,
                    {
                        method: "GET",
                        cache: "no-store",
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message ||
                        "Failed to check application status"
                    );
                }

                setApplicationStatus(
                    data.status ?? "NONE"
                );
            } catch (error) {
                console.error(
                    "Application status error:",
                    error
                );

                setErrorMessage(
                    "Unable to check your application status."
                );
            } finally {
                setLoadingApplication(false);
            }
        };

        checkApplicationStatus();
    }, [jobId, session, sessionStatus]);

    // Apply for job
    const handleApply = async () => {
        if (!session?.user?.id) {
            router.push("/auth/signin");
            return;
        }

        try {
            setApplying(true);
            setErrorMessage("");

            const response = await fetch(
                `/api/jobs/${jobId}/apply`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to apply for the job"
                );
            }

            // Update immediately from API response
            setApplicationStatus(
                data.status ?? "PENDING"
            );
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage(
                    "Failed to apply for the job"
                );
            }
        } finally {
            setApplying(false);
        }
    };

    // NextAuth loading
    if (sessionStatus === "loading") {
        return (
            <button
                disabled
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-md opacity-50 cursor-not-allowed"
            >
                Loading...
            </button>
        );
    }

    // Checking existing application
    if (loadingApplication && session?.user?.id) {
        return (
            <button
                disabled
                className="w-full bg-gray-500 text-white px-6 py-3 rounded-md opacity-70 cursor-not-allowed"
            >
                Checking application...
            </button>
        );
    }

    // PENDING
    if (applicationStatus === "PENDING") {
        return (
            <div className="text-center">
                <p className="text-yellow-600 font-semibold mb-2">
                    Application Pending
                </p>

                <p className="text-gray-600 text-sm mb-4">
                    Your application has been submitted
                    and is waiting for review.
                </p>

                <Link
                    href="/dashboard"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                    View your applications
                </Link>
            </div>
        );
    }

    // ACCEPTED
    if (applicationStatus === "ACCEPTED") {
        return (
            <div className="text-center">
                <p className="text-green-600 font-semibold mb-2">
                    Application Accepted
                </p>

                <p className="text-gray-600 text-sm mb-4">
                    Your application has been accepted.
                </p>

                <Link
                    href="/dashboard"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                    View your applications
                </Link>
            </div>
        );
    }

    // REJECTED
    if (applicationStatus === "REJECTED") {
        return (
            <div className="text-center">
                <p className="text-red-600 font-semibold mb-2">
                    Application Rejected
                </p>

                <p className="text-gray-600 text-sm mb-4">
                    Your application was not successful.
                </p>

                <Link
                    href="/dashboard"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                    View your applications
                </Link>
            </div>
        );
    }

    // No application yet
    return (
        <>
            <button
                onClick={handleApply}
                disabled={applying}
                className="w-full bg-[#2f3a5b] text-white px-6 py-3 rounded-md hover:text-blue-400 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {applying
                    ? "Submitting application..."
                    : "Apply for this position"}
            </button>

            {errorMessage && (
                <p className="mt-2 text-red-600 text-center">
                    {errorMessage}
                </p>
            )}
        </>
    );
}