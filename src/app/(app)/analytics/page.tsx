import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SectionBox from "@/components/layout/SectionBox";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import React from "react";
import { Page } from "@/models/Page";
import { Event } from "@/models/Event";
import { redirect } from "next/navigation";
import Charts from "@/components/charts/Charts";
import Image from "next/image";
import { isToday } from "date-fns";

const AnalyticsPage = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const page = await Page.findOne({ owner: session?.user?.email });
  const groupViews = await Event.aggregate([
    {
      $match: {
        type: "view",
        uri: page.uri,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },
        count: {
          $count: {},
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const clicks = await Event.find({
    page: page.uri,
    type: "click",
  });

  return (
    <div className="bg-gray-100 p-4">
      <div className="min-h-screen">
        <div className="card bg-base-100 w-full shadow-l ">
          <div className="card-body">
            <h3 className="text-xl font-semibold mb-9">Views</h3>
            <Charts
              data={groupViews.map((o) => ({ date: o._id, views: o.count }))}
            />
          </div>
        </div>
        <div className="card bg-base-100 w-full shadow-l pb-3 mt-4">
          <div className="card-body">
            <h3 className="text-xl font-semibold">Clicks</h3>
            {page.links.map((link) => (
              <div key={link._id} className="flex flex-col">
                <div className="divider w-full opacity-50"></div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {!link.icon && (
                      <img
                        src={"profile-icon2.jpg"} // Placeholder for profile icon
                        alt="Profile Icon"
                        className="rounded-full" // Circular icon
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
                    <div className="ml-4 flex flex-col">
                      <div className="text-lg">{link.title}</div>
                      <div className="text-sm text-gray-500">
                        {link.subtitle}
                      </div>
                      <a
                        href={link.url}
                        className="text-blue-500 text-sm hover:underline"
                      >
                        {link.url}
                      </a>
                    </div>
                  </div>

                  {/* Clicks Info Section: Align Below Profile for Mobile */}
                  <div className="hidden md:flex flex-col items-center justify-center text-center p-3">
                    <div className="flex flex-col items-center">
                      <div className="text-sm text-gray-400">Clicks Today:</div>
                      <div className="text-2xl pt-1">
                        {
                          clicks.filter(
                            (c) => c.uri === link.url && isToday(c.createdAt)
                          ).length
                        }
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-sm text-gray-400">
                        Clicks All Time:
                      </div>
                      <div className="text-2xl pt-1">
                        {clicks.filter((c) => c.uri === link.url).length}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clicks Info Section for Mobile */}
                <div className="flex flex-row md:hidden items-start mt-4">
                  <div className="flex flex-col items-start mr-5">
                    <div className="text-sm text-gray-400">Clicks Today:</div>
                    <div className="text-2xl pt-1">
                      {
                        clicks.filter(
                          (c) => c.uri === link.url && isToday(c.createdAt)
                        ).length
                      }
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="text-sm text-gray-400">
                      Clicks All Time:
                    </div>
                    <div className="text-2xl pt-1">
                      {clicks.filter((c) => c.uri === link.url).length}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
