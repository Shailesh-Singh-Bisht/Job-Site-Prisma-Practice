import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-50 to-blue-100">
      <main className="flex flex-col items-center gap-8">
        <Image
          src="/logo.png"
          alt="Job Board Logo"
          width={80}
          height={80}
          className="rounded-full shadow-lg mb-2"
        />
        <h1 className="text-4xl font-bold text-blue-700 mb-2 text-center">
          Welcome to the Job Board
        </h1>
        <p className="text-lg text-gray-700 text-center max-w-xl">
          Discover your next opportunity or post a job to find the perfect
          candidate. Start exploring jobs or post your own today!
        </p>
        <div className="flex gap-4 mt-4">
          <a
            className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            href="/jobs"
          >
            Browse Jobs
          </a>
          <a
            className="px-6 py-2 rounded-full bg-white text-blue-700 font-semibold border border-blue-600 shadow hover:bg-blue-50 transition"
            href="/jobs/post"
          >
            Post a Job
          </a>
        </div>
      </main>
    </div>
  );
}
