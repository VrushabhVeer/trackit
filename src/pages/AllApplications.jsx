import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import axios from "axios";
import { IconMoodSad } from "@tabler/icons-react";

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
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="w-[90%] md:w-[85%] mx-auto mt-10 mb-10 md:mb-20">
      <div>
        <h1 className="text-4xl font-bold mb-1">Applied Job</h1>
        <p className="text-gray-600">
          Here are all your applied job applications
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="mt-10 w-full text-center py-16 border border-dashed border-gray-300 rounded-md bg-white">
          <div className="flex flex-col items-center justify-center">
            <IconMoodSad size={55} className="text-gray-400" />
            <h3 className="text-2xl font-semibold text-gray-700 mt-4">
              No job applications found
            </h3>
            <p className="text-gray-500">
              You haven&lsquo;t added any job applications yet.
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-4 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllApplications;
