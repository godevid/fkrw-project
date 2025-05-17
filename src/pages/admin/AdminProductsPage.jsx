// src/pages/admin/AdminProductsPage.jsx
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseClient';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
  });

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'products'), {
      ...newProduct,
      price: parseFloat(newProduct.price),
    });
    setNewProduct({ name: '', description: '', price: '', category: '' });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'products', id));
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Produk</h2>

      <form onSubmit={handleAddProduct} className="space-y-2 mb-6">
        <input
          type="text"
          placeholder="Nama Produk"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <textarea
          placeholder="Deskripsi"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <input
          type="number"
          placeholder="Harga"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="text"
          placeholder="Kategori"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">Tambah Produk</button>
      </form>

      <ul className="space-y-2">
        {products.map((p) => (
          <li key={p.id} className="border p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{p.name}</h3>
              <p>{p.description}</p>
              <p>Harga: {p.price}</p>
              <p>Kategori: {p.category}</p>
            </div>
            <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white p-2 rounded">Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}