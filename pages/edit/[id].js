import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById } from "../../utils/api";
import PostForm from "../../components/PostForm";

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const { data: post, isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => fetchPostById(id),
    enabled: !!id,
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Edit Post</h1>
      <PostForm post={post} />
    </div>
  );
}
