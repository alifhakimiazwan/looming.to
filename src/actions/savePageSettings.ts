"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { Page } from "@/models/Page";
import { User } from "@/models/User";

const savePageSettings = async (formData: FormData) => {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);

  if (session) {
    const dataKeys = ["profileTitle", "location", "bio"];

    const dataToUpdate = {};

    for (const key of dataKeys) {
      if (formData.has(key)) {
        dataToUpdate[key] = formData.get(key);
      }
    }
    await Page.updateOne({ owner: session?.user?.email }, dataToUpdate);

    if (formData.has("avatar")) {
      const avatarLink = formData.get("avatar");
      await User.updateOne(
        { email: session?.user?.email },
        { image: avatarLink }
      );
    }
    return true;
  } else {
    return false;
  }
};

export default savePageSettings;
