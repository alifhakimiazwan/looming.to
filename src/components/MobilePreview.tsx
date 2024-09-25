import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLink } from "@fortawesome/free-solid-svg-icons";
import {
  faTiktok,
  faDiscord,
  faInstagram,
  faLinkedin,
  faTwitch,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export const buttonIcons = {
  email: faEnvelope,
  youtube: faYoutube,
  twitch: faTwitch,
  instagram: faInstagram,
  twitter: faTwitter,
  linkedin: faLinkedin,
  discord: faDiscord,
  titkok: faTiktok,
};

const buttonLink = (key, value) => {
  if (key === "mobile") {
    return "tel:" + value;
  }
  if (key === "email") {
    return "mailto:" + value;
  }
  return value;
};

const MobilePreview = ({ page, user }) => {
  return (
    <>
      <div className="fixed top-1/2 right-10 transform -translate-y-1/2 z-50 mr-8">
        {/* Wrap the title and the phone mockup together */}
        <div className="flex flex-col items-center">
          {/* Title */}

          {/* DaisyUI Phone Mockup */}
          <div className="mockup-phone shadow-2xl">
            <div className="camera"></div>
            <div className="display">
              <div className="artboard artboard-demo phone-1 bg-base-100">
                {/* Mobile view content inside the phone mockup */}
                <div className="flex flex-col justify-start items-center w-full h-screen">
                  {/* User image */}
                  <div className="relative w-full h-1/2">
                    <Image
                      src={user.image}
                      alt="avatar"
                      layout="fill"
                      objectFit="cover"
                      className="absolute inset-0 w-full h-full"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-base-100 to-transparent"></div>
                  </div>

                  {/* Profile info */}
                  <div className="flex flex-col justify-start items-center w-full h-1/2 p-4 text-center">
                    <p className="text-2xl">{page.profileTitle}</p>
                    <p className="mt-2 text-xs">{page.bio}</p>

                    {/* Social buttons */}
                    <div className="flex justify-center space-x-4 mt-2">
                      {Object.keys(page.buttons).map((buttonKey) => (
                        <Link
                          key={buttonKey}
                          href={buttonLink(buttonKey, page.buttons[buttonKey])}
                        >
                          <FontAwesomeIcon
                            className="w-5 h-5 cursor-pointer"
                            icon={buttonIcons[buttonKey]}
                          />
                        </Link>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="grid grid-cols-2 gap-4 p-2">
                      {page.links.map((link) => (
                        <Link
                          target="_blank"
                          href={link.url}
                          key={link.url}
                          ping={
                            process.env.LOCAL_URL +
                            "api/click?url=" +
                            btoa(link.url) +
                            "&page=" +
                            page.uri
                          }
                        >
                          <div className="flex flex-col justify-between rounded-lg shadow-lg bg-white p-4 w-full h-32 transition-transform transform hover:scale-105">
                            {/* Icon Image */}
                            <div className="w-12 h-12 flex-shrink-0 mx-8">
                              {link.icon ? (
                                <img
                                  src={link.icon}
                                  alt="icon"
                                  className="w-full h-full rounded-full object-cover"
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={faLink}
                                  className="text-secondary w-auto h-auto bg-gray-100 p-3 rounded-full"
                                />
                              )}
                            </div>
                            {/* Text Content */}
                            <div className="text-left">
                              <h4 className="text-md font-semibold mb-0">
                                {link.title}
                              </h4>
                              <p className="text-sm mt-0">{link.subtitle}</p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Link target="_blank" href={"/" + page.uri} className="mt-5">
            <button className="btn btn-wide btn-secondary text-white rounded-full">
              Preview
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobilePreview;
