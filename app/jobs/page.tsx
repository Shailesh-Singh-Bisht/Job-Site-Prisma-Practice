import { prisma } from "@/lib/prisma";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // Extract search parameters from the query
  const q = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const type =
    typeof searchParams.type === "string" ? searchParams.type : undefined;
  const location =
    typeof searchParams.location === "string"
      ? searchParams.location
      : undefined;

  // Build dynamic Prisma query
  const jobs = await prisma.job.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { title: { contains: q, mode: "insensitive" } },
                { description: { contains: q, mode: "insensitive" } },
              ],
            }
          : {},
        type ? { type: { equals: type, mode: "insensitive" } } : {},
        location
          ? { location: { contains: location, mode: "insensitive" } }
          : {},
      ],
    },
    orderBy: { postedAt: "desc" },
  });

  return (
    <main className="max-w-4xl mx-auto p-6 sm:p-10 bg-gradient-to-br from-blue-50 to-white min-h-screen rounded-2xl shadow-2xl mt-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-800 mb-10 tracking-tight leading-tight drop-shadow-md">
        <span role="img" aria-label="search" className="inline-block mr-2">
          🔎
        </span>
        Find Your Dream Job
      </h1>

      <form className="flex flex-col md:flex-row gap-4 md:gap-6 mb-12 items-center justify-center">
        <input
          type="text"
          name="q"
          defaultValue={q}
          placeholder="e.g. Frontend Developer, Designer..."
          className="w-full md:flex-1 border border-blue-300 rounded-xl px-5 py-3 text-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-400 shadow transition-all"
        />

        <select
          name="type"
          defaultValue={type || ""}
          className="w-full md:w-auto border border-blue-300 rounded-xl px-5 py-3 text-lg bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-blue-400 shadow transition-all"
        >
          <option value="">All Types</option>
          <option value="Full Time">Full Time</option>
          <option value="Part Time">Part Time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
        </select>

        <input
          type="text"
          name="location"
          defaultValue={location}
          placeholder="Location"
          className="w-full md:w-auto border border-blue-300 rounded-xl px-5 py-3 text-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-400 shadow transition-all"
        />

        <button
          type="submit"
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-md transition-all text-lg"
        >
          🔍 Search
        </button>
      </form>

      {/* Jobs List */}
      <section className="grid gap-6 md:grid-cols-2">
        {jobs.length === 0 ? (
          <p className="text-center col-span-2 text-gray-500 italic">
            No jobs found. Try different filters!
          </p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className="bg-white border border-blue-100 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-xl font-bold text-blue-800 mb-1">
                  {job.title}
                </h2>
                <p className="text-sm text-gray-600 mb-3">{job.company}</p>

                <div className="flex flex-wrap gap-2 text-sm mb-4">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                    {job.type}
                  </span>
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    📍 {job.location}
                  </span>
                  {job.salary && (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                      💰 {job.salary}
                    </span>
                  )}
                </div>

                <p className="text-gray-700 line-clamp-3 mb-4">
                  {job.description}
                </p>
              </div>

              <div className="text-right text-xs text-gray-400">
                Posted on{" "}
                {new Date(job.postedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
}
