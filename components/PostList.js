import Link from "next/link";
import { deletePost } from "../utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function PostList({ posts }) {
  const queryClient = useQueryClient();
  const deleteMutation = useMutation(deletePost, {
    onSuccess: () => queryClient.invalidateQueries(["posts"]),
  });

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <div key={post.id} className="card bg-gray-100 p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold">{post.title}</h2>
          <p>{post.body}</p>
          <div className="flex space-x-2 mt-2">
            <Link href={`/edit/${post.id}`} className="btn btn-secondary">
              Edit
            </Link>
            <button onClick={() => deleteMutation.mutate(post.id)} className="btn btn-error">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
