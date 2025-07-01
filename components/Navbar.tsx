"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white/80 backdrop-blur shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <Image
                src="/logo.png"
                alt="Job Board Logo"
                width={40}
                height={40}
                className="rounded-full shadow"
              />
              <span className="text-xl font-bold text-blue-700 tracking-tight">
                Job Board
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link
              href="/jobs"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Browse Jobs
            </Link>
            {session ? (
              <>
                <Link
                  href="/jobs/post"
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  Post A Job
                </Link>
                <Link
                  href="/dashboard"
                  className="text-gray-700 hover:text-blue-600 font-medium transition"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                  className="ml-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-full shadow hover:bg-gray-300 transition font-semibold"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition font-semibold"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
