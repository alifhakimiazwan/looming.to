import mongoose from "mongoose";
import { Event } from "@/models/Event";
import { atob } from "buffer";

export async function POST(req) {
  mongoose.connect(process.env.MONGODB_URI);
  const url = new URL(req.url);
  const clickedLink = atob(url.searchParams.get("url"));
  const page = url.searchParams.get("page");
  await Event.create({ uri: clickedLink, type: "click", page });
  return Response.json(true);
}
