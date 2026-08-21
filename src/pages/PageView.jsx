import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SEO from "../components/SEO/SEO";
import {
  getPageBySlug,
  getSiteSettings,
  submitContactForm,
} from "../services/api";

const PageView = () => {
  const { pageSlug, slug } = useParams();
  const resolvedSlug = pageSlug || slug;
  const [page, setPage] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState({
    status: "idle",
    message: "",
  });
  // eslint-disable-next-line no-unused-vars
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPage = async () => {
      try {
        const [pageData, siteSettings] = await Promise.all([
          getPageBySlug(resolvedSlug),
          getSiteSettings(),
        ]);
        setPage(pageData);
        setSettings(siteSettings);
      } catch (err) {
        console.error("Failed to load page", err);
        setError("Page not found.");
      } finally {
        setLoading(false);
      }
    };

    loadPage();
  }, [resolvedSlug]);

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactStatus({ status: "loading", message: "Sending message..." });

    try {
      const data = await submitContactForm(contactForm);

      setContactStatus({
        status: "success",
        message: data.message || "Your message has been sent.",
      });
      setContactForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error(err);
      setContactStatus({
        status: "error",
        message: err.message || "Failed to send message.",
      });
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
  }

  if (error || !page) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
        }}
      >
        <h1>Page not found</h1>
        <p>Please check the URL or return to the homepage.</p>
      </div>
    );
  }

  const pageTitle = page.meta_title || page.title;
  const pageDescription =
    page.meta_description || page.heading || page.description || "";
  const pageKeywords = page.meta_keywords || "";

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    if (imagePath.startsWith("http")) return imagePath;
    const apiBase = import.meta.env.VITE_API_URL || "";
    const baseUrl = apiBase.replace(/\/api\/?$/, "");
    if (imagePath.startsWith("/")) return `${baseUrl}${imagePath}`;
    if (imagePath.startsWith("uploads/")) return `${baseUrl}/${imagePath}`;
    return `${baseUrl}/${imagePath}`;
  };

  return (
    <div
      className="page-container"
      style={{ padding: "2rem", maxWidth: 1200, margin: "0 auto" }}
    >
      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
      />

      <div style={{ marginBottom: "2rem" }}>
        <h1>{page.heading || page.title}</h1>
        {page.banner_image && page.page_type !== "contact" && (
          <img
            src={getImageUrl(page.banner_image)}
            alt={page.heading || page.title}
            style={{
              width: "100%",
              borderRadius: 16,
              marginTop: "1rem",
              objectFit: "cover",
            }}
          />
        )}
      </div>

      <div
        style={{ color: "#333", lineHeight: 1.8 }}
        dangerouslySetInnerHTML={{ __html: page.description || "" }}
      />

      {page.page_type === "contact" && (
        <div style={{ marginTop: "1rem", display: "grid", gap: "2rem" }}>
          {page.contact_intro && (
            <div
              style={{
                background: "#fff",
                padding: "1.5rem",
                borderRadius: 16,
                border: "1px solid #ececec",
              }}
            >
              <p style={{ margin: 0, color: "#333", lineHeight: 1.8 }}>
                {page.contact_intro}
              </p>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {(page.contact_email ||
              page.contact_phone ||
              page.contact_address) && (
              <div
                style={{
                  padding: "1.5rem",
                  borderRadius: 16,
                  background: "#fff",
                  border: "1px solid #ececec",
                }}
              >
                <h2 style={{ marginTop: 0, marginBottom: "1rem" }}>
                  Contact Details
                </h2>

                {page.contact_email && (
                  <p style={{ margin: "0.5rem 0" }}>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${page.contact_email}`}>
                      {page.contact_email}
                    </a>
                  </p>
                )}
                {page.contact_phone && (
                  <p style={{ margin: "0.5rem 0" }}>
                    <strong>Phone:</strong> {page.contact_phone}
                  </p>
                )}
                {/* {page.contact_address && (
                  <p style={{ margin: "0.5rem 0" }}>
                    <strong>Address:</strong> {page.contact_address}
                  </p>
                )} */}
                {page.banner_image && (
                  <img
                    src={getImageUrl(page.banner_image)}
                    alt={page.heading || page.title}
                    style={{
                      width: "100%",
                      borderRadius: 16,
                      marginTop: "1rem",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
            )}

            <div
              style={{
                padding: "1.5rem",
                borderRadius: 16,
                background: "#fff",
                border: "1px solid #ececec",
              }}
            >
              <h2 style={{ marginTop: 0, marginBottom: "1.5rem" }}>
                {page.contact_form_title || "Send a Message"}
              </h2>
              {contactStatus.status !== "idle" && (
                <div
                  style={{
                    marginBottom: "1rem",
                    padding: "1rem",
                    borderRadius: 12,
                    background:
                      contactStatus.status === "success"
                        ? "#e6ffed"
                        : "#ffe6e6",
                    color:
                      contactStatus.status === "success"
                        ? "#1a7f37"
                        : "#b71c1c",
                  }}
                >
                  {contactStatus.message}
                </div>
              )}

              <form onSubmit={handleContactSubmit}>
                <div style={{ display: "grid", gap: "1rem" }}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    required
                    style={{
                      padding: "0.9rem",
                      borderRadius: 8,
                      border: "1px solid #ddd",
                      width: "100%",
                    }}
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    required
                    style={{
                      padding: "0.9rem",
                      borderRadius: 8,
                      border: "1px solid #ddd",
                      width: "100%",
                    }}
                  />
                  <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={contactForm.subject}
                    onChange={handleContactChange}
                    style={{
                      padding: "0.9rem",
                      borderRadius: 8,
                      border: "1px solid #ddd",
                      width: "100%",
                    }}
                  />
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    required
                    rows={6}
                    style={{
                      padding: "0.9rem",
                      borderRadius: 8,
                      border: "1px solid #ddd",
                      width: "100%",
                      resize: "vertical",
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: "#5944E7",
                      color: "#fff",
                      border: "none",
                      padding: "0.9rem 1.2rem",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                    disabled={contactStatus.status === "loading"}
                  >
                    {contactStatus.status === "loading"
                      ? "Sending..."
                      : page.contact_submit_label || "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {page.footer_text && page.page_type !== "contact" && (
        <div
          style={{
            marginTop: "3rem",
            padding: "1.5rem",
            background: "#fafafa",
            borderRadius: 12,
            border: "1px solid #ececec",
          }}
        >
          <p style={{ margin: 0, color: "#555" }}>{page.footer_text}</p>
        </div>
      )}
    </div>
  );
};

export default PageView;
