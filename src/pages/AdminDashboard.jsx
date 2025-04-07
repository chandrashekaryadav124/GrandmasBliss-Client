import { useState, useEffect } from "react";
import { Package, Trash2, PencilLine } from "lucide-react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [categories, setCategories] = useState(() => {
    const savedCategories = localStorage.getItem("categories");
    return savedCategories ? JSON.parse(savedCategories) : ["Sweets", "Pickles"];
  });

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    category: "Sweets",
  });

  const [editing, setEditing] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [products, categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProduct = { ...formData, price: parseFloat(formData.price) };

    if (editing) {
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === formData.id ? updatedProduct : p))
      );
      setEditing(false);
    } else {
      setProducts((prevProducts) => [
        ...prevProducts,
        { ...updatedProduct, id: Date.now().toString() },
      ]);
    }

    setFormData({ id: "", name: "", price: "", description: "", imageUrl: "", category: "Sweets" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
    }
  };

  const handleEdit = (product) => {
    setFormData({ ...product, price: product.price.toString() });
    setEditing(true);
  };

  const addCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    }
  };

  return (
    <div className="container">
      <div className="admin-header">
        <Package className="icon" />
        <h1>Seller Dashboard</h1>
      </div>

      <div className="form-container">
        <h2>{editing ? "Edit Product" : "Add New Product"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />

          <label>Price</label>
          <input type="number" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} required step="0.01" />

          <label>Description</label>
          <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />

          <label>Image URL</label>
          <input type="url" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} required />

          <label>Category</label>
          <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <button type="submit">{editing ? "Update Product" : "Add Product"}</button>
        </form>

        <div className="category-section">
          <h3>Add New Category</h3>
          <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Enter category name" />
          <button onClick={addCategory}>Add Category</button>
        </div>
      </div>

      <div className="table-container">
        <h2>Products</h2>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td><img src={product.imageUrl} alt={product.name} /></td>
                <td>{product.name}</td>
                <td>Rs{product.price.toFixed(2)}</td>
                <td>{product.category}</td>
                <td className="action-buttons">
                  <button className="edit-btn" onClick={() => handleEdit(product)}><PencilLine /></button>
                  <button className="delete-btn" onClick={() => handleDelete(product.id)}><Trash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;