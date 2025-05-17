
// src/pages/admin/products.tsx
import { useEffect, useState } from "react";
import { db, storage } from "../../lib/firebase";
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
import { auth } from "../../lib/firebase";
import { useNavigate } from "react-router-dom";

const ProductAdminPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [form, setForm] = useState<any>({
    name: "",
    description: "",
    specs: {
      ampere: "",
      voltage: "",
      size: "",
    },
    price: "",
    category: "Mobil",
    embedCode: "",
    image: null,
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    setProducts(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    if (["ampere", "voltage", "size"].includes(name)) {
      setForm((prev: any) => ({
        ...prev,
        specs: { ...prev.specs, [name]: value },
      }));
    } else {
      setForm((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: any) => {
    setForm((prev: any) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let imageUrl = "";
    if (form.image) {
      const imageRef = ref(storage, `products/${form.image.name}`);
      await uploadBytes(imageRef, form.image);
      imageUrl = await getDownloadURL(imageRef);
    }

    const productData = {
      name: form.name,
      description: form.description,
      specs: form.specs,
      price: parseFloat(form.price),
      category: form.category,
      embedCode: form.embedCode,
      imageUrl,
      createdAt: serverTimestamp(),
    };

    if (editingId) {
      await updateDoc(doc(db, "products", editingId), productData);
      setEditingId(null);
    } else {
      await addDoc(collection(db, "products"), productData);
    }

    setForm({
      name: "",
      description: "",
      specs: { ampere: "", voltage: "", size: "" },
      price: "",
      category: "Mobil",
      embedCode: "",
      image: null,
    });

    fetchProducts();
  };

  const handleEdit = (product: any) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      description: product.description,
      specs: product.specs,
      price: product.price,
      category: product.category,
      embedCode: product.embedCode,
      image: null,
    });
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Kelola Produk</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <input type="text" name="name" placeholder="Nama Produk" value={form.name} onChange={handleInputChange} className="w-full border p-2 rounded" required />
        <textarea name="description" placeholder="Deskripsi" value={form.description} onChange={handleInputChange} className="w-full border p-2 rounded" required />

        <div className="flex gap-2">
          <input type="text" name="ampere" placeholder="Ampere" value={form.specs.ampere} onChange={handleInputChange} className="w-full border p-2 rounded" />
          <input type="text" name="voltage" placeholder="Voltage" value={form.specs.voltage} onChange={handleInputChange} className="w-full border p-2 rounded" />
          <input type="text" name="size" placeholder="Size" value={form.specs.size} onChange={handleInputChange} className="w-full border p-2 rounded" />
        </div>

        <input type="number" name="price" placeholder="Harga" value={form.price} onChange={handleInputChange} className="w-full border p-2 rounded" required />
        <select name="category" value={form.category} onChange={handleInputChange} className="w-full border p-2 rounded">
          <option value="Mobil">Mobil</option>
          <option value="Motor">Motor</option>
          <option value="Truk">Truk</option>
        </select>

        <textarea name="embedCode" placeholder="Embed Code 3D View" value={form.embedCode} onChange={handleInputChange} className="w-full border p-2 rounded" />

        <input type="file" onChange={handleFileChange} className="w-full" />

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          {editingId ? "Update Produk" : "Tambah Produk"}
        </button>
      </form>

      <div className="mt-8 grid gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p>{product.description}</p>
            {product.imageUrl && <img src={product.imageUrl} alt={product.name} className="w-32 h-32 object-cover mt-2" />}
            <div className="flex gap-2 mt-2">
              <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(product.id)} className="bg-red-600 text-white px-3 py-1 rounded">Hapus</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductAdminPage;
