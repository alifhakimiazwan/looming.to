// AppLayout.js
import { Poppins } from "next/font/google";
import "../globals.css";
import Sidebar from "@/components/sidebar/Sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Toaster } from "react-hot-toast";
import mongoose from "mongoose";
import { Page } from "@/models/Page";

const inter = Poppins({ subsets: ["latin"], weight: ["300", "500"] });

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  // Connect to MongoDB
  await mongoose.connect(process.env.MONGODB_URI);
  const page = await Page.findOne({ owner: session.user?.email });

  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        <Toaster />
        <div className="flex min-h-screen relative">
          {page && (
            <>
              {/* Sidebar for larger screens */}
              <div className="hidden lg:block fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-20">
                <Sidebar user={session?.user} page={page} />
              </div>

              {/* Mobile Sidebar */}
              <div className="lg:hidden">
                <Sidebar user={session?.user} page={page} mobile />
              </div>
            </>
          )}

          {/* Main content area */}
          <div className={`flex-1 lg:ml-64`}>{children}</div>
        </div>
      </body>
    </html>
  );
}
