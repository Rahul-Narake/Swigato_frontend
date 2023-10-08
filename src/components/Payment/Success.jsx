import React from 'react';
import { Link } from 'react-router-dom';
export default function Success() {
  return (
    <div className="flex justify-center items-center min-h-screen flex-col space-y-3">
      <h1 className="text-xl text-green-600 font-semibold">
        Payment done successfully.
      </h1>
      <Link to={'/'} className="px-2 py-1 rounded-md bg-pink-500 text-white">
        Visit Home
      </Link>
    </div>
  );
}
