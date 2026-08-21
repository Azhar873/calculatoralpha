import React, { useEffect, useState } from "react";
import { getAdminContacts, deleteAdminContact } from "../../services/adminApi";
import { Trash2, Eye } from "lucide-react";

const ContactInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await getAdminContacts();
      // res expected { count, data }
      setInquiries(
        Array.isArray(res.data) ? res.data : Array.isArray(res) ? res : [],
      );
    } catch (err) {
      console.error("Failed to load inquiries", err);
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;
    try {
      await deleteAdminContact(id);
      fetchInquiries();
    } catch (err) {
      alert("Failed to delete");
      console.error(err);
    }
  };

  const handleView = (inq) => {
    setSelectedInquiry(inq);
  };

  const closeModal = () => setSelectedInquiry(null);

  if (loading) return <div className="admin-loading">Loading...</div>;

  return (
    <div>
      <h1 className="admin-page-title">Contact Inquiries</h1>
      <div className="admin-card">
        {inquiries.length === 0 ? (
          <p>No inquiries yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Received</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inq) => (
                <tr key={inq.id}>
                  <td>{inq.id}</td>
                  <td>{inq.name}</td>
                  <td>{inq.email}</td>
                  <td>{inq.subject}</td>
                  <td style={{ maxWidth: 480, whiteSpace: "normal" }}>
                    {inq.message}
                  </td>
                  <td>{inq.created_at}</td>
                  <td style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => handleView(inq)}
                      title="View"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#0b72f6",
                      }}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(inq.id)}
                      title="Delete"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#f44336",
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {selectedInquiry && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={closeModal}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff",
              padding: "1.5rem",
              borderRadius: 8,
              width: "min(900px, 95%)",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            >
              <h2 style={{ margin: 0 }}>Inquiry #{selectedInquiry.id}</h2>
              <button
                onClick={closeModal}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: 18,
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <strong>Name:</strong> {selectedInquiry.name}
            </div>
            <div style={{ marginBottom: "0.5rem" }}>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${selectedInquiry.email}`}>
                {selectedInquiry.email}
              </a>
            </div>
            {selectedInquiry.subject && (
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Subject:</strong> {selectedInquiry.subject}
              </div>
            )}
            <div style={{ marginBottom: "1rem" }}>
              <strong>Received:</strong> {selectedInquiry.created_at}
            </div>
            <div style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
              {selectedInquiry.message}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactInquiries;
