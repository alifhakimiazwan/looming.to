"use client";
import savePageSettings from "@/actions/savePageSettings";
import React from "react";
import toast from "react-hot-toast";
import { useState } from "react";
import Image from "next/image";
import SectionBox from "../layout/SectionBox";
import upload from "@/libs/upload";

const PageSettingsForm = ({ page, user }) => {
  const [avatar, setAvatar] = useState(user?.image);

  const handleProfileImageChange = async (ev) => {
    await upload(ev, (link) => {
      setAvatar(link);
    });
  };
  const saveBaseSettings = async (formData) => {
    const result = await savePageSettings(formData);
    if (result) {
      toast.success("Succesfully updated"),
        {
          style: {
            padding: "20px",
          },
        };
    }
  };
  return (
    <SectionBox>
      <form action={saveBaseSettings}>
        <div className="card bg-base-100 w-full shadow-l mb-0">
          <div className="card-body ">
            {/* Profile Label */}
            <h3 className="text-xl font-semibold mb-4">Profile</h3>

            {/* Profile Picture Section */}
            <div className="flex items-center space-x-4 mb-4">
              {/* Profile Picture */}
              <div className="w-24 h-24 flex-shrink-0">
                <Image
                  src={avatar} // Placeholder image URL
                  alt={"avatar"}
                  className="w-full h-full rounded-full object-cover"
                  width={96}
                  height={96}
                />
              </div>

              {/* Buttons */}
              <div className="flex flex-col space-y-2 w-full">
                <label
                  htmlFor="avatarIn"
                  className="btn btn-secondary w-full rounded-full text-white"
                >
                  Change Image
                  <input
                    type="file"
                    className="hidden"
                    id="avatarIn"
                    onChange={handleProfileImageChange}
                  />
                  <input type="hidden" name="avatar" value={avatar} />
                </label>
                <button className="btn btn-outline btn-primary rounded-full w-full">
                  Remove
                </button>
              </div>
            </div>

            {/* Textarea Section */}
            <div className="flex flex-col space-y-4 pt-5">
              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="titleIn"
                >
                  Profile Title
                </label>
                <textarea
                  id="titleIn"
                  name="profileTitle"
                  defaultValue={page.profileTitle}
                  className="textarea textarea-bordered w-full h-12 resize-none"
                  placeholder="Enter your profile title"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="locationIn"
                >
                  Location
                </label>
                <textarea
                  id="locationIn"
                  name="location"
                  defaultValue={page.location}
                  className="textarea textarea-bordered w-full h-12 resize-none"
                  placeholder="Enter your location"
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium text-gray-700 mb-1"
                  htmlFor="bioIn"
                >
                  Bio
                </label>
                <textarea
                  id="bioIn"
                  name="bio"
                  defaultValue={page.bio}
                  className="textarea textarea-bordered w-full h-32 resize-none"
                  placeholder="Enter your bio"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                className="btn btn-secondary rounded-full text-white"
                type="submit"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </form>
    </SectionBox>
  );
};

export default PageSettingsForm;
