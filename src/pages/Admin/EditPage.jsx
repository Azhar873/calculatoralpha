import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getAdminPageById,
  createAdminPage,
  updateAdminPage,
  uploadAdminFile,
  deleteAdminFile,
} from "../../services/adminApi";

const EditPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const isTemplateMode =
    !isEditMode &&
    new URLSearchParams(location.search).get("template") === "contact-us";

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    heading: "",
    banner_image: "",
    page_type: "default",
    meta_title: "",
    meta_description: "",
    description: "",
    show_in_header: false,
    footer_text: "",
    footer_section: "",
    contact_email: "",
    contact_phone: "",
    contact_address: "",
    contact_intro: "",
    contact_form_title: "",
    contact_submit_label: "",
  });
  const [loading, setLoading] = useState(isEditMode);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (isEditMode) {
      const loadPage = async () => {
        try {
          const page = await getAdminPageById(id);
          setFormData({
            title: page.title || "",
            slug: page.slug || "",
            heading: page.heading || "",
            banner_image: page.banner_image || "",
            page_type: page.page_type || "default",
            meta_title: page.meta_title || "",
            meta_description: page.meta_description || "",
            description: page.description || "",
            show_in_header: Boolean(Number(page.show_in_header)),
            footer_text: page.footer_text || "",
            footer_section: page.footer_section || "",
            contact_email: page.contact_email || "",
            contact_phone: page.contact_phone || "",
            contact_address: page.contact_address || "",
            contact_intro: page.contact_intro || "",
            contact_form_title: page.contact_form_title || "",
            contact_submit_label: page.contact_submit_label || "",
          });

          if (page.banner_image) {
            const getImageUrl = (imagePath) => {
              if (!imagePath) return "";
              if (imagePath.startsWith("http")) return imagePath;
              const apiBase = import.meta.env.VITE_API_URL || "";
              const baseUrl = apiBase.replace(/\/api\/?$/, "");
              if (imagePath.startsWith("/")) return `${baseUrl}${imagePath}`;
              if (imagePath.startsWith("uploads/")) return `${baseUrl}/${imagePath}`;
              return `${baseUrl}/${imagePath}`;
            };

            setPreviewUrl(getImageUrl(page.banner_image));
          }
        } catch (error) {
          console.error("Failed to load page", error);
          alert("Page not found");
          navigate("/admin/pages");
        } finally {
          setLoading(false);
        }
      };

      loadPage();
      return;
    }

    if (isTemplateMode) {
      setFormData({
        title: "Contact Us",
        slug: "contact-us",
        heading: "Contact Us",
        banner_image: "",
        page_type: "contact",
        meta_title: "Contact Us - Calculatoralpha",
        meta_description:
          "Get in touch with Calculatoralpha for support, feedback, and partnership inquiries.",
        description:
          "<p>Please use the form below to contact our team directly.</p>",
        show_in_header: false,
        footer_text: "Contact us anytime for help or questions.",
        footer_section: "resources",
        contact_email: "support@calculatoralpha.com",
        contact_phone: "+1 234 567 890",
        contact_address: "123 Calculator Street, Math City",
        contact_intro: "Send us a message and we will get back to you soon.",
        contact_form_title: "Send a Message",
        contact_submit_label: "Submit",
      });
    }

    setLoading(false);
  }, [id, isEditMode, isTemplateMode, navigate]);

  useEffect(() => {
    return () => {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditorChange = (value) => {
    setFormData((prev) => ({ ...prev, description: value }));
  };

  const handleRemoveBannerImage = async () => {
    if (!window.confirm("Are you sure you want to delete this banner image?")) {
      return;
    }

    try {
      if (formData.banner_image) {
        await deleteAdminFile(formData.banner_image);
      }
    } catch (error) {
      console.warn("Could not delete server file", error);
    } finally {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl("");
      setFormData((prev) => ({ ...prev, banner_image: "" }));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    // no size limit enforced here — allow preview and upload of large images

    setUploading(true);
    try {
      if (previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }

      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);

      const uploadResponse = await uploadAdminFile(file);
      setFormData((prev) => ({
        ...prev,
        banner_image: uploadResponse.path || uploadResponse.filename || "",
      }));
    } catch (error) {
      alert("Failed to upload image");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditMode) {
        await updateAdminPage(id, formData);
        alert("Page updated successfully");
      } else {
        await createAdminPage(formData);
        alert("Page created successfully");
      }
      navigate("/admin/pages");
    } catch (error) {
      alert("Failed to save page");
      console.error(error);
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
      <h1 className="admin-page-title">
        {isEditMode ? "EDIT PAGE" : "ADD PAGE"}
      </h1>

      <form onSubmit={handleSubmit} className="admin-card">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "2rem",
          }}
        >
          {formData.page_type !== "contact" && (
            <div>
              <div className="admin-form-group">
                <label htmlFor="page_title">Page Title</label>
                <input
                  id="page_title"
                  type="text"
                  name="title"
                  className="admin-form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="page_slug">Page Slug</label>
                <input
                  id="page_slug"
                  type="text"
                  name="slug"
                  className="admin-form-control"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                />
                <small style={{ color: "#666" }}>
                  Example: <code>about-us</code> or <code>contact</code>
                </small>
              </div>

              <div className="admin-form-group">
                <label htmlFor="page_heading">Page Heading</label>
                <input
                  id="page_heading"
                  type="text"
                  name="heading"
                  className="admin-form-control"
                  value={formData.heading}
                  onChange={handleChange}
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="page_description">Page Content</label>
                <div
                  style={{
                    background: "white",
                    color: "#333",
                  }}
                >
                  <ReactQuill
                    theme="snow"
                    value={formData.description}
                    onChange={handleEditorChange}
                    style={{
                      minHeight: "250px",
                      height: "250px",
                      marginBottom: "1rem",
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          <div>
            {formData.page_type !== "contact" && (
              <div className="admin-form-group">
                <label>Banner Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="admin-form-control"
                />
                {uploading && (
                  <p style={{ color: "#666", marginTop: "0.5rem" }}>
                    Uploading...
                  </p>
                )}
                {previewUrl && (
                  <div style={{ marginTop: "1rem" }}>
                    <img
                      src={previewUrl}
                      alt="Banner preview"
                      style={{
                        maxWidth: "100%",
                        height: "auto",
                        borderRadius: 8,
                      }}
                    />
                    <button
                      type="button"
                      className="admin-btn-outline"
                      style={{ marginTop: "0.75rem" }}
                      onClick={handleRemoveBannerImage}
                    >
                      Delete Image
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="admin-form-group">
              <label htmlFor="page_type">Page Type</label>
              <select
                id="page_type"
                name="page_type"
                className="admin-form-control"
                value={formData.page_type}
                onChange={handleChange}
              >
                <option value="default">Default</option>
                <option value="contact">Contact</option>
              </select>
            </div>

            {formData.page_type === "contact" && (
              <>
                <div className="admin-form-group">
                  <label htmlFor="contact_form_title">Page Title</label>
                  <input
                    id="contact_form_title"
                    name="contact_form_title"
                    type="text"
                    className="admin-form-control"
                    value={formData.contact_form_title}
                    onChange={handleChange}
                  />
                </div>
                <div className="admin-form-group">
                  <label htmlFor="contact_intro">Contact Intro</label>
                  <textarea
                    id="contact_intro"
                    name="contact_intro"
                    className="admin-form-control"
                    value={formData.contact_intro}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
                <div className="admin-form-group">
                  <label htmlFor="contact_email">Contact Email</label>
                  <input
                    id="contact_email"
                    name="contact_email"
                    type="email"
                    className="admin-form-control"
                    value={formData.contact_email}
                    onChange={handleChange}
                  />
                </div>
                <div className="admin-form-group">
                  <label htmlFor="contact_phone">Contact Phone</label>
                  <input
                    id="contact_phone"
                    name="contact_phone"
                    type="text"
                    className="admin-form-control"
                    value={formData.contact_phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="admin-form-group">
                  <label>Banner Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="admin-form-control"
                  />
                  {uploading && (
                    <p style={{ color: "#666", marginTop: "0.5rem" }}>
                      Uploading...
                    </p>
                  )}
                  {previewUrl && (
                    <div style={{ marginTop: "1rem" }}>
                      <img
                        src={previewUrl}
                        alt="Banner preview"
                        style={{
                          maxWidth: "100%",
                          height: "auto",
                          borderRadius: 8,
                        }}
                      />
                      <button
                        type="button"
                        className="admin-btn-outline"
                        style={{ marginTop: "0.75rem" }}
                        onClick={handleRemoveBannerImage}
                      >
                        Delete Image
                      </button>
                    </div>
                  )}
                </div>

                <div className="admin-form-group">
                  <label htmlFor="contact_address">Contact Address</label>
                  <textarea
                    id="contact_address"
                    name="contact_address"
                    className="admin-form-control"
                    value={formData.contact_address}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                <div className="admin-form-group">
                  <label htmlFor="contact_submit_label">
                    Submit Button Label
                  </label>
                  <input
                    id="contact_submit_label"
                    name="contact_submit_label"
                    type="text"
                    className="admin-form-control"
                    value={formData.contact_submit_label}
                    onChange={handleChange}
                  />
                </div>
              </>
            )}

            <div className="admin-form-group">
              <label htmlFor="page_show_in_header">
                <input
                  id="page_show_in_header"
                  name="show_in_header"
                  type="checkbox"
                  checked={formData.show_in_header}
                  onChange={handleChange}
                />{" "}
                Show in Header Menu
              </label>
            </div>

            <div className="admin-form-group">
              <label htmlFor="page_footer_section">Show in Footer</label>
              <select
                id="page_footer_section"
                name="footer_section"
                className="admin-form-control"
                value={formData.footer_section}
                onChange={handleChange}
              >
                <option value="">Do not show</option>
                <option value="explore">Explore</option>
                <option value="resources">Resources</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label htmlFor="page_meta_title">Meta Title</label>
              <textarea
                id="page_meta_title"
                name="meta_title"
                className="admin-form-control"
                value={formData.meta_title}
                onChange={handleChange}
                rows={3}
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="page_meta_description">Meta Description</label>
              <textarea
                id="page_meta_description"
                name="meta_description"
                className="admin-form-control"
                value={formData.meta_description}
                onChange={handleChange}
                rows={4}
              />
            </div>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
              <button type="submit" className="admin-btn">
                {isEditMode ? "Update Page" : "Save Page"}
              </button>
              <button
                type="button"
                className="admin-btn-outline"
                onClick={() => navigate("/admin/pages")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
