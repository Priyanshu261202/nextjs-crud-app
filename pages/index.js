import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import PostItem from "../components/PostItem";

export default function Home() {
  const queryClient = useQueryClient();

  // Fetch posts
  const { data: posts, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      return res.data.slice(0, 10); // Limit to 10 posts
    },
  });

  // Delete post mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading posts.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <Link href="/create" className="btn btn-primary mb-4">Create New Post</Link>
      <div className="space-y-4">
        {posts.map((post) => (
          <PostItem key={post.id} post={post} onDelete={deleteMutation.mutate} />
        ))}
      </div>
    </div>
  );
}
