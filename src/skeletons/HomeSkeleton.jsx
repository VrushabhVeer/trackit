const StatCardSkeleton = () => (
    <div className="bg-white border rounded-lg p-4 shadow-sm animate-pulse">
        <div className="h-4 w-2/3 bg-gray-300 rounded mb-3"></div>
        <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
    </div>
);

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

const Homeskeleton = () => {
    return (
        <div className="w-[90%] md:w-[85%] mx-auto mt-10 mb-10 md:mb-20">

            {/* Top Heading and Button */}
            <div className="flex md:items-center justify-between gap-5 flex-col md:flex-row animate-pulse">
                <div>
                    <div className="h-8 w-48 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 w-72 bg-gray-200 rounded"></div>
                </div>
                <div className="h-10 w-48 bg-gray-300 rounded"></div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
                {Array(4).fill(0).map((_, index) => (
                    <StatCardSkeleton key={index} />
                ))}
            </div>

            {/* Job Applications Heading */}
            <div className="mt-10 mb-4">
                <div className="h-6 w-56 bg-gray-300 rounded animate-pulse"></div>
            </div>

            {/* Job Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                {Array(6).fill(0).map((_, index) => (
                    <JobCardSkeleton key={index} />
                ))}
            </div>

            {/* View All Applications Link */}
            <div className="mt-6 flex justify-end animate-pulse">
                <div className="h-10 w-48 bg-gray-300 rounded"></div>
            </div>
        </div>
    );
};

export default Homeskeleton;
