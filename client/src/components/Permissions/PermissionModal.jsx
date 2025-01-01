import React from 'react';
import EditPermissionForm from './EditPermissionForm';

const PermissionModal = ({ isOpen, closeModal, editing, currentPermission, updatePermission, addPermission }) => {
  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen">
        <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        <div className="z-10 bg-white p-8 rounded shadow-md">
          <div className="flex justify-end mb-4">
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              Close
            </button>
          </div>
          <EditPermissionForm
            editing={editing}
            setEditing={closeModal}
            currentPermission={currentPermission}
            setCurrentPermission={currentPermission}
            updatePermission={updatePermission}
            addPermission={addPermission}
          />
        </div>
      </div>
    </div>
  );
};

export default PermissionModal;
