import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/Page";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import mongoose from "mongoose";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import MobilePreview from "@/components/MobilePreview";
import cloneDeep from "clone-deep";
import Navbar from "@/components/Navbar";

const AccountPage = async ({ searchParams }) => {
  const session = await getServerSession(authOptions);

  const desiredUsername = searchParams?.desiredUsername;

  if (!session) {
    return redirect("/");
  }

  await mongoose.connect(process.env.MONGODB_URI); // Ensure you handle connection properly
  const pageExist = await Page.findOne({ owner: session?.user?.email });

  // Handle the case when pageExist is null
  if (!pageExist) {
    return (
      <div>
        <Navbar />
        <div className="flex items-start justify-center min-h-screen bg-gray-100 px-4">
          <div
            className="card bg-base-100 w-full max-w-sm shadow-2xl mt-10"
            style={{ marginTop: "5vh" }}
          >
            <UsernameForm desiredUsername={desiredUsername} />
          </div>
        </div>
      </div>
    );
  }

  // If the page exists, process it
  const leanPage = cloneDeep(pageExist.toJSON());
  leanPage._id = leanPage._id.toString();

  return (
    <div className="flex">
      <div className="flex-1">
        {/* Settings Forms */}
        <PageSettingsForm page={leanPage} user={session.user} />
        <PageButtonsForm page={leanPage} user={session.user} />
        <PageLinksForm page={leanPage} user={session.user} />
      </div>

      <div className="fixed right-0 top-0 w-1/4 h-full p-4 hidden md:block">
        <div className="absolute top-1/2 right-10 transform -translate-y-1/2 z-50">
          <MobilePreview page={pageExist} user={session.user} />
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
