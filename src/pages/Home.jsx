import companies from "../assets/companies.png";
import active from "../assets/active.png";
import offer from "../assets/briefcase.png";
import calendar from "../assets/calendar.png";
import StatCard from "../components/StatCard";
import JobCard from "../components/JobCard";
import NewJobModal from "../components/NewJobModal";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { IconCircleArrowUpRightFilled } from "@tabler/icons-react";

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

const Home = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

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
          className="bg-orange-500 px-6 py-2 rounded-md text-white hover:bg-600 font-medium"
        >
          Add New Job +
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <StatCard icon={companies} count={4} label={"Total Applications"} />
        <StatCard icon={calendar} count={8} label={"Applied This Week"} />
        <StatCard icon={active} count={4} label={"Active Interviews"} />
        <StatCard icon={offer} count={1} label={"Offers Received"} />
      </div>

      {/* job applications cards */}
      <div className="mt-10">
        <h2 className="font-semibold text-xl">Job Applications</h2>

        <div className="mt-4 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobData.slice(0, 6).map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
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
  );
};

export default Home;
