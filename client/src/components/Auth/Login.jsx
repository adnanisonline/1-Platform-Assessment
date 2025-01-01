import React, { useState, useEffect } from 'react';
import { loginFields } from '../../constants/formFields';
import FormAction from '../Common/FormAction';
import FormExtra from '../Common/FormExtra';
import Input from '../Common/Input';
import { useAuth } from '../../context/auth';
import useApiRequest from '../../hooks/useApiRequest';

const fields = loginFields;
const fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ''));

export default function Login() {
  const { login } = useAuth();
  const [loginState, setLoginState] = useState(fieldsState);
  const [errorMessage, setErrorMessage] = useState('');
  const { data, error, sendRequest } = useApiRequest();

  useEffect(() => {
    if (data?.jwt) {
      const { jwt } = data;
      console.log('Authentication successful');
      login(jwt);
      window.location.href = '/permissions';
    } else if(data?.message1) {
      setErrorMessage('Incorrect username or password');
    }
  }, [data, error, login]);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    authenticateUser();
  };

  const authenticateUser = async () => {
    await sendRequest(
      'http://localhost:3001/auth/login',
      'POST',
      {},
      loginState
    );
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      {errorMessage && (
        <div className="text-red-500 mt-2">{errorMessage}</div>
      )}

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
}
