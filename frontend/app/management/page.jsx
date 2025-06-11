import Link from "next/link";

const managementLinks = [
  { href: "/management/genre", label: "Manage Genres" },
  { href: "/management/book-copy", label: "Manage Book Copies" },
  { href: "/management/author", label: "Manage Authors" },
  { href: "/management/publisher", label: "Manage Publishers" },
  // Tambahkan link ke fitur management lain di sini
];

const retroButtonClass =
  "w-full bg-[#ffffdd] text-[#134e4a] border-2 border-black rounded-[6px] shadow-[4px_4px_0_0_#5eead4] pixel-font text-lg font-normal transition-all duration-200 hover:text-[#29b9b9] focus:outline-none py-3 px-4 group-hover:border-[#29b9b9] group-hover:scale-105";

export default function ManagementPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-5xl font-extrabold mb-8 text-teal-600 pixel-font drop-shadow-[2px_2px_0_#000]">
        Admin Management
      </h1>
      <div className="flex flex-col gap-4 w-full max-w-md">
        {managementLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            <div className="group">
              <button className={retroButtonClass}>{link.label}</button>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}