import React from 'react';
import { Link } from 'react-router-dom';

export default function Cancel() {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col space-y-3">
      <h1 className="text-xl text-red-600 font-semibold">
        Some Error occured try again
      </h1>
      <Link to={'/'} className="px-2 py-1 rounded-md bg-pink-500 text-white">
        Visit Home
      </Link>
    </div>
  );
}
