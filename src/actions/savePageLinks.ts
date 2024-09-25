"use server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { Page } from "@/models/Page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const savePageLinks = async (links) => {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  if (session) {
    await Page.updateOne({ owner: session?.user?.email }, { links });

    return true;
  } else {
    return false;
  }
};
export default savePageLinks;
