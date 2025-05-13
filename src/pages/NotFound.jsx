import { Link } from "react-router-dom";
import { IconHome } from "@tabler/icons-react";

function NotFound() {
  return (
    <div className="container-custom py-20 flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Page Not Found
      </h2>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        The page you&apos;re looking for doesn&lsquo;t exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary flex items-center gap-2">
        <IconHome size={18} />
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;
