import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2, FileText, Mail } from "lucide-react";
import { getAdminPages, deleteAdminPage } from "../../services/adminApi";

const PagesList = () => {
  const [pages, setPages] = useState([]);
  const [contactPage, setContactPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const data = await getAdminPages();
      let items = [];
      if (Array.isArray(data)) {
        items = data;
      } else if (data && Array.isArray(data.data)) {
        items = data.data;
      } else {
        console.warn('getAdminPages returned unexpected response:', data);
        items = [];
      }
      setPages(items);
      setContactPage(items.find((page) => page.slug === "contact-us" || page.slug === "contact") || null);
    } catch (error) {
      console.error("Error fetching pages", error);
      setPages([]);
      setContactPage(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this page?")) {
      return;
    }

    try {
      await deleteAdminPage(id);
      fetchPages();
    } catch (error) {
      alert("Failed to delete page");
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
  }

  if (!Array.isArray(pages)) {
    return (
      <div>
        <h1 className="admin-page-title">Pages</h1>
        <div className="admin-card">Unexpected data returned from server. Check console for details.</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="admin-page-title">Pages</h1>

      <div className="admin-card">
        <div className="admin-table-controls">
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/admin/pages/new" className="admin-btn">
              <FileText size={16} /> Add new Page
            </Link>
            <Link
              to={contactPage ? `/admin/pages/edit/${contactPage.id}` : "/admin/pages/new?template=contact-us"}
              className="admin-btn"
              style={{ backgroundColor: '#0b72f6' }}
            >
              <Mail size={16} /> {contactPage ? 'Edit Contact Us' : 'Create Contact Us'}
            </Link>
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Slug</th>
              <th>Heading</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {pages.map((page) => (
              <tr key={page.id}>
                <td>{page.id}</td>
                <td>{page.title}</td>
                <td>{page.slug}</td>
                <td>{page.heading}</td>
                <td>
                  <Link
                    to={`/admin/pages/edit/${page.id}`}
                    style={{
                      color: "#4caf50",
                      marginRight: "10px",
                      display: "inline-block",
                    }}
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(page.id)}
                    style={{
                      color: "#f44336",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    title="Delete page"
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

export default PagesList;
