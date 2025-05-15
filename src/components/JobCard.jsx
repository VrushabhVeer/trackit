/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import pin from "../assets/location.png";
import globe from "../assets/globe.png";
import remove from "../assets/delete.png";
import edit from "../assets/edit.png";
import { Link } from "react-router-dom";
import DeleteModal from "./DeleteModal";
import toast, { Toaster } from "react-hot-toast";
import NewJobModal from "./NewJobModal";
import { deleteJob, getAllJobs } from "../utils/apis.js";

const bgColors = [
  "bg-blue-50",
  "bg-pink-50",
  "bg-green-50",
  "bg-yellow-50",
  "bg-purple-50",
  "bg-red-50",
  "bg-indigo-50",
  "bg-teal-50",
  "bg-orange-50",
  "bg-cyan-50",
  "bg-rose-50",
  "bg-lime-50",
  "bg-amber-50",
  "bg-emerald-50",
  "bg-violet-50",
];

const getStatusColor = (status) => {
  switch (status) {
    case "Applied":
      return "text-blue-600";
    case "In Progress":
      return "text-yellow-600";
    case "Rejected":
      return "text-red-600";
    case "Get Offer":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
};

const JobCard = ({
  _id,
  status,
  company,
  position,
  location,
  platform,
  website,
  date,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await deleteJob(_id);
      if (response.status === 200 || response.status === 204) {
        toast.success("Application deleted successfully");
        setShowModal(false);
        getAllJobs();
      } else {
        toast.error("Failed to delete job");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Error deleting job");
    }
  };

  const randomBg = useMemo(() => {
    const index = Math.floor(Math.random() * bgColors.length);
    return bgColors[index];
  }, []);

  const statusTextColor = getStatusColor(status);

  const getDomainFromURL = (url) => {
    try {
      const domain = new URL(url).hostname.replace(/^www\./, "");
      return domain;
    } catch {
      return null;
    }
  };

  const domain = getDomainFromURL(website);
  const logoUrl = domain ? `https://logo.clearbit.com/${domain}` : null;

  return (
    <div className="p-2 border border-gray-300 rounded-xl bg-white shadow-sm hover:shadow-md">
      <div className={`p-4 rounded-lg ${randomBg}`}>
        <h3
          className={`px-3 py-1 ${statusTextColor} font-medium rounded-full bg-white inline-block w-auto text-sm`}
        >
          {status}
        </h3>

        <div className="flex items-center gap-2 mt-4 mb-2">
          <div>
            {logoUrl && (
              <img
                src={logoUrl}
                alt={`${company} logo`}
                className="inline-block w-8 h-8 object-cover align-middle rounded"
              />
            )}
          </div>
          <p className="font-semibold underline">
            <Link to={website} target="_blank">
              {company}
            </Link>
          </p>
        </div>
        <h2 className="text-xl font-semibold">{position}</h2>

        <div className="mt-1 flex items-center gap-1">
          <img src={pin} alt="location" className="w-4" />
          <p>{location}</p>
        </div>

        <div className="mt-1 flex items-center gap-1">
          <img src={globe} alt="platform" className="w-4" />
          <p>Applied via {platform}</p>
        </div>
      </div>

      <div className="p-3 flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">Applied On</p>
          <p className="font-semibold">
            {new Date(date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowModal(true)}
            className="bg-black rounded-full px-2 py-2"
          >
            <img className="w-5" src={remove} alt="delete-icon" />
          </button>
          <button onClick={() => setEditModalOpen(true)} className="bg-black rounded-full px-2 py-2">
            <img className="w-5" src={edit} alt="edit-icon" />
          </button>
        </div>
      </div>

      <DeleteModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      />

      <NewJobModal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        mode="edit"
        initialData={{
          _id,
          company,
          position,
          location,
          status,
          date,
          platform,
          website,
          notes: "",
        }}
      />

      <Toaster />
    </div>
  );
};

export default JobCard;
