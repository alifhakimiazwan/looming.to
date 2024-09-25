import { Schema, model, models } from "mongoose";

const PageSchema = new Schema(
  {
    uri: { type: String, required: true, min: 1, unique: true },
    owner: { type: String, required: true },
    profileTitle: { type: String, default: "" },
    location: { type: String, default: "" },
    bio: { type: String, default: "" },
    buttons: { type: Object, default: {} },
    links: { type: Object, default: [] },
  },
  { timestamps: true }
);

export const Page = models?.Page || model("Page", PageSchema);
