import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import {
  getAdminCategories,
  deleteAdminCategory,
} from "../../services/adminApi";

const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getAdminCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteAdminCategory(id);
        fetchCategories();
      } catch (error) {
        alert("Failed to delete category", error);
      }
    }
  };

  if (loading) {
    return (
      <div
        style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        }}
      >
        <style>{`
        .page-view-loader {
            width: 50px;
            aspect-ratio: 1;
            display: grid;
            border: 4px solid #1e1b4b;
            border-radius: 50%;
            border-color: #fff #1e1b4b;
            animation: l16 1s infinite linear;
        }
        .page-view-loader::before,
        .page-view-loader::after {
            content: "";
            grid-area: 1/1;
            margin: 2px;
            border: inherit;
            border-radius: 50%;
        }
        .page-view-loader::before {
            border-color: #5844E7 #1e1b4b;
            animation: inherit;
            animation-duration: 0.5s;
            animation-direction: reverse;
        }
        .page-view-loader::after {
            margin: 8px;
        }
        @keyframes l16 {
            100% {
            transform: rotate(1turn);
            }
        }
        `}</style>
        <div className="page-view-loader" aria-label="Loading" />
        <p style={{ marginTop: "1rem", color: "#1e1b4b" }}>Loading page...</p>
      </div>
    );
  };

  return (
    <div>
      <h1 className="admin-page-title">Categories</h1>

      <div className="admin-card">
        <div className="admin-table-controls">
          <div>
            Show{" "}
            <input type="number" defaultValue={10} style={{ width: "50px" }} />{" "}
            entries
          </div>
          <div>
            <Link to="/admin/categories/new" className="admin-btn">
              Add new Category
            </Link>
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Calculators</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id}>
                <td>{cat.id}</td>
                <td>{cat.name}</td>
                <td>{cat.slug}</td>
                <td>{cat.calculator_count ?? 0}</td>
                <td>
                  <Link
                    to={`/admin/categories/edit/${cat.id}`}
                    style={{
                      color: "#4caf50",
                      marginRight: "10px",
                      display: "inline-block",
                    }}
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    style={{
                      color: "#f44336",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={16} />
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

export default CategoriesList;
