/* eslint-disable react/prop-types */
import { IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { addJob, getAllJobs, updateJob } from "../utils/apis.js";

const NewJobModal = ({ isOpen, onClose, mode = "add", initialData = {} }) => {
    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        company: "",
        position: "",
        location: "",
        status: "Applied",
        date: today,
        platform: "",
        website: "",
        notes: "",
        ...initialData,
    });

    useEffect(() => {
        if (mode === "edit" && initialData) {
            setFormData((prev) => ({ ...prev, ...initialData }));
        }
    }, [initialData, mode]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (mode === "edit") {
                const res = await updateJob(initialData._id, formData);
                if (res.status === 200) {
                    toast.success("Job updated successfully");
                    getAllJobs();
                    onClose();
                    return;
                }
            } else {
                const res = await addJob(formData);
                if (res.status === 201) {
                    toast.success("Job added successfully");
                    getAllJobs();
                    onClose();
                    return;
                }
            }
            getAllJobs();
        } catch (error) {
            toast.error("Something went wrong!");
            console.error(error);
        }
    };

    const buttonLabel = mode === "edit" ? "Update Job" : "Add Job";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-lg">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Add New Job</h2>

                    <IconX className="cursor-pointer" size={18} onClick={onClose} />
                </div>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full">
                            <label htmlFor="company" className="block font-medium mb-1">
                                Company <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full border px-4 py-2 rounded-lg"
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="position" className="block font-medium mb-1">
                                Position <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="position"
                                name="position"
                                value={formData.position}
                                onChange={handleChange}
                                className="w-full border px-4 py-2 rounded-lg"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full">
                            <label htmlFor="location" className="block font-medium mb-1">
                                Location <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full border px-4 py-2 rounded-lg"
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="status" className="block font-medium mb-1">
                                Status
                            </label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full border px-4 py-2 rounded-lg"
                            >
                                <option value="Applied">Applied</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Get Offer">Get Offer</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full">
                            <label htmlFor="date" className="block font-medium mb-1">
                                Application Date <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full border px-4 py-2 rounded-lg"
                                required
                            />
                        </div>
                        <div className="w-full">
                            <label htmlFor="platform" className="block font-medium mb-1">
                                Platform
                            </label>
                            <input
                                type="text"
                                id="platform"
                                name="platform"
                                list="platform-options"
                                value={formData.platform}
                                onChange={handleChange}
                                className="w-full border px-4 py-2 rounded-lg"
                                placeholder="e.g. LinkedIn, Indeed"
                            />
                            <datalist id="platform-options">
                                <option value="Indeed" />
                                <option value="LinkedIn" />
                                <option value="Company Website" />
                                <option value="Email" />
                                <option value="Glassdoor" />
                                <option value="Referral" />
                                <option value="Naukri" />
                            </datalist>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="website" className="block font-medium mb-1">
                            Company Website
                        </label>
                        <input
                            type="url"
                            id="website"
                            name="website"
                            value={formData.website}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded-lg"
                            placeholder="https://example.com"
                        />
                    </div>

                    <div>
                        <label htmlFor="notes" className="block font-medium mb-1">
                            Notes
                        </label>
                        <textarea
                            id="notes"
                            name="notes"
                            rows={4}
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full border px-4 py-2 rounded-lg"
                            placeholder="Add any additional notes"
                        />
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-orange-500 text-white rounded"
                        >
                            {buttonLabel}
                        </button>
                    </div>
                </form>
            </div>
            <Toaster />
        </div>
    );
};

export default NewJobModal;
