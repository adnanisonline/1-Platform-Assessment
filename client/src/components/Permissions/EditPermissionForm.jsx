import React, { useState, useEffect } from 'react';
import { permissionFields } from '../../constants/formFields';
import Input from '../Common/Input';
import FormAction from '../Common/FormAction';
import useApiRequest from '../../hooks/useApiRequest';

const fields = permissionFields;

function EditPermissionForm(props) {
  const initialFormState = {
    id: null,
    name: '',
    status: '',
    assigned_to: '',
  };

  const [filteredPermissions, setFilteredPermissions] = useState(
    props.editing ? props.currentPermission : initialFormState
  );
  const [alert, setAlert] = useState({ type: '', message: '' });
  const { sendRequest, error} = useApiRequest();

  const handleChange = (e) => {
      setFilteredPermissions({ ...filteredPermissions, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    setFilteredPermissions(props.currentPermission);
  }, [props]);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => {
      setAlert({ type: '', message: '' });
    }, 2000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!filteredPermissions.name || !filteredPermissions.description) return;

    try {
      if (props.editing) {
        await editPermission();
        await props.updatePermission(filteredPermissions.id, filteredPermissions);
      } else {
        await createPermission();
        await props.addPermission(filteredPermissions);
      }

      resetAddPermission();
    } catch (error) {
      console.error('Error during form submission:', error);
      showAlert('error', 'An error occurred');
    }
  };

  const resetAddPermission = () => {
    props.setEditing(false);
    setFilteredPermissions(initialFormState);
  };

  const createPermission = async () => {
    try {
      await sendRequest('http://localhost:3001/permissions/', 'POST', {}, filteredPermissions);

      if (!error) {
        showAlert('success', 'Permission added successfully');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        console.error('Failed to add Permission');
        showAlert('error', 'Failed to add Permission');
      }
    } catch (error) {
      console.error('Error during add Permission:', error);
      showAlert('error', 'An error occurred');
    }
  };

  const editPermission = async () => {
    try {
      await sendRequest(`http://localhost:3001/permissions/${filteredPermissions.permissionid}`, 'PATCH', {}, filteredPermissions);

      if (!error) {
        showAlert('success', 'Permission updated successfully');
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        console.error('Failed to update Permission');
        showAlert('error', 'Failed to update Permission');
      }
    } catch (error) {
      console.error('Error during update Permission:', error);
      showAlert('error', 'An error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
      {alert.type === 'success' && (
        <div className="mt-4 bg-green-200 border-green-400 border p-2 rounded">
          {alert.message}
        </div>
      )}
      {alert.type === 'error' && (
        <div className="mt-4 bg-red-200 border-red-400 border p-2 rounded">
          {alert.message}
        </div>
      )}
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="">
          {fields.map((field) => (
            <Input
              key={field.id}
              handleChange={handleChange}
              value={filteredPermissions[field.id]}
              labelText={field.labelText}
              labelFor={field.labelFor}
              id={field.id}
              name={field.name}
              type={field.type}
              isRequired={field.isRequired}
              placeholder={field.placeholder}
            />
          ))}
          <FormAction
            handleSubmit={handleSubmit}
            text={props.editing ? 'Update Permission' : 'Add Permission'}
          />

          <div className="my-2">
            {props.editing && (
              <button
                onClick={resetAddPermission}
                className="w-full bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-purple-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditPermissionForm;
