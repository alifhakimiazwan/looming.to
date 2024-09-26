"use server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { Page } from "@/models/Page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const savePageButtons = async (formData: FormData) => {
  mongoose.connect(process.env.MONGODB_URI);
  const session = await getServerSession(authOptions);
  if (session) {
    const buttonValues = {};
    // Use Object.entries to iterate over the formData object
    Object.entries(formData).forEach(([key, value]) => {
      buttonValues[key] = value; // Map keys to their corresponding values
    });

    const dataToUpdate = { buttons: buttonValues };
    await Page.updateOne({ owner: session?.user?.email }, dataToUpdate);

    return true;
  } else {
    return false;
  }
};
export default savePageButtons;
