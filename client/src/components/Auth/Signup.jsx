import React, { useState } from 'react';
import { signupFields } from '../../constants/formFields';
import FormAction from '../Common/FormAction';
import Input from '../Common/Input';
import useApiRequest from '../../hooks/useApiRequest';

const fields = signupFields;
const fieldsState = {};

fields.forEach((field) => {
  fieldsState[field.id] = '';
});

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const [errorMessage, setErrorMessage] = useState([]);
  const { error, sendRequest } = useApiRequest();

  const handleChange = (e) => {
      setSignupState({ ...signupState, [e.target.id]: e.target.value });
  };

  const createAccount = async () => {
    try {
      const response = await sendRequest(
        'http://localhost:3001/auth/signup',
        'POST',
        {},
        signupState
      );

      if (response.errors) {
        response.errors.errors.forEach((error) => {
          if (error.path === 'email') {
            setErrorMessage(`Email error: ${error.msg}`);
          } else if (error.path === 'username') {
            setErrorMessage(`Username error: ${error.msg}`);
          }
        });
      } else if (!error) {
        console.log('Signup successful');
        window.location.href = '/';
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
  };  

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(signupState.password)) {
      setErrorMessage('Password must contain at least one uppercase letter, one number, and be at least 8 characters long');
      return;
    }

    setErrorMessage('');
    createAccount();
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}

        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}

        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
}
