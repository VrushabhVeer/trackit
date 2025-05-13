const JobCardSkeleton = () => (
    <div className="bg-white border rounded-lg p-4 shadow-sm animate-pulse flex flex-col justify-between h-40">
        <div>
            <div className="h-4 w-3/4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
        </div>
        <div className="flex justify-between">
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
            <div className="h-8 w-24 bg-gray-300 rounded"></div>
        </div>
    </div>
);

const AllApplicationsSkeleton = () => {
    return (
        <div className="w-[90%] md:w-[85%] mx-auto mt-10 mb-10 md:mb-20">
            {/* Heading */}
            <div className="animate-pulse mb-6">
                <div className="h-8 w-48 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 w-72 bg-gray-200 rounded"></div>
            </div>

            {/* Job Card Skeletons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {Array(6).fill(0).map((_, index) => (
                    <JobCardSkeleton key={index} />
                ))}
            </div>
        </div>
    );
};

export default AllApplicationsSkeleton;
