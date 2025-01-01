import React from 'react';

export default function Permission(props) {
  return (
    <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
        <div className="px-4 py-3 w-72">
          <p className="text-lg font-bold text-black truncate block capitalize">{props.data.name}</p>
          <span className="text-gray-400 mr-3 uppercase text-xs">Assigned to User: {props.data.assigned_to}</span>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">
              Status: {props.data.status}
            </p>

            <div className="ml-auto">
              <button
                onClick={() => {
                  props.openModal();
                  props.editRow(props.data);
                }}
                className="text-purple-500 hover:text-purple-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M16 3L21 8 8 21 3 21 3 16 16 3z"></path>
                </svg>
              </button>
            </div>

            <div className="ml-2">
              <button
                onClick={() => props.deletePermission(props.data.permissionid)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}
