import React from "react";
import { MdClose } from "react-icons/md";
import moment from "moment";

const ViewNoteModal = ({ noteData, onClose }) => {
  return (
    <div className="relative bg-white p-4 md:p-6 rounded-xl shadow-2xl w-full max-w-full mx-auto transform transition-all scrollbar-hide">
      {/* Close Button */}
      <button
        className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center absolute -top-4 -right-4 bg-gray-100 hover:bg-gray-200 transition-colors duration-300 shadow-md focus:outline-none"
        onClick={onClose}
        aria-label="Close modal"
      >
        <MdClose className="text-xl text-red-500" />
      </button>

      {/* Note Header (Title and Date) */}
      <div className="mb-3 pb-3 border-b border-gray-200">
        <h2 className="text-xl md:text-xl font-bold text-gray-800">
          {noteData.title}
        </h2>
        <span className="text-xs text-slate-500 mt-1 block">
          {moment(noteData.createdOn).format("Do MMM YYYY")}
        </span>
      </div>

      {/* Note Content */}
      <p className="text-sm md:text-base text-gray-700 whitespace-pre-wrap mb-4 leading-relaxed">
        {noteData.content}
      </p>

      {/* Tags Section */}
      {noteData.tags && noteData.tags.length > 0 && (
        <div className="pt-3 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-700 mb-1">Tags:</p>
          <div className="flex flex-wrap gap-2 text-xs text-slate-500">
            {noteData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-100 px-2 py-0.5 rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewNoteModal;
