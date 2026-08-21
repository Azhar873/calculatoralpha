import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAdminCategoryById,
  createAdminCategory,
  updateAdminCategory,
  uploadCategoryIcon,
  deleteAdminFile,
} from "../../services/adminApi";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    icon: "",
    color: "",
    description: "",
    meta_title: "",
    meta_description: "",
    meta_keywords: "",
  });
  const [loading, setLoading] = useState(isEditMode);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (isEditMode) {
      const loadCategory = async () => {
        try {
          const cat = await getAdminCategoryById(id);
          const apiBase = import.meta.env.VITE_API_URL || "";
          const baseUrl = apiBase.replace(/\/api\/?$/, "");
          let iconPath = cat.icon || "";

          if (iconPath && !iconPath.startsWith("http")) {
            if (iconPath.startsWith("/")) {
              iconPath = `${baseUrl}${iconPath}`;
            } else if (iconPath.startsWith("uploads/")) {
              iconPath = `${baseUrl}/${iconPath}`;
            } else {
              iconPath = `${baseUrl}/uploads/icons/${iconPath}`;
            }
          }

          setFormData({
            name: cat.name || "",
            slug: cat.slug || "",
            icon: cat.icon || "",
            color: cat.color || "",
            description: cat.description || "",
            meta_title: cat.meta_title || "",
            meta_description: cat.meta_description || "",
            meta_keywords: cat.meta_keywords || "",
          });
          setPreviewUrl(iconPath);
        } catch (error) {
          console.error("Failed to load category", error);
          alert("Category not found");
          navigate("/admin/categories");
        } finally {
          setLoading(false);
        }
      };
      loadCategory();
    }
  }, [id, isEditMode, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRemoveIcon = async () => {
    if (
      !window.confirm("Are you sure you want to delete this uploaded icon?")
    ) {
      return;
    }

    try {
      if (formData.icon) {
        await deleteAdminFile(formData.icon);
      }
    } catch (error) {
      console.warn("Could not delete server file", error);
    } finally {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl("");
      setFormData((prev) => ({ ...prev, icon: "" }));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }

      // Create a local preview URL
      const localPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(localPreviewUrl);

      // Upload to backend
      const response = await uploadCategoryIcon(file);

      // Store only the relative upload path in formData
      setFormData((prev) => ({
        ...prev,
        icon: response.path || response.filename,
      }));
    } catch (error) {
      alert("Failed to upload image: " + error.message);
      setPreviewUrl("");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleEditorChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      alert("Category name is required");
      return;
    }
    if (!formData.slug.trim()) {
      alert("Category slug is required");
      return;
    }
    
    // Clean up description - remove empty HTML tags from ReactQuill
    const cleanDescription = formData.description.replace(/<p><br><\/p>/g, '').trim();
    
    // Prepare data for submission
    const submitData = {
      ...formData,
      description: cleanDescription,
      // Ensure color is valid or empty
      color: formData.color ? formData.color.trim() : '',
      icon: formData.icon ? formData.icon.trim() : '',
    };
    
    console.log("Submitting category data:", submitData);
    
    try {
      if (isEditMode) {
        await updateAdminCategory(id, submitData);
        alert("Category updated successfully");
      } else {
        await createAdminCategory(submitData);
        alert("Category created successfully");
      }
      navigate("/admin/categories");
    } catch (error) {
      console.error("Category save error:", error);
      alert(`Failed to save category: ${error.message}`);
    }
  };

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div>
      <h1 className="admin-page-title">
        {isEditMode ? "EDIT CATEGORY" : "ADD CATEGORY"}
      </h1>

      <form onSubmit={handleSubmit} className="admin-card">
        <div style={{ maxWidth: "600px" }}>
          <div className="admin-form-group">
            <label htmlFor="cat_name">Category Name</label>
            <input
              id="cat_name"
              type="text"
              className="admin-form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="cat_slug">Category Url (Slug)</label>
            <input
              id="cat_slug"
              type="text"
              className="admin-form-control"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="cat_icon">Icon (Lucide name, URL or upload)</label>
            <div
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <input
                id="cat_icon"
                type="text"
                className="admin-form-control"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="Paste image URL or lucide icon name"
              />
              <input
                id="cat_icon_file"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="admin-file-input"
                title="Upload an image to use as icon"
                disabled={uploading}
              />
              {uploading && (
                <span style={{ fontSize: "12px", color: "#666" }}>
                  Uploading...
                </span>
              )}
              {previewUrl && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <img
                    src={previewUrl}
                    alt="icon preview"
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: "cover",
                      borderRadius: 4,
                    }}
                  />
                  <button
                    type="button"
                    className="admin-btn-outline"
                    style={{ height: 32, padding: "0 0.75rem" }}
                    onClick={handleRemoveIcon}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="cat_color">Color (CSS color or Hex)</label>
            <div
              style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
            >
              <input
                id="cat_color"
                type="text"
                className="admin-form-control"
                name="color"
                value={formData.color}
                onChange={handleChange}
              />
              <input
                id="cat_color_picker"
                type="color"
                className="admin-color-input"
                name="color"
                value={formData.color || "#000000"}
                onChange={handleChange}
                title="Pick a color (hex)"
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label>Description</label>
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
                style={{ height: "200px", marginBottom: "50px" }}
              />
            </div>
          </div>

          <div className="admin-form-group">
            <label htmlFor="cat_meta_title">Meta Title</label>
            <input
              id="cat_meta_title"
              type="text"
              className="admin-form-control"
              name="meta_title"
              value={formData.meta_title}
              onChange={handleChange}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="cat_meta_description">Meta Description</label>
            <textarea
              id="cat_meta_description"
              className="admin-form-control"
              name="meta_description"
              value={formData.meta_description}
              onChange={handleChange}
              rows={3}
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="cat_meta_keywords">Meta Keywords</label>
            <input
              id="cat_meta_keywords"
              type="text"
              className="admin-form-control"
              name="meta_keywords"
              value={formData.meta_keywords}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
            <button type="submit" className="admin-btn">
              {isEditMode ? "Update Category" : "Save Category"}
            </button>
            <button
              type="button"
              className="admin-btn-outline"
              onClick={() => navigate("/admin/categories")}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditCategory;
