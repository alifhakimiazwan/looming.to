"use client";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const HeroForm = ({ user }) => {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (
      "localStorage" in window &&
      window.localStorage.getItem("desiredUsername")
    ) {
      const username = window.localStorage.getItem("desiredUsername");
      window.localStorage.removeItem("desiredUsername");
      redirect("/account?desiredUsername=" + username);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length > 0) {
      if (user) {
        router.push("/account?desiredUsername=" + username);
      } else {
        window.localStorage.setItem("desiredUsername", username);
        await signIn("google");
      }
    }
  };

  return (
    <form
      className="flex flex-col items-start md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4"
      onSubmit={handleSubmit}
    >
      <div className="relative flex items-center w-full max-w-xs">
        <span className="absolute left-0 top-0 pl-4 py-3 text-secondary">
          looming.to/
        </span>
        <input
          type="text"
          placeholder="username"
          className="input input-bordered pl-20 md:pl-28 w-full" // Adjusted padding for better spacing
          style={{ paddingLeft: "7rem" }} // To ensure placeholder doesn't overlap with the prefix
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <button className="btn btn-secondary text-white w-full md:w-auto">
          Get Started
        </button>
      </div>
    </form>
  );
};

export default HeroForm;
