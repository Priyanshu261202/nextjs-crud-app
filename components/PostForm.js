import { useForm } from "react-hook-form";
import { createPost, updatePost } from "../utils/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function PostForm({ post }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: post || { title: "", body: "" },
  });

  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation(post ? updatePost : createPost, {
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      router.push("/");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(post ? { ...data, id: post.id } : data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input className="input input-bordered w-full" {...register("title")} placeholder="Title" />
      <textarea className="textarea textarea-bordered w-full" {...register("body")} placeholder="Body" />
      <button type="submit" className="btn btn-primary">{post ? "Update" : "Create"} Post</button>
    </form>
  );
}
