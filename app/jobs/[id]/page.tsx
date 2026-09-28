import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import ApplyButton from "./ApplyButton";




// export default async function JobPage({
//     params
// }: {
//     params: Promise<{ id: string }>;
// }) {
//     const jobId = (await params).id;

//     const session = await auth();


//     const job = await prisma.job.findUnique({
//         where: {id: jobId},
//         include: {postedBy: true},
//     });

//     if(!job){
//         notFound();
//     }

//     // Check if the logged-in user has already applied
//     let application = null;

//     if(session?.user?.id) {
//         application = await prisma.application.findFirst({
//             where: {
//                 jobId: job.id,
//                 userId: session.user.id,
//             },
//             select: {
//                 id: true,
//                 status: true,
//             },
//         });
//     };

//     return(
//         <div className="max-w-4xl mx-auto">
//             <div className="bg-[linear-gradient(71deg,_#fff,_#fff,_#cbcdd5)] rounded-lg shadow-sm md:p-8 p-4">
//                 <div className="mb-8 ">
//                     <Link 
//                         href="/jobs"
//                         className="md:w-[120px] w-[105px] hover:text-blue-400 font-medium mb-4 flex items-center bg-[#2f3a5b] text-white text-xs md:text-sm rounded-md p-2"
//                         >
//                             ← Back to Jobs
//                     </Link>
//                     <h1 className="text-base md:text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
//                     <p className="text-xs md:text-xl text-gray-600 mb-4">{job.company}</p>
//                     <div className="flex items-center gap-4 text-gray-500 mb-6 text-xs md:text-base">
//                         <span>{job.location}</span>
//                         <span>-</span>
//                         <span>{job.type}</span>
//                         {job.salary && (
//                             <>
//                                 <span>-</span>
//                                 <span className="text-gray-900 font-medium">{job.salary}</span>
//                             </>
//                         )}
//                     </div>
//                     <div className="flex items-center text-xs md:text-sm text-gray-500">
//                         <span>{job.postedBy.name}</span>
//                         <span className="mx-2">-</span>
//                         <span>
//                             {formatDistanceToNow(new Date(job.postedAt), {addSuffix: true })}
//                         </span>
//                     </div>
//                 </div>

//                 <div className="prose max-w-none">
//                     <h2 className="text-sm md:text-xl font-semibold text-gray-900 mb-4">
//                         Job Description
//                     </h2>
//                     <div className="text-xs md:text-base text-gray-600 whitespace-pre-wrap">
//                         {job.description}
//                     </div>
//                 </div>

//                 <div className="mt-8 pt-8 border-t border-gray-200 text-sm md:text-base">
//                     <ApplyButton 
//                     jobId={job.id}
//                     applicationStatus={application?.status ?? null}
//                     />
//                 </div>
//             </div>
//         </div>
//     )
// }


export default async function JobPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: jobId } = await params;

    const job = await prisma.job.findUnique({
        where: {
            id: jobId,
        },
        include: {
            postedBy: true,
        },
    });

    if (!job) {
        notFound();
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-[linear-gradient(71deg,_#fff,_#fff,_#cbcdd5)] rounded-lg shadow-sm md:p-8 p-4">

                <div className="mb-8">

                    <Link
                        href="/jobs"
                        className="md:w-[120px] w-[105px] hover:text-blue-400 font-medium mb-4 flex items-center bg-[#2f3a5b] text-white text-xs md:text-sm rounded-md p-2"
                    >
                        ← Back to Jobs
                    </Link>

                    <h1 className="text-base md:text-3xl font-bold text-gray-900 mb-2">
                        {job.title}
                    </h1>

                    <p className="text-xs md:text-xl text-gray-600 mb-4">
                        {job.company}
                    </p>

                    <div className="flex items-center gap-4 text-gray-500 mb-6 text-xs md:text-base">
                        <span>{job.location}</span>

                        <span>-</span>

                        <span>{job.type}</span>

                        {job.salary && (
                            <>
                                <span>-</span>

                                <span className="text-gray-900 font-medium">
                                    {job.salary}
                                </span>
                            </>
                        )}
                    </div>

                    <div className="flex items-center text-xs md:text-sm text-gray-500">
                        <span>{job.postedBy.name}</span>

                        <span className="mx-2">-</span>

                        <span>
                            {formatDistanceToNow(
                                new Date(job.postedAt),
                                {
                                    addSuffix: true,
                                }
                            )}
                        </span>
                    </div>
                </div>

                <div className="prose max-w-none">

                    <h2 className="text-sm md:text-xl font-semibold text-gray-900 mb-4">
                        Job Description
                    </h2>

                    <div className="text-xs md:text-base text-gray-600 whitespace-pre-wrap">
                        {job.description}
                    </div>

                </div>

                <div className="mt-8 pt-8 border-t border-gray-200 text-sm md:text-base">

                    <ApplyButton jobId={job.id} />

                </div>

            </div>
        </div>
    );
}

