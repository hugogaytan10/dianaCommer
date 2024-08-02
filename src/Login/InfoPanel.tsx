import React from 'react';

interface InfoPanelProps {
  isLogin: boolean;
  toggleForm: () => void;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({ isLogin, toggleForm }) => {
  return (
    <div className="text-center p-8">
    {isLogin ? (
      <>
        <h2 className="text-3xl font-bold mb-4">Hello, Friend!</h2>
        <p className="mb-8">Enter your personal details and start your journey with us</p>
        <button onClick={toggleForm} className="px-6 py-2 border border-white rounded-full">
          Sign Up
        </button>
      </>
    ) : (
      <>
        <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
        <p className="mb-8">To keep connected with us please login with your personal info</p>
        <button onClick={toggleForm} className="px-6 py-2 border border-white rounded-full">
          Sign In
        </button>
      </>
    )}
  </div>
  );
};
