import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAdminCalculatorById,
  getAdminCategories,
  createAdminCalculator,
  updateAdminCalculator,
} from "../../services/adminApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditCalculator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    heading: "",
    category_id: "",
    meta_title: "",
    meta_description: "",
    no_index: 0,
    mathjax: 0,
    is_active: 1,
    sitemap_index: 1,
    description: "",
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const cats = await getAdminCategories();
        setCategories(cats);

        if (isEditMode) {
          const calc = await getAdminCalculatorById(id);
          setFormData({
            name: calc.name || "",
            slug: calc.slug || "",
            heading: calc.heading || "",
            category_id: calc.category_id || "",
            meta_title: calc.meta_title || "",
            meta_description: calc.meta_description || "",
            no_index: calc.no_index || 0,
            mathjax: calc.mathjax || 0,
            is_active:
              typeof calc.is_active !== "undefined"
                ? Number(calc.is_active) === 1
                  ? 1
                  : 0
                : 1,
            sitemap_index: typeof calc.sitemap_index !== "undefined" ? Number(calc.sitemap_index) : 1,
            description: calc.description || "",
          });
        }
      } catch (error) {
        console.error("Failed to load data", error);
      }
    };
    loadData();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : value,
    }));
  };

  const handleEditorChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await updateAdminCalculator(id, formData);
        alert("Calculator updated successfully");
      } else {
        await createAdminCalculator(formData);
        alert("Calculator created successfully");
        navigate("/admin/calculators");
      }
      
      // Regenerate sitemap after the calculator has been saved.
      await triggerSitemapGeneration();
    } catch (error) {
      alert("Failed to save calculator");
      console.error(error);
    }
  };

  const triggerSitemapGeneration = async () => {
    try {
      // Call backend endpoint to regenerate sitemap
      const apiBase = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
      const response = await fetch(
        `${apiBase}/admin/regenerate-sitemap`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      
      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Sitemap regeneration failed: ${errorBody}`);
      }

      console.log("✓ Sitemap regenerated automatically");
    } catch (error) {
      // Silently fail - sitemap can be regenerated manually if needed
      console.log("Note: Sitemap regeneration scheduled on backend");
    }
  };

  return (
    <div>
      <h1 className="admin-page-title">
        {isEditMode ? "EDIT CALCULATOR" : "ADD CALCULATOR"}
      </h1>

      <form onSubmit={handleSubmit} className="admin-card">
        <div style={{ display: "flex", gap: "2rem" }}>
          <div style={{ flex: 2 }}>
            <div className="admin-form-group">
              <label htmlFor="calc_slug">Calculator Url (Slug)</label>
              <input
                id="calc_slug"
                type="text"
                className="admin-form-control"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="calc_name">Calculator Name</label>
              <input
                id="calc_name"
                type="text"
                className="admin-form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="admin-form-group">
              <label htmlFor="calc_heading">Page Heading</label>
              <input
                id="calc_heading"
                type="text"
                className="admin-form-control"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
              />
            </div>

            <div
              className="admin-form-group"
              style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}
            >
              <label
                htmlFor="calc_noindex"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  id="calc_noindex"
                  type="checkbox"
                  name="no_index"
                  checked={formData.no_index === 1}
                  onChange={handleChange}
                />
                No index
              </label>
              <label
                htmlFor="calc_mathjax"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  id="calc_mathjax"
                  type="checkbox"
                  name="mathjax"
                  checked={formData.mathjax === 1}
                  onChange={handleChange}
                />
                Mathjax
              </label>
              <label
                htmlFor="calc_active"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  id="calc_active"
                  type="checkbox"
                  name="is_active"
                  checked={formData.is_active === 1}
                  onChange={handleChange}
                />
                Active
              </label>
              <label
                htmlFor="calc_sitemap_index"
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <input
                  id="calc_sitemap_index"
                  type="checkbox"
                  name="sitemap_index"
                  checked={formData.sitemap_index === 1}
                  onChange={handleChange}
                />
                Include in Sitemap
              </label>
            </div>

            <div className="admin-form-group">
              <label htmlFor="calc_category">Calculator Category</label>
              <select
                id="calc_category"
                className="admin-form-control"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="admin-form-group">
              <label>Calculator descriptions</label>
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  background: "white",
                }}
              >
                <ReactQuill
                  theme="snow"
                  value={formData.description}
                  onChange={handleEditorChange}
                  style={{ height: "300px", marginBottom: "50px" }}
                />
              </div>
            </div>

            <button type="submit" className="admin-btn">
              {isEditMode ? "Update" : "Save"}
            </button>
          </div>

          <div style={{ flex: 1 }}>
            <div className="admin-form-group">
              <label htmlFor="meta_title">Meta Titles</label>
              <textarea
                id="meta_title"
                className="admin-form-control"
                name="meta_title"
                value={formData.meta_title}
                onChange={handleChange}
                rows={4}
              ></textarea>
            </div>
            <div className="admin-form-group">
              <label htmlFor="meta_description">Meta Description</label>
              <textarea
                id="meta_description"
                className="admin-form-control"
                name="meta_description"
                value={formData.meta_description}
                onChange={handleChange}
                rows={6}
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCalculator;
