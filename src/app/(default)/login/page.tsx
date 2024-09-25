import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";
import React from "react";

const LoginPage = () => {
  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-100 px-4">
      {" "}
      {/* Adjusted alignment and added padding */}
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl mt-20">
        {" "}
        {/* Added margin-top to move the card higher */}
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">
            Sign in to <span className="text-secondary ">Looming</span>
          </h2>
          <LoginWithGoogle />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
