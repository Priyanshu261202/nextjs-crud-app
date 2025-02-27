import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 text-white flex justify-between">
      <h1 className="text-lg font-bold">CRUD App</h1>
      <div>
        <Link href="/" className="mr-4">Home</Link>
        <Link href="/create">Create Post</Link>
      </div>
    </nav>
  );
}
