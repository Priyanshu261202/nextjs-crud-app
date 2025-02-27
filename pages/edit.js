import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

export default function EditPost() {
  const router = useRouter();
  const { id } = router.query;
  const { register, handleSubmit, setValue } = useForm();
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setPost(data);
          setValue("title", data.title);
          setValue("body", data.body);
        });
    }
  }, [id, setValue]);

  const onSubmit = async (data) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    alert('Post updated!');
  };

  if (!post) return <p>Loading...</p>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <input {...register("title")} className="input input-bordered w-full mb-2" />
      <textarea {...register("body")} className="textarea textarea-bordered w-full mb-2" />
      <button type="submit" className="btn btn-primary">Update Post</button>
    </form>
  );
}
