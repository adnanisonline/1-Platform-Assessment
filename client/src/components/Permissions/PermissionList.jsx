import React, { useState, useEffect } from 'react';
import Permission from './Permission';
import useApiRequest from '../../hooks/useApiRequest';
import PermissionModal from './PermissionModal';

function PermissionList() {
  const [apiPermissions, setApiPermissions] = useState([]);
  const [searchItem, setSearchItem] = useState('');
  const [filteredPermissions, setFilteredPermissions] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('none');
  const { error, sendRequest } = useApiRequest();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest('http://localhost:3001/permissions', 'GET');
        setApiPermissions(responseData);
        setFilteredPermissions(responseData);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, [sendRequest]);

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const filteredItems = apiPermissions.filter((permission) =>
      permission.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPermissions(filteredItems);
  };

  const handleFilterChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedFilter(selectedValue);

    const sortedPermissions = [...filteredPermissions];

    if (selectedValue === 'name') {
      sortedPermissions.sort((a, b) => a.name.localeCompare(b.name));
    } else if (selectedValue === 'status') {
      sortedPermissions.sort((a, b) => a.status.localeCompare(b.status));
    }

    setFilteredPermissions(sortedPermissions);
  };

  const initialFormState = {
    permissionid: null,
    name: '',
    status: '',
    assigned_to: '',
  };

  const [editing, setEditing] = useState(false);
  const [currentPermission, setCurrentPermission] = useState(initialFormState);

  const addPermission = async (permission) => {
    try {
      const responseData = await sendRequest('http://localhost:3001/permissions', 'POST', {
        'Content-Type': 'application/json',
      }, permission);

      if (!error) {
        setFilteredPermissions([...filteredPermissions, responseData]);
      }
    } catch (error) {
      console.error('Error adding permission:', error);
    }
  };

  const deletePermission = async (id) => {
    try {
      await sendRequest(`http://localhost:3001/permissions/${id}`, 'DELETE');

      if (!error) {
        setFilteredPermissions(filteredPermissions.filter((permission) => permission.permissionid !== id));
      } else {
        console.error('delete permission failed');
      }

      setEditing(false);
    } catch (error) {
      console.error('Error during delete permission:', error);
    }
  };

  const editRow = (permission) => {
    setEditing(true);
    setCurrentPermission(permission);
  };

  const updatePermission = async (id, updatedPermission) => {
    try {
      const responseData = await sendRequest(`http://localhost:3001/permissions/${id}`, 'PUT', {
        'Content-Type': 'application/json',
      }, updatedPermission);

      if (!error) {
        setFilteredPermissions(
          filteredPermissions.map((permission) => (permission.permissionid === id ? responseData : permission))
        );
        setEditing(false);
      }
    } catch (error) {
      console.error('Error updating permission:', error);
    }
  };

  return (
    <div>
      <div className="max-w-3xl mx-auto flex mb-8">
        <div className="flex-1 mr-4">
          <input
            className="p-2 w-full bg-white-200 border-2 border-slate-200 rounded-lg flex flex-row mx-auto mt-6"
            type="text"
            value={searchItem}
            onChange={handleInputChange}
            placeholder="Type to search"
          />
        </div>
        <div className="p-2 bg-white-200 border-2 border-slate-200 rounded-lg flex flex-row mx-auto mt-6">
          <select onChange={handleFilterChange} value={selectedFilter}>
            <option value="none">Select Filter</option>
            <option value="name">Sort by Name</option>
            <option value="status">Sort by Status</option>
          </select>
        </div>
        <div className='p-2 px-2 flex flex-row mx-auto mt-6'>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded"
            onClick={openModal}
          >
            Add Permission
          </button>

          <PermissionModal
            isOpen={isModalOpen}
            closeModal={closeModal}
            editing={editing}
            currentPermission={currentPermission}
            updatePermission={updatePermission}
            addPermission={addPermission}
          />
        </div>
      </div>
      <div className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5">
        {filteredPermissions.map((e) => (
          <Permission
            key={e.permissionid}
            openModal={openModal}
            data={e}
            editRow={editRow}
            deletePermission={deletePermission}
          />
        ))}
      </div>
    </div>
  );
}

export default PermissionList;
