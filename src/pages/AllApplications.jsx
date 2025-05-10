import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import axios from "axios";

const jobData = [
    {
        company: "Amazon",
        position: "Frontend Developer",
        location: "Seattle, WA",
        platform: "Indeed",
        date: "20 May, 2025",
        status: "Applied",
        website: "https://www.amazon.jobs",
    },
    {
        company: "Google",
        position: "Software Engineer",
        location: "Mountain View, CA",
        platform: "LinkedIn",
        date: "18 May, 2025",
        status: "In Progress",
        website: "https://careers.google.com",
    },
    {
        company: "Microsoft",
        position: "Product Manager",
        location: "Redmond, WA",
        platform: "Company Website",
        date: "15 May, 2025",
        status: "Get Offer",
        website: "https://careers.microsoft.com",
    },
    {
        company: "Netflix",
        position: "UI/UX Designer",
        location: "Los Gatos, CA",
        platform: "Glassdoor",
        date: "22 April, 2025",
        status: "Rejected",
        website: "https://jobs.netflix.com",
    },
    {
        company: "Latitude Technolabs",
        position: "Mobile Engineer",
        location: "San Francisco, CA",
        platform: "Company Website",
        date: "5 May, 2025",
        status: "Get Offer",
        website: "https://latitudetechnolabs.com/",
    },
    {
        company: "Shopify",
        position: "Backend Developer",
        location: "Remote",
        platform: "Company Website",
        date: "25 April, 2025",
        status: "Applied",
        website: "https://www.shopify.com/careers",
    },
    {
        company: "Stripe",
        position: "DevOps Engineer",
        location: "San Francisco, CA",
        platform: "Indeed",
        date: "1 May, 2025",
        status: "In Progress",
        website: "https://stripe.com/jobs",
    },
    {
        company: "Airbnb",
        position: "Mobile Engineer",
        location: "San Francisco, CA",
        platform: "Company Website",
        date: "5 May, 2025",
        status: "Get Offer",
        website: "https://careers.airbnb.com",
    },
];

const AllApplications = () => {
    const [jobs, setJobs] = useState([]);
    const fetchJobs = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/jobs/all");
            setJobs(response.data);
            console.log("Jobs fetched successfully:", response.data);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    }

    useEffect(() => {
        fetchJobs();
    }, [])

    return (
        <div className="w-[90%] md:w-[85%] mx-auto mt-10 mb-10 md:mb-20">
            <div>
                <h1 className="text-4xl font-bold mb-1">Applied Job</h1>
                <p className="text-gray-600">
                    Here are all your applied job applications
                </p>
            </div>

            <div className="mt-4 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobData.map((job, index) => (
                    <JobCard key={index} {...job} />
                ))}
            </div>
        </div>
    );
};

export default AllApplications;
