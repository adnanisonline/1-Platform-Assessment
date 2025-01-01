import React from 'react';
import Header from '../components/Common/Header';
import Login from '../components/Auth/Login';

export default function LoginPage() {
  return (
    <div className="min-h-full h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet? "
          linkName="Signup"
          linkUrl="/signup"
        />
        <Login />
      </div>
    </div>
  );
}
