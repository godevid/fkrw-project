
// src/pages/admin/blog.tsx
import { useEffect, useState } from "react";
import { db, storage, auth } from "../../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const BlogAdminPage = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [form, setForm] = useState<any>({
    title: "",
    content: "",
    tags: "",
    image: null,
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const querySnapshot = await getDocs(collection(db, "blogPosts"));
    setBlogs(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    setForm((prev: any) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let coverImage = "";
    if (form.image) {
      const imageRef = ref(storage, `blog/${form.image.name}`);
      await uploadBytes(imageRef, form.image);
      coverImage = await getDownloadURL(imageRef);
    }

    const blogData = {
      title: form.title,
      content: form.content,
      tags: form.tags.split(",").map((tag: string) => tag.trim()),
      coverImage,
      createdAt: serverTimestamp(),
    };

    if (editingId) {
      await updateDoc(doc(db, "blogPosts", editingId), blogData);
      setEditingId(null);
    } else {
      await addDoc(collection(db, "blogPosts"), blogData);
    }

    setForm({ title: "", content: "", tags: "", image: null });
    fetchBlogs();
  };

  const handleEdit = (blog: any) => {
    setEditingId(blog.id);
    setForm({
      title: blog.title,
      content: blog.content,
      tags: blog.tags.join(", "),
      image: null,
    });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "blogPosts", id));
    fetchBlogs();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Kelola Artikel Blog</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <input type="text" name="title" placeholder="Judul" value={form.title} onChange={handleInputChange} className="w-full border p-2 rounded" required />
        <textarea name="content" placeholder="Konten HTML" value={form.content} onChange={handleInputChange} className="w-full border p-2 rounded h-40" required />
        <input type="text" name="tags" placeholder="Tag (pisahkan dengan koma)" value={form.tags} onChange={handleInputChange} className="w-full border p-2 rounded" />
        <input type="file" onChange={handleFileChange} className="w-full" />

        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded">
          {editingId ? "Update Artikel" : "Tambah Artikel"}
        </button>
      </form>

      <div className="mt-8 grid gap-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{blog.title}</h2>
            <p dangerouslySetInnerHTML={{ __html: blog.content }} className="line-clamp-3" />
            {blog.coverImage && <img src={blog.coverImage} alt={blog.title} className="w-32 h-32 object-cover mt-2" />}
            <div className="text-sm mt-1 text-gray-500">Tags: {blog.tags.join(", ")}</div>
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(blog)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(blog.id)} className="bg-red-600 text-white px-3 py-1 rounded">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogAdminPage;
