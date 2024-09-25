"use client";
import React from "react";
import SectionBox from "../layout/SectionBox";
import { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical, faTrash } from "@fortawesome/free-solid-svg-icons";
import upload from "@/libs/upload";
import Image from "next/image";
import savePageLinks from "@/actions/savePageLinks";
import toast from "react-hot-toast";

const PageLinksForm = ({ page, user }) => {
  const [links, setLinks] = useState(page.links || []);

  const save = async (formData) => {
    await savePageLinks(links);
    toast.success("Succesfully Updated");
  };

  const handleIconImageChange = async (ev, linkKeyForUpload) => {
    await upload(ev, (profileImageUrl) => {
      // Update the state with the new icon
      setLinks((prevLinks) => {
        const newLinks = [...prevLinks];
        newLinks.forEach((link, index) => {
          if (link.key === linkKeyForUpload) {
            link.icon = profileImageUrl;
          }
        });
        return newLinks;
      });
    });
  };

  const handleLinkChange = (ev, linkKeyForTitle, prop) => {
    setLinks((prevLinks) => {
      const newLinks = [...prevLinks];
      newLinks.forEach((link) => {
        if (link.key === linkKeyForTitle) {
          link[prop] = ev.target.value;
        }
      });
      return newLinks;
    });
  };

  const addNewLink = () => {
    setLinks((prevLinks) => [
      ...prevLinks,
      {
        key: Date.now().toString(),
        title: "",
        subtitle: "",
        icon: "",
        url: "",
      },
    ]);
  };

  const removeLink = (linkKeyToDelete) => {
    setLinks((prevLinks) =>
      [...prevLinks].filter((l) => l.key !== linkKeyToDelete)
    );
    toast.success("Succesfully Deleted");
  };

  return (
    <SectionBox>
      <form action={save}>
        <div className="min-h-screen">
          <div className="card bg-base-100 w-full shadow-l relative mb-3">
            <div className="card-body">
              <h3 className="text-xl font-semibold mb-4">Links</h3>

              <div className="absolute top-6 right-7 mr-1">
                <button
                  type="button" // Prevents default form submission
                  onClick={addNewLink}
                  className="btn btn-primary text-white flex items-center justify-center px-1 py-2 rounded-full bg-blue-500 hover:bg-blue-600 transition w-40 cursor-pointer text-sm"
                >
                  + Add Links
                </button>
              </div>

              <div className="mt-5">
                <ReactSortable
                  list={links}
                  setList={setLinks}
                  handle={".handle"}
                >
                  {links.map((link) => (
                    <div key={link.key} className="flex items-center mb-7">
                      <FontAwesomeIcon
                        icon={faGripVertical}
                        className="text-gray-300 hover:text-gray-600 mr-5 handle"
                      />
                      <div className="flex flex-col items-center">
                        {!link.icon && (
                          <img
                            src={"profile-icon2.jpg"} // Placeholder for profile icon
                            alt="Profile Icon"
                            className=" rounded-full" // Circular icon
                            width={64}
                            height={64}
                          />
                        )}
                        {!!link.icon && (
                          <Image
                            src={link.icon}
                            alt="Profile Icon"
                            width={64} // Fixed width
                            height={64} // Fixed height
                            className="w-16 h-16 rounded-full object-cover" // Circular icon
                          />
                        )}

                        <div className="flex flex-col items-center">
                          <input
                            type="file"
                            className="hidden"
                            id={"icon" + link.key}
                            onChange={(e) => handleIconImageChange(e, link.key)}
                          />
                          <label
                            htmlFor={"icon" + link.key}
                            className="mt-2 underline text-xs text-primary cursor-pointer text-center"
                          >
                            Change Icon
                          </label>
                          <div className="tooltip mt-2" data-tip="Delete">
                            <button onClick={() => removeLink(link.key)}>
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="text-gray-300 hover:text-gray-600"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <input
                          onChange={(e) =>
                            handleLinkChange(e, link.key, "title")
                          }
                          type="text"
                          value={link.title}
                          placeholder="Title"
                          className="input input-bordered w-full mb-1 text-sm" // Smaller text
                        />

                        <input
                          onChange={(e) =>
                            handleLinkChange(e, link.key, "subtitle")
                          }
                          type="text"
                          value={link.subtitle}
                          placeholder="Subtitle"
                          className="input input-bordered w-full mb-1 text-sm" // Smaller text
                        />
                        <input
                          onChange={(e) => handleLinkChange(e, link.key, "url")}
                          type="text"
                          value={link.url}
                          placeholder="Icon URL"
                          className="input input-bordered w-full text-sm" // Smaller text
                        />
                      </div>
                    </div>
                  ))}
                </ReactSortable>
              </div>

              <div className="flex justify-end">
                <button
                  className="btn btn-secondary rounded-full text-white mt-2 text-sm" // Smaller text
                  type="submit"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </SectionBox>
  );
};

export default PageLinksForm;
