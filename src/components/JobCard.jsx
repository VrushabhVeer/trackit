/* eslint-disable react/prop-types */
import { useMemo } from "react";
import pin from "../assets/location.png";
import globe from "../assets/globe.png";
import remove from "../assets/delete.png";
import edit from "../assets/edit.png";
import { Link } from "react-router-dom";

const bgColors = [
  "bg-blue-100", "bg-pink-100", "bg-green-100", "bg-yellow-100", "bg-purple-100",
  "bg-red-100", "bg-indigo-100", "bg-teal-100", "bg-orange-100", "bg-cyan-100",
  "bg-rose-100", "bg-lime-100", "bg-amber-100", "bg-emerald-100", "bg-violet-100",
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
    status,
    company,
    position,
    location,
    platform,
    website,
    date,
}) => {
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
        <div className="p-2 border rounded-xl bg-white shadow-sm hover:shadow-md">
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
                    <p className="font-semibold">{date}</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="bg-black rounded-full px-2 py-2">
                        <img className="w-5" src={remove} alt="delete-icon" />
                    </button>
                    <button className="bg-black rounded-full px-2 py-2">
                        <img className="w-5" src={edit} alt="edit-icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
