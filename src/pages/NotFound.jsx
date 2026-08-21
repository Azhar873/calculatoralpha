import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={{ padding: "4rem 1.5rem", textAlign: "center" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ fontSize: 48, marginBottom: 8 }}>404</h1>
        <h2 style={{ marginTop: 0, marginBottom: 16 }}>Page not found</h2>
        <p style={{ color: "#555", lineHeight: 1.6 }}>
          The page you are looking for doesn't exist or has been moved. You can
          return to the homepage or check the URL.
        </p>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            gap: 12,
            justifyContent: "center",
          }}
        >
          <Link
            to="/"
            style={{
              padding: "0.75rem 1.2rem",
              background: "#6440E8",
              color: "#fff",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Go to Home
          </Link>
          <Link
            to="/sitemap"
            style={{
              padding: "0.75rem 1.2rem",
              background: "#f1f5f9",
              color: "#111",
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            View Sitemap
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
