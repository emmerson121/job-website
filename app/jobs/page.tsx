import { prisma } from "@/lib/prisma"
import Link from "next/link";
import styles from "./jobs.module.css"
import AOSWrapper from "@/components/AOSWrapper";


export default async function JobsPage({
  searchParams
}: {
  searchParams: Promise<{[key: string]: string | string[] | undefined}>
}) {
    const {q, type, location } = await searchParams;

    const query = q as string | undefined;
    const searchType = type as string | undefined;
    const searchLocation = location as string | undefined;

    const jobs = await prisma.job.findMany({
      where: {
        AND: [
          query 
          ? {
            OR: [
              {title: { contains: query } },
              {company: { contains: query } },
              {location: { contains: query, } },
            ],
          }
          : {},
          type ? {type: searchType} : {},
          searchLocation ? {location: searchLocation} : {}
        ],
      },
        orderBy: {postedAt: "desc"},
        include: {postedBy: true},
    });
    
    return(
      <AOSWrapper>
        <div
          data-aos="fade-down"
          data-aos-duration="1000"
          data-aos-delay="200"
          suppressHydrationWarning
        >
        <div className="space-y-8">
            <div className="bg-[linear-gradient(71deg,_#fff,_#fff,_#cbcdd5)] p-6 rounded-lg shadow-sm">
                <h1 className="text-base md:text-2xl font-bold text-gray-900 mb-6">Find Jobs</h1>
                <form className="grid gap-4 md:grid-cols-3">
                    <input 
                        type="text" 
                        name="q"
                        placeholder="Search jobs..."
                        className="border border-[#a7a2a2] border-solid rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600 text-xs md:text-base"
                        />

                        <select 
                            name="type"
                            className="border border-[#a7a2a2] border-solid rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600 text-xs md:text-base"
                            >
                                <option value="">All Types</option>
                                <option value="Full-Time">Full-Time</option>
                                <option value="Part-Time">Part-Time</option>
                                <option value="Contract">Contract</option>
                                <option value="Internship">Internship</option>
                        </select>

                        <input 
                        type="text" 
                        name="location"
                        placeholder="Location"
                        className="border border-[#a7a2a2] border-solid rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-600 text-xs md:text-base"
                        />

                        <button
                            type="submit"
                            className="md:col-span-3 bg-[#2f3a5b] text-white px-4 py-2 rounded-md hover:bg-blue-900 text-sm md:text-base"
                        >
                            Search
                        </button>
                </form>
            </div>

            {jobs.map((job) => (
  <div
    key={job.id}
    className="bg-[linear-gradient(71deg,_#fff,_#fff,_#cbcdd5)] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-base md:text-xl font-semibold text-gray-900 mb-2">
          {job.title}
        </h2>

        <p className="text-gray-600 mb-2 text-xs md:text-base">
          {job.company}
        </p>

        <div className="flex items-center text-xs text-gray-500 mb-4">
          <span className="mr-4">{job.location}</span>
          <span>{job.type}</span>
        </div>

        <p className="text-gray-600 text-xs md:text-base mb-4 line-clamp-2">
          {job.description}
        </p>
      </div>

      {job.salary && (
        <span className="text-base md:text-lg font-semibold text-gray-900">
          {job.salary}
        </span>
      )}
    </div>

    <div className="flex justify-between items-center">
      <span className="text-xs text-gray-500">
        Posted by {job.postedBy.name}
    </span>
    <div className={`${styles.card} flex items-center gap-2 bg-[#2f3a5b] hover:bg-blue-900 md:text-base md:w-[140px] rounded-md p-2.5 text-sm`}>
    <Link 
        href={`/jobs/${job.id}`}
        className="text-white md:text-base text-[10px]"
        >
            View Details
        </Link>
        <svg 
          width={18} 
          height={18} 
          fill="white" 
          viewBox="0 0 512 512">
            <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"/>
        </svg>
        </div>
    </div>
  </div>
))}
        </div>
      </div>
        </AOSWrapper>
    )
}