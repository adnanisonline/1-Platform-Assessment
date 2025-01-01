const loginFields = [
  {
    labelText: 'Email address',
    labelFor: 'email',
    id: 'email',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    isRequired: true,
    placeholder: 'Email address',
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
    isRequired: true,
    placeholder: 'Password',
  },
];

const signupFields = [
  {
    labelText: 'First Name',
    labelFor: 'first_name',
    id: 'first_name',
    name: 'first_name',
    type: 'text',
    autoComplete: 'first_name',
    isRequired: true,
    placeholder: 'First Name',
  },
  {
    labelText: 'Last Name',
    labelFor: 'last_name',
    id: 'last_name',
    name: 'last_name',
    type: 'text',
    autoComplete: 'last_name',
    isRequired: true,
    placeholder: 'Last Name',
  },
  {
    labelText: 'Email',
    labelFor: 'email',
    id: 'email',
    name: 'email',
    type: 'email',
    autoComplete: 'email',
    isRequired: true,
    placeholder: 'Email',
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    autoComplete: 'password',
    isRequired: true,
    placeholder: 'Password',
  }
];

const permissionFields = [
  {
    labelText: 'Name',
    labelFor: 'name',
    id: 'name',
    name: 'name',
    type: 'text',
    autoComplete: 'name',
    isRequired: true,
    placeholder: 'Name',
  },
  {
    labelText: 'permission',
    labelFor: 'permission',
    id: 'permission',
    name: 'permission',
    type: 'text',
    autoComplete: 'permission',
    isRequired: true,
    placeholder: 'permission',
  },
  {
    labelText: 'Assigned to User',
    labelFor: 'assigned_to',
    id: 'assigned_to',
    name: 'assigned_to',
    type: 'number',
    autoComplete: 'assigned_to',
    isRequired: true,
    placeholder: 'Assigned to User',
  },
];

export { loginFields, signupFields, permissionFields };
