import React from 'react';
import Header from '../components/Common/Header';
import PermissionList from '../components/Permissions/PermissionList';

export default function PermissionsPage() {
  return (
    <div className="px-4 w-full space-y-8">
      <Header
        heading="Permissions List"
        paragraph="List of all the Permissions "
      />
      <PermissionList />
    </div>
  );
}
