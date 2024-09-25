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

const LinksPage = ({ page, user }) => {
  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      {/* Card for larger screens */}
      <div className="hidden md:block card bg-base-100 w-[50rem] h-[45rem] shadow-xl overflow-hidden">
        {/* Image Container with gradient overlay */}
        <div className="relative h-1/2">
          <Image
            src={user.image}
            alt="avatar"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 w-full h-full"
          />
          {/* Gradient overlay starting from the bottom of the image */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-base-100 to-transparent"></div>
        </div>

        {/* Card content */}
        <div className="card-body">
          <div className="text-center">
            <h2 className="text-2xl">{page.profileTitle}</h2>
            <p className="text-xs">{page.bio}</p>
          </div>
          {/* Button Icons aligned horizontally */}
          <div className="flex justify-center space-x-4 mt-1">
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
          <div className="flex overflow-x-auto space-x-4 p-2">
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
                <div className="flex flex-col justify-between rounded-lg shadow-lg bg-white p-4 w-48 h-48 transition-transform transform hover:scale-105">
                  {/* Icon Image */}
                  <div className="w-16 h-16 flex-shrink-0">
                    {link.icon && (
                      <img
                        src={link.icon}
                        alt="icon"
                        className="w-full h-full rounded-full object-cover"
                      />
                    )}

                    {!link.icon && (
                      <FontAwesomeIcon
                        icon={faLink}
                        className="text-secondary w-16 h-16 bg-gray-100 p-5 rounded-full"
                      />
                    )}
                  </div>
                  {/* Text Content */}
                  <div className="mt-auto">
                    <h4 className="text-lg font-semibold">{link.title}</h4>
                    <p className="text-sm">{link.subtitle}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Full screen content for mobile */}
      <div className="bg-base-100 md:hidden flex flex-col justify-start items-center w-full h-screen">
        <div className="relative w-full h-1/2">
          {/* Adjust height to half the screen */}
          <Image
            src={user.image}
            alt="avatar"
            layout="fill"
            objectFit="cover"
            className="absolute inset-0 w-full h-full"
          />
          {/* Gradient overlay starting from the bottom of the image */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-base-100 to-transparent"></div>
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-start items-center w-full h-1/2 p-4 text-center">
          <p className="text-2xl">{page.profileTitle}</p>
          <p className="mt-2 text-xs">{page.bio}</p>
          {/* Button Icons aligned horizontally for mobile */}
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

          {/* Link Icons aligned horizontally for mobile */}
          {/* Link Icons aligned horizontally for mobile */}
          {/* Link Icons aligned horizontally for mobile */}
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
                <div className="flex flex-col justify-between rounded-lg shadow-lg bg-white p-4 w-48 h-48 transition-transform transform hover:scale-105">
                  {/* Icon Image */}
                  <div className="w-16 h-16 flex-shrink-0">
                    {link.icon && (
                      <img
                        src={link.icon}
                        alt="icon"
                        className="w-full h-full rounded-full object-cover"
                      />
                    )}

                    {!link.icon && (
                      <FontAwesomeIcon
                        icon={faLink}
                        className="text-secondary w-16 h-16 bg-gray-100 p-5 rounded-full"
                      />
                    )}
                  </div>
                  {/* Text Content */}
                  <div className="mt-auto text-left">
                    <h4 className="text-lg font-semibold">{link.title}</h4>
                    <p className="text-sm">{link.subtitle}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinksPage;
