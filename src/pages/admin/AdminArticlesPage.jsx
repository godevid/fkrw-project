// src/pages/admin/AdminArticlesPage.jsx
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseClient';

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    tags: '',
  });

  const fetchArticles = async () => {
    const querySnapshot = await getDocs(collection(db, 'blogPosts'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setArticles(data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleAddArticle = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'blogPosts'), {
      ...newArticle,
      tags: newArticle.tags.split(',').map(tag => tag.trim()),
    });
    setNewArticle({ title: '', content: '', tags: '' });
    fetchArticles();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'blogPosts', id));
    fetchArticles();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Artikel Blog</h2>

      <form onSubmit={handleAddArticle} className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Judul"
          value={newArticle.title}
          onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          placeholder="Konten"
          value={newArticle.content}
          onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
          className="border p-2 rounded w-full"
          rows={4}
          required
        />
        <input
          type="text"
          placeholder="Tags (pisahkan dengan koma)"
          value={newArticle.tags}
          onChange={(e) => setNewArticle({ ...newArticle, tags: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Tambah Artikel</button>
      </form>

      <ul className="space-y-2">
        {articles.map((a) => (
          <li key={a.id} className="border p-4 rounded flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-sm">{a.content}</p>
              <p className="text-xs mt-1 text-gray-500">Tags: {a.tags?.join(', ')}</p>
            </div>
            <button onClick={() => handleDelete(a.id)} className="bg-red-500 text-white p-2 rounded h-fit">Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}