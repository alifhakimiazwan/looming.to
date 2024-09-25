import Link from "next/link";
import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoutButton from "./buttons/LogoutButton";
import { Page } from "@/models/Page";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      {/* Navbar Section */}
      <div className="mt-2 shadow-lg">
        <div className="navbar bg-base-100 pb-4 px-4 flex items-center justify-between shadow-lg">
          <div className="flex-1 text-center">
            <a href="/" className="btn btn-ghost text-3xl text-secondary">
              Looming
            </a>
          </div>
          <div className="flex-none flex space-x-4">
            {!!session && (
              <>
                <div className="dropdown dropdown-end">
                  <div className="flex items-center">
                    {/* Hide on mobile */}
                    <span className="mr-7 hidden md:block">
                      Hello, {session?.user?.name}
                    </span>
                    {/* Greeting with username */}
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-ghost btn-circle avatar mr-10"
                    >
                      <div className="w-10 rounded-full">
                        <img alt="User Avatar" src={session?.user?.image} />
                      </div>
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <Link className="justify-between" href={"/account"}>
                        Profile
                        <span className="badge">New</span>
                      </Link>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <LogoutButton />
                    </li>
                  </ul>
                </div>
              </>
            )}
            {!session && (
              <>
                <Link href={"/login"}>
                  <label className="btn btn-ghost text-md">Login</label>
                </Link>

                <Link href="/login">
                  <label className="btn btn-secondary text-md text-white">
                    Register
                  </label>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
