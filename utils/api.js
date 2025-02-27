const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const fetchPostById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return res.json();
};

export const createPost = async (post) => {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(post),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

export const updatePost = async (post) => {
  const res = await fetch(`${API_URL}/${post.id}`, {
    method: "PUT",
    body: JSON.stringify(post),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
};

export const deletePost = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
