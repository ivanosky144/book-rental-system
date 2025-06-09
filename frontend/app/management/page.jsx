import Link from "next/link";

export default function ManagementPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-teal-600">Admin Management</h1>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <Link href="/management/genre">
          <button className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition">Manage Genres</button>
        </Link>
        <Link href="/management/book-copy">
          <button className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition">Manage Book Copies</button>
        </Link>
        <Link href="/management/author">
          <button className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition">Manage Authors</button>
        </Link>
        {/* Tambahkan link ke fitur management lain di sini */}
      </div>
    </main>
  );
}