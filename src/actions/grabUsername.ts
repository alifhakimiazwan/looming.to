"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";

const grabUsername = async (formData: FormData) => {
  const username = formData.get("username") as string; // Ensure username is a string
  await mongoose.connect(process.env.MONGODB_URI);

  const existingPageDoc = await Page.findOne({ uri: username });
  if (existingPageDoc) {
    return false; // Username is taken
  } else {
    const session = await getServerSession(authOptions);

    if (session) {
      await Page.create({ uri: username, owner: session?.user?.email });
      return true; // Username available and created
    }
  }
};

export default grabUsername;
