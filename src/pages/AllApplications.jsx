import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import { IconMoodSad, IconSearch, IconAdjustmentsHorizontal } from "@tabler/icons-react";
import { getAllJobs } from "../utils/apis.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import AllApplicationsSkeleton from "../skeletons/AllApplicationsSkeleton.jsx";

const AllApplications = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = ["All", "Applied", "In Progress", "Rejected", "Get Offer"];

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getAllJobs();
      setJobs(response.data);
      setFilteredJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    // Apply filters whenever searchTerm or statusFilter changes
    let results = jobs;

    // Apply status filter
    if (statusFilter !== "All") {
      results = results.filter(job => job.status === statusFilter);
    }

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(job => 
        job.company.toLowerCase().includes(term) || 
        job.date.toLowerCase().includes(term) ||
        job.position.toLowerCase().includes(term)
      );
    }

    setFilteredJobs(results);
  }, [searchTerm, statusFilter, jobs]);

  return (
    <>
      <Navbar />
      {loading ? (
        <AllApplicationsSkeleton />
      ) : (
        <div className="w-[90%] md:w-[85%] mx-auto mt-10 mb-10 md:mb-20">
          <div>
            <h1 className="text-4xl font-bold mb-1">Applied Job</h1>
            <p className="text-gray-600">
              Here are all your applied job applications
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="mt-6 mb-6 flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IconSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 sm:text-sm"
                placeholder="Search by company, date & position applied"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Button (Mobile) */}
            <button
              className="md:hidden flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 font-medium hover:bg-gray-50"
              onClick={() => setShowFilters(!showFilters)}
            >
              <IconAdjustmentsHorizontal size={18} />
              <span>Filter</span>
            </button>

            {/* Status Filter (Desktop) */}
            <div className="hidden md:flex gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    statusFilter === status
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Filters (shown when toggled) */}
          {showFilters && (
            <div className="mb-6 md:hidden grid grid-cols-2 gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    statusFilter === status
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => {
                    setStatusFilter(status);
                    setShowFilters(false);
                  }}
                >
                  {status}
                </button>
              ))}
            </div>
          )}

          {filteredJobs.length === 0 ? (
            <div className="mt-10 w-full text-center py-16 border border-dashed border-gray-300 rounded-md bg-white">
              <div className="flex flex-col items-center justify-center">
                <IconMoodSad size={55} className="text-gray-400" />
                <h3 className="text-2xl font-semibold text-gray-700 mt-4">
                  {jobs.length === 0 
                    ? "No job applications found" 
                    : "No matching applications found"}
                </h3>
                <p className="text-gray-500">
                  {jobs.length === 0
                    ? "You haven't added any job applications yet."
                    : "Try adjusting your search or filter criteria."}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-4 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...filteredJobs].reverse().map((job, index) => (
                <JobCard key={index} {...job} />
              ))}
            </div>
          )}
        </div>
      )}
      <Footer />
    </>
  );
};

export default AllApplications;