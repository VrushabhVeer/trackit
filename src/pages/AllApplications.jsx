import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import axios from "axios";

const AllApplications = () => {
    const [jobs, setJobs] = useState([]);
    const token = localStorage.getItem("token");

    const fetchJobs = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/jobs/all", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
                {jobs.map((job, index) => (
                    <JobCard key={index} {...job} />
                ))}
            </div>
        </div>
    );
};

export default AllApplications;
