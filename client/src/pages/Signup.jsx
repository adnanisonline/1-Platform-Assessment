import React from 'react';
import Header from '../components/Common/Header';
import Signup from '../components/Auth/Signup';

export default function SignupPage() {
  return (
    <div className="min-h-full h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <Header
          heading="Signup to create an account"
          paragraph="Already have an account? "
          linkName="Login"
          linkUrl="/"
        />
        <Signup />
      </div>
    </div>
  );
}
