import Link from "next/link";

export default function PostItem({ post, onDelete }) {
  return (
    <div className="card bg-base-100 shadow-md p-4">
      <h2 className="text-xl font-semibold">{post.title}</h2>
      <p className="text-gray-600">{post.body}</p>
      <div className="mt-2 flex gap-2">
        <Link href={`/edit/${post.id}`} className="btn btn-sm btn-warning">Edit</Link>
        <button onClick={() => onDelete(post.id)} className="btn btn-sm btn-error">Delete</button>
      </div>
    </div>
  );
}
