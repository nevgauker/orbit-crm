import Video from "@/components/video";
// import { getAllUsers } from "@/db/user";
// import Image from "next/image";
import Link from "next/link";

function HomePage() {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 text-center">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">OrbitCRM</h1>
      <p className="text-xl text-gray-600 mb-8">The ultimate platform for building and nurturing customer relationships.</p>

      <Video filePath={"orbit-video.mp4"} type={"video/mp4"} height={"400"} width={"400"} />


      <Link className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700" href="/dashboard">
        Get Started
      </Link>
    </div>
  );
}

export default HomePage