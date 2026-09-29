import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white flex items-center justify-center px-4">
      <Helmet>
        <title>Page Not Found | Carry Exchange</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="text-center max-w-md">
        <p className="text-purple-400 text-sm font-semibold uppercase tracking-widest mb-4">
          404
        </p>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Page not found</h1>
        <p className="text-gray-400 mb-8">
          This page doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all font-medium"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
