"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
const grabUsername = async (formData) => {
  const username = formData.get("username");
  mongoose.connect(process.env.MONGODB_URI);
  const existingPageDoc = await Page.findOne({ uri: username });
  if (existingPageDoc) {
    return false;
  } else {
    const session = await getServerSession(authOptions);

    if (session) {
      await Page.create({ uri: username, owner: session?.user?.email });
      return true;
    }
  }
};

export default grabUsername;
