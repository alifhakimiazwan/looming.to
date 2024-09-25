import { getServerSession } from "next-auth";
import HeroForm from "./forms/HeroForm";
import { authOptions } from "@/app/api/auth/[...nextauth]";

const Hero = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <div className="hero bg-base-100 pt-20">
        <div className="flex-col lg:flex-row-reverse px-8 lg:px-8">
          <div>
            <h1 className="text-6xl font-bold">
              Your one link to
              <br /> <span className="text-secondary">everything</span>
            </h1>
            <p className="py-6 ">
              Looming is your one way stop to share all your links to
              businesses, clients, and more.
              <br />
              Customize your profile to let people know you more!
            </p>
            <HeroForm user={session?.user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
