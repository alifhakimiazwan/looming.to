"use client";
import { signOut } from "next-auth/react";
import React from "react";

const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to the home page after sign out
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
