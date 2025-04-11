import { useState, useEffect } from "react";
import { Package, Trash2, PencilLine } from "lucide-react";
import "./AdminDashboard.css";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    imageUrl: "",
    type: "",
  });
  const [editing, setEditing] = useState(false);
  const [filterType, setFilterType] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      imageUrl: formData.imageUrl,
      type: formData.type,
    };

    try {
      if (editing) {
        await axios.put(`${API_BASE_URL}/products/${formData.id}`, payload);
      } else {
        await axios.post(`${API_BASE_URL}/products`, payload);
      }
      fetchProducts();
      resetForm();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      price: "",
      description: "",
      imageUrl: "",
      type: "",
    });
    setEditing(false);
  };

  const handleEdit = (product) => {
    setFormData({
      ...product,
      price: product.price.toString(),
    });
    setEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`${API_BASE_URL}/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const filteredProducts = filterType
    ? products.filter((p) => p.type === filterType)
    : products;

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
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />

          <label>Price (₹)</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />

          <label>Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />

          <label>Image URL</label>
          <input
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            required
          />

          <label>Product Type</label>
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          >
            <option value="">Select Type</option>
            <option value="sweets">Sweets</option>
            <option value="veg-pickle">Veg Pickle</option>
            <option value="nonveg-pickle">Non-Veg Pickle</option>
          </select>

          <button type="submit">{editing ? "Update Product" : "Add Product"}</button>
        </form>
      </div>

      <div className="filter-section">
        <label>Filter by Type: </label>
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="">All</option>
          <option value="sweets">Sweets</option>
          <option value="veg-pickle">Veg Pickle</option>
          <option value="nonveg-pickle">Non-Veg Pickle</option>
        </select>
      </div>

      <div className="table-container">
        <h2>Products</h2>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.imageUrl} alt={p.name} width="50" />
                </td>
                <td>{p.name}</td>
                <td>₹{p.price.toFixed(2)}</td>
                <td>{p.type || "-"}</td>
                <td className="action-buttons">
                  <button className="edit-btn" onClick={() => handleEdit(p)}>
                    <PencilLine />
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(p.id)}>
                    <Trash2 />
                  </button>
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
