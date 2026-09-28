import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


// export async function POST(request: Request, {
//     params
// }: {
//     params: Promise<{ jobId: string}> 
// }) {
//     const session = await auth();

//     if(!session?.user || !session.user.id){
//         return  NextResponse.redirect(new URL("/auth/signin", request.url));
//     }

//     try{
//         const { jobId } = await params;
//         const job = await prisma.job.findUnique({ where: {id: jobId} });

//         if(!job) {
//             return new NextResponse("Job not found", {status: 400})
//         }

//         const existingApplication = await prisma.application.findFirst({
//             where: {
//                 jobId: jobId,
//                 userId: session.user.id
//             }
//         });

//         if(existingApplication) {
//             return new NextResponse("You have already applied for this job", {status: 400});
//         }

//         const application = await prisma.application.create({
//             data: {
//                 jobId: jobId,
//                 userId: session.user.id,
//                 status: "PENDING",
//             }
//         })
        
//         return NextResponse.json(application)
//     } catch(error) {
//         return new NextResponse("Internal server error", {status: 500})
//     }
// }



// GET - Check whether the current user has applied for this job
export async function GET(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ jobId: string }>;
    }
) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json(
            { status: "NONE" },
            { status: 200 }
        );
    }

    try {
        const { jobId } = await params;

        const application = await prisma.application.findFirst({
            where: {
                jobId: jobId,
                userId: session.user.id,
            },
            select: {
                id: true,
                status: true,
            },
        });

        if (!application) {
            return NextResponse.json({
                status: "NONE",
            });
        }

        return NextResponse.json({
            id: application.id,
            status: application.status,
        });
    } catch (error) {
        console.error("Error checking application:", error);

        return NextResponse.json(
            {
                message: "Failed to check application status",
            },
            { status: 500 }
        );
    }
}


// POST - Apply for the job
export async function POST(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ jobId: string }>;
    }
) {
    const session = await auth();

    if (!session?.user?.id) {
        return NextResponse.json(
            {
                message: "You must be logged in to apply",
            },
            { status: 401 }
        );
    }

    try {
        const { jobId } = await params;

        const job = await prisma.job.findUnique({
            where: {
                id: jobId,
            },
        });

        if (!job) {
            return NextResponse.json(
                {
                    message: "Job not found",
                },
                { status: 404 }
            );
        }

        const existingApplication =
            await prisma.application.findFirst({
                where: {
                    jobId: jobId,
                    userId: session.user.id,
                },
            });

        if (existingApplication) {
            return NextResponse.json(
                {
                    message:
                        "You have already applied for this job",
                    status: existingApplication.status,
                },
                { status: 400 }
            );
        }

        const application =
            await prisma.application.create({
                data: {
                    jobId: jobId,
                    userId: session.user.id,
                    status: "PENDING",
                },
            });

        return NextResponse.json(
            {
                id: application.id,
                status: application.status,
                message:
                    "Application submitted successfully",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Application error:", error);

        return NextResponse.json(
            {
                message: "Internal server error",
            },
            { status: 500 }
        );
    }
}