"use client";
import React, { useState } from "react";
import SectionBox from "../layout/SectionBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faGripVertical,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import {
  faInstagram,
  faTwitter,
  faLinkedin,
  faDiscord,
  faTiktok,
  faYoutube,
  faTwitch,
} from "@fortawesome/free-brands-svg-icons";
import savePageButtons from "@/actions/savePageButtons";
import toast from "react-hot-toast";
import { ReactSortable } from "react-sortablejs";

const allButtons = [
  { key: "email", label: "E-mail", icon: faEnvelope },
  { key: "youtube", label: "Youtube", icon: faYoutube },
  { key: "twitch", label: "Twitch", icon: faTwitch },
  { key: "instagram", label: "Instagram", icon: faInstagram },
  { key: "twitter", label: "Twitter", icon: faTwitter },
  { key: "linkedin", label: "LinkedIn", icon: faLinkedin },
  { key: "discord", label: "Discord", icon: faDiscord },
  { key: "tiktok", label: "Tiktok", icon: faTiktok },
];

const PageButtonsForm = ({ page }) => {
  const pageActiveButtonsKeys = Object.keys(page?.buttons || {});
  const pageActiveButtonsInfo = pageActiveButtonsKeys
    .map((k) => allButtons.find((b) => b.key === k))
    .filter(Boolean); // filter out any undefined values
  const [activeButtons, setActiveButtons] = useState(pageActiveButtonsInfo);

  const handleButtonClick = (button) => {
    // Check if button already exists to prevent duplicates
    if (!activeButtons.find((b) => b.key === button.key)) {
      setActiveButtons((prevButton) => [...prevButton, button]);
    }
  };

  const handleDeleteButtonClick = (key) => {
    setActiveButtons((prevButton) =>
      prevButton.filter((button) => button.key !== key)
    );
  };

  const handleInputChange = (key, value) => {
    setActiveButtons((prevButtons) =>
      prevButtons.map((button) =>
        button.key === key ? { ...button, link: value } : button
      )
    );
  };

  const handleSubmit = async () => {
    const buttonValues = {};
    activeButtons.forEach((button) => {
      buttonValues[button.key] = button.link || ""; // Ensure link is captured
    });
    const result = await savePageButtons(buttonValues);
    if (result) {
      toast.success("Successfully updated", {
        style: {
          padding: "20px",
        },
      });
    }
  };

  return (
    <SectionBox>
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent the default form submission
          handleSubmit(); // Use handleSubmit to send data
        }}
      >
        <div>
          <div className="card bg-base-100 w-full shadow-l relative">
            <div className="absolute top-6 right-7 mr-1">
              <div className="dropdown dropdown-hover">
                <label
                  tabIndex={0}
                  className="flex items-center justify-center px-1 py-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition w-40 cursor-pointer"
                >
                  + Social Links
                </label>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-2 z-50"
                >
                  {allButtons
                    .filter(
                      (button) =>
                        !activeButtons.find((b) => b.key === button.key)
                    )
                    .map((button) => (
                      <li key={button.key}>
                        <button
                          onClick={(e) => {
                            e.preventDefault(); // Prevent default action
                            handleButtonClick(button); // Add button to activeButtons
                          }}
                          className="flex items-center px-4 py-2 hover:bg-gray-200 transition w-full text-left"
                        >
                          <FontAwesomeIcon
                            icon={button.icon}
                            className="text-gray-600 mr-2"
                          />
                          <span className="text-gray-800">{button.label}</span>
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>

            <div className="card-body">
              <h3 className="text-xl font-semibold mb-4">Social Icons</h3>
              <ReactSortable
                list={activeButtons}
                setList={setActiveButtons}
                handle=".handle"
              >
                {activeButtons.map((button) => (
                  <div
                    key={button.key}
                    className="flex items-center gap-4 mt-5"
                  >
                    <FontAwesomeIcon
                      icon={faGripVertical}
                      className="text-gray-300 hover:text-gray-600 handle"
                    />
                    <FontAwesomeIcon
                      icon={button.icon}
                      className="text-gray-600 mr-2 text-2xl"
                    />
                    <input
                      type="text"
                      value={button.link || ""} // Bind input value
                      onChange={(e) =>
                        handleInputChange(button.key, e.target.value)
                      } // Update link on change
                      placeholder="Enter social media link"
                      className="input input-bordered flex-1 text-sm"
                    />
                    <button
                      className="btn btn-square btn-outline text-gray-300"
                      onClick={() => handleDeleteButtonClick(button.key)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </ReactSortable>
              <div className="flex justify-end">
                <button
                  className="btn btn-secondary rounded-full text-white mt-2"
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

export default PageButtonsForm;
