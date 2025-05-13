import companies from "../assets/companies.png";
import active from "../assets/active.png";
import offer from "../assets/briefcase.png";
import calendar from "../assets/calendar.png";
import StatCard from "../components/StatCard";
import JobCard from "../components/JobCard";
import NewJobModal from "../components/NewJobModal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconCircleArrowUpRightFilled, IconMoodSad } from "@tabler/icons-react";
import { getAllJobs } from "../utils/apis.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import HomeSkeleton from "../skeletons/HomeSkeleton.jsx";

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await getAllJobs();
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const totalApplications = jobs.length;

  const appliedThisWeek = jobs.filter((job) => {
    const jobDate = new Date(job.date);
    const now = new Date();
    const weekAgo = new Date(now.setDate(now.getDate() - 7));
    return jobDate >= weekAgo;
  }).length;

  const activeInterviews = jobs.filter(
    (job) => job.status === "In Progress"
  ).length;
  const offersReceived = jobs.filter(
    (job) => job.status === "Get Offer"
  ).length;

  return (
    <>
      <Navbar />
      {loading ? (
        <HomeSkeleton />
      ) : (
        <div className="w-[90%] md:w-[85%] mx-auto mt-10 mb-10 md:mb-20">
          {/* heading */}
          <div className="flex md:items-center justify-between gap-5 flex-col md:flex-row">
            <div>
              <h1 className="text-4xl font-bold mb-1">Dashboard</h1>
              <p className="text-gray-600">
                Track and manage your job applications
              </p>
            </div>

            <button
              onClick={openModal}
              className="bg-orange-500 px-6 py-2 rounded-md text-white hover:bg-orange-600 font-medium trasition"
            >
              Add New Application +
            </button>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            <StatCard
              icon={companies}
              count={totalApplications}
              label={"Total Applications"}
            />
            <StatCard
              icon={calendar}
              count={appliedThisWeek}
              label={"Applied This Week"}
            />
            <StatCard
              icon={active}
              count={activeInterviews}
              label={"Active Interviews"}
            />
            <StatCard
              icon={offer}
              count={offersReceived}
              label={"Offers Received"}
            />
          </div>

          <div className="mt-10">
            <h2 className="font-semibold text-xl mb-4">Job Applications</h2>

            {jobs.length === 0 ? (
              <div className="w-full text-center py-16 border border-dashed border-gray-300 rounded-md bg-white">
                <div className="flex flex-col items-center justify-center">
                  <IconMoodSad size={55} className="text-gray-400" />
                  <h3 className="text-2xl font-semibold text-gray-700 mt-4">
                    No job applications found
                  </h3>
                  <p className="text-gray-500">
                    You haven&lsquo;t added any job applications yet.
                  </p>
                  <button
                    onClick={openModal}
                    className="mt-6 px-6 py-2 bg-orange-500 text-white font-medium rounded-md hover:bg-orange-600 transition"
                  >
                    Add Your Application +
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...jobs]
                  .reverse()
                  .slice(0, 6)
                  .map((job, index) => (
                    <JobCard key={index} {...job} />
                  ))}
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end items-center gap-2">
            <Link
              to="/applications"
              className="flex items-center gap-2 hover:underline"
            >
              <p className="font-medium">All Application</p>
              <IconCircleArrowUpRightFilled size={32} />
            </Link>
          </div>

          <NewJobModal isOpen={isModalOpen} onClose={closeModal} />
        </div>
      )}
      <Footer />
    </>
  );
};

export default Home;
