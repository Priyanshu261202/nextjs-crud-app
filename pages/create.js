import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

const schema = z.object({
  title: z.string().min(3, "Title is too short"),
  body: z.string().min(10, "Body must be at least 10 characters long"),
});

export default function CreatePost() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  // Create post mutation
  const createMutation = useMutation({
    mutationFn: async (data) => {
      await axios.post("https://jsonplaceholder.typicode.com/posts", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
      router.push("/");
    },
  });

  const onSubmit = (data) => createMutation.mutate(data);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Create Post</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title")} placeholder="Title" className="input input-bordered w-full" />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        
        <textarea {...register("body")} placeholder="Body" className="textarea textarea-bordered w-full" />
        {errors.body && <p className="text-red-500">{errors.body.message}</p>}
        
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    </div>
  );
}
