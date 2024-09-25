"use client";
import React, { useState } from "react";
import grabUsername from "@/actions/grabUsername";
import { redirect, useRouter } from "next/navigation";

const UsernameForm = ({ desiredUsername }) => {
  const router = useRouter();
  const [taken, setTaken] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUsernameValidation = async (formData) => {
    setLoading(true); // Show loading spinner
    const result = await grabUsername(formData);
    if (result === false) {
      setTaken(true);
    } else {
      setTaken(false);
      router.push("/account?created=" + formData.get("username"));
    }
    setLoading(false); // Hide loading spinner
  };

  return (
    <form
      className="card-body"
      onSubmit={(e) => {
        e.preventDefault();
        handleUsernameValidation(new FormData(e.target));
      }}
    >
      <div className="form-control">
        <label className="label">
          <span className="text-2xl">Claim your username</span>
        </label>
        <div className="relative flex items-center">
          <span className="absolute left-0 pl-4 text-secondary flex items-center h-full">
            looming.to/
          </span>
          <input
            type="text"
            name="username"
            placeholder="username"
            defaultValue={desiredUsername}
            className="input input-bordered pl-28 w-full"
            style={{ maxWidth: "100%" }}
          />
        </div>
        {taken && (
          <div role="alert" className="alert mt-3 mb-0 p-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">Username already taken</span>
          </div>
        )}
      </div>
      <div className="form-control mt-6">
        <button
          type="submit"
          className="btn btn-primary text-white w-full relative"
        >
          {loading ? (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="loading loading-spinner loading-md"></span>
            </span>
          ) : (
            "Continue"
          )}
        </button>
      </div>
    </form>
  );
};

export default UsernameForm;
