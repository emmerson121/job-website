import { prisma } from "@/lib/prisma";
import Link from "next/link";


export default async function Home() {
  const recentJobs = await prisma.job.findMany({
    take: 3,
    orderBy: {
      postedAt: "desc"
    },
    include: {
      postedBy: {
        select: {
          name: true,
        },
      },
    },
  });

  return (  
      <div>
        {/*Hero Section*/}
        <section className="text-center py-20 bg-[linear-gradient(71deg,_#fff,_#fff,_#cbcdd5)] rounded-lg shadow-sm">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            Find Your Dream Job
          </h1>
          <p className="text-xs md:text-xl text-gray-600 mb-8">
            Discover thousands of job opportunities with top companies.
          </p>
          <Link 
          href="/jobs"
          className="bg-[#2f3a5b] text-white px-6 py-3 rounded-md text-sm md:text-lg font-medium hover:bg-blue-900"
          >
            Browse Jobs
          </Link>
        </section>

        {/*Recent Jobs Section*/}
        <section>
          <h2 className="text-base md:text-2xl font-bold text-gray-900 mb-6 mt-6">Recent Jobs</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentJobs.map((job) => (
              <div 
              key={job.id} 
              className="bg-[linear-gradient(71deg,_#fff,_#fff,_#cbcdd5)] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-base md:text-xl font-semibold text-gray-900 mb-2">
                  {job.title}
                </h3>
                <p className="text-gray-600 mb-2 text-xs md:text-base">{job.company}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span className="mr-4">{job.location}</span>
                  <span>{job.type}</span>
                </div>
                <p className="text-gray-600 mb-4 line-clamp-2 text-xs md:text-base">
                  {job.description}
                </p>
                <Link 
                  href={`/jobs/${job.id}`}
                  className="text-indigo-600 hover:text-indigo-700 font-medium text-xs md:text-base"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8 flex justify-center items-center gap-2 bg-[#2f3a5b] hover:bg-blue-900 p-2 w-[150px] rounded-lg mx-auto">
            <Link 
            href="/jobs"
            className="text-white font-medium text-sm md:text-lg"
            >
              View All Jobs
            </Link>
            <svg width={20} height={18} fill="white" viewBox="0 0 512 512"><path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/></svg>
          </div>
        </section>
      </div>
      
  );
}
