import LinksPage from "@/components/linksPage/linksPage";
import mongoose from "mongoose";
import { Event } from "@/models/Event";
import { User } from "@/models/User";
import { Page } from "@/models/Page";

const UserPage = async ({ params }) => {
  const uri = params.uri;

  mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ uri });
  const user = await User.findOne({ email: page.owner });

  await Event.create({ uri: uri, page: uri, type: "view" });

  return (
    <div>
      <LinksPage page={page} user={user} />
    </div>
  );
};

export default UserPage;
