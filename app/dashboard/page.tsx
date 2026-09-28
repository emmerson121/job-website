import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { prisma } from "@/lib/prisma"
import styles from "./dashboard.module.css"
import AOSWrapper from "@/components/AOSWrapper";


export default async function DashboardPage() {
    const session = await auth();


    if(!session?.user?.id) {
        redirect("/auth/signin");
    }

    const [applications, postedJobs ] = await Promise.all([
        // Applications query
        prisma.application.findMany({
            where: {
                userId: session.user.id
            },
            include: {
                job: {
                    include: {
                        postedBy: true,
                    },
                },
            },
            orderBy: {
                appliedAt: "desc"
            }
        }),

        // Jobs query
        prisma.job.findMany({
            where: {
                postedById: session.user.id,
            },
            include: {
                _count: {
                    select: {
                        applications: true,
                    },
                },
            },
            orderBy: {
                postedAt: "desc"
            }
        })
    ]);

    return(
        <AOSWrapper>
        <div
          data-aos="zoom-out-up"
          data-aos-duration="1000"
          data-aos-delay="200"
          suppressHydrationWarning
        >
        <div className="max-w-7xl mx-auto md:px-4 sm:px-6 lg:px-8">
            <h1 className="text-base md:text-2xl font-bold text-gray-900 mb-8">Dashboard</h1>

            <div className="flex flex-col md:grid md:grid-cols-2 gap-6">
                {/* {Posted Jobs Section} */}
                <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-sm md:text-xl font-semibold text-gray-900">Posted Jobs</h2>
                    <Link 
                    href="/jobs/post"
                    className="text-[#2f3a5b] hover:bg-[#2f3a5b] hover:text-blue-400 hover:p-0.5 hover:rounded-md font-medium text-sm md:text-base"
                    >
                        Post New Job
                    </Link>
                </div>

                <div className="bg-[linear-gradient(71deg,_#fff,_#fff,_#cbcdd5)] rounded-lg shadow-sm divide-y divide-gray-200">
                    {postedJobs.length === 0 ? (
                        <p className="p-6 text-gray-500 text-center text-sm md:text-base">
                            You have not posted any jobs yet.
                        </p>
                     ) : (
                        postedJobs.map((job) => (
                            <div key={job.id} className="md:p-6 p-3">
                            <div className="flex justify-between items-start gap-3">
                            <div>
                                <h3 className="text-base md:text-lg font-medium text-gray-900 mb-1">
                                    {job.title}
                                </h3>
                                <p className="text-xs md:text-base text-gray-600 mb-2">{job.company}</p>
                                <div className={`${styles.details} text-xs md:text-base text-gray-500`}>
                                    <span className="mt-1 mb-1">{job.location}</span>
                                    <span className="mx-2">-</span>
                                    <span>{job.type}</span>
                                    <span className="mx-2">-</span>
                                    <span>
                                        {formatDistanceToNow(new Date(job.postedAt), {
                                            addSuffix: true,
                                        })}
                                    </span>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-500">
                                    {job._count.applications} applications
                                </span>
                            </div>
                            </div>

                            <div className="mt-4 flex justify-end space-x-4">
                                <Link 
                                    href={`/jobs/${job.id}`}
                                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                                    >
                                        View Job
                                    </Link>
                            </div>
                            </div>
                        ))
                    )}
                </div>
                </div>
           

             {/*Applications section*/}
            <div>
                <h2 className="text-sm md:text-xl font-semibold text-gray-900 mb-6">
                    Your Applications
                </h2>

                <div className="bg-[linear-gradient(71deg,_#fff,_#fff,_#cbcdd5)] rounded-lg shadow-sm divide-y divide-gray-200">
                    {applications.length === 0 ? (
                        <p className="p-6 text-gray-500 text-center text-sm md:text-base">
                            You have not applied to any jobs yet
                        </p>
                    ) : (
                        applications.map((application) => (
                            <div key={application.id} className="p-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-base md:text-lg font-medium text-gray-900 mb-1">
                                            {application.job.title}
                                        </h3>
                                        <p className="text-gray-600 mb-2 text-xs md:text-base">
                                            {application.job.company}
                                        </p>
                                        <div className={`${styles.details} text-xs md:text-base text-gray-500`}>
                                            <span className="mb-1">{application.job.location}</span>
                                            <span className="mx-2">-</span>
                                            <span>{application.job.type}</span>
                                            <span className="mx-2">-</span>
                                            <span>
                                                Applied {""}
                                                {formatDistanceToNow(new Date(application.appliedAt),
                                                {addSuffix: true,}
                                            )}
                                            </span>
                                        </div>
                                    </div>
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            application.status === "PENDING"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : application.status === "ACCEPTED"
                                            ? "bg-green-100 text-green-800"
                                            : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {application.status}
                                    </span>
                                </div>
                                <div className="mt-4 flex justify-end">
                                    <Link 
                                        href={`/jobs/${application.job.id}`}
                                        className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                                        >
                                        View Job   
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
         </div>
        </div>
        </AOSWrapper>
    );
}