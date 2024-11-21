'use client'
import Video from "@/components/video";
import { useAuth } from "@/contexts/auth_context";
// import { getAllUsers } from "@/db/user";
// import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

function HomePage() {

  const { user } = useAuth();
  const router = useRouter()



  function handleGetStarted() {
    if (user) {
      const teamId = user.roles[0].team.id
      router.push(`/dashboard/${teamId}`)
    } else {
      router.push('/signin')
    }

  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4 text-center space-y-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-4">OrbitCRM</h1>
      <p className="text-xl text-gray-600 mb-8">The ultimate platform for building and nurturing customer relationships.</p>

      <Video filePath={"orbit-video.mp4"} type={"video/mp4"} height={"400"} width={"400"} />


      <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-700" onClick={handleGetStarted}>
        Get Started
      </button>
    </div>
  );
}

export default HomePage