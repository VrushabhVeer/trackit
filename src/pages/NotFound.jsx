import { Link } from "react-router-dom";
import { IconMoodConfuzed } from "@tabler/icons-react";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="text-9xl font-bold mb-2">
          4<span className="text-orange-500">0</span>4
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="w-[90%] text-lg text-gray-600 max-w-md mb-8">
          The page you&apos;re looking for doesn&lsquo;t exist or has been
          moved.
        </p>
        <Link
          to="/"
          className="btn btn-primary flex items-center gap-1 bg-orange-50 p-2 rounded-lg text-orange-500 font-semibold border-b-2 border-orange-300"
        >
          <IconMoodConfuzed size={28} />
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
