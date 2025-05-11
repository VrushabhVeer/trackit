import { IconX } from "@tabler/icons-react";

/* eslint-disable react/prop-types */
const DeleteModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
                <div className="flex items-center justify-between">

                    <h2 className="text-xl font-semibold">Confirm Deletion</h2>

                    <IconX className="cursor-pointer" size={18} onClick={onClose} />
                </div>
                <p className="mb-6 text-gray-700 mb-6">
                            Are you sure you want to delete this job?
                        </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-gray-800"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
