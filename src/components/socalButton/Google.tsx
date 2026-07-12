import React from 'react';
import { FaGoogle } from 'react-icons/fa6';

const Google = () => {
  return (
    <div>
      <button className="flex w-full items-center justify-center gap-2 py-3 bg-[#050508]/80 border border-gray-900 hover:border-gray-700 rounded-xl text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 cursor-pointer active:scale-95">
        <FaGoogle className="w-4 h-4 text-gray-400 group-hover:text-white" />
        <span className="text-xs">Google</span>
      </button>
    </div>
  );
};

export default Google;
