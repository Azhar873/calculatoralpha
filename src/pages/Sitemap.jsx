import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSitemapEntries } from "../services/api";
import "./Sitemap.css";

const Sitemap = () => {
  const [sitemapEntries, setSitemapEntries] = useState([]);
  const [sitemapLoading, setSitemapLoading] = useState(true);

  useEffect(() => {
    const loadSitemap = async () => {
      setSitemapLoading(true);
      try {
        setSitemapEntries(await getSitemapEntries());
      } catch (err) {
        console.error("Failed to load sitemap:", err);
        setSitemapEntries([]);
      } finally {
        setSitemapLoading(false);
      }
    };

    loadSitemap();
  }, []);

  return (
    <div className="sitemap-container">
      <div className="sitemap-header">
        <h1>Sitemap</h1>
        <p>Complete list of all calculators available on our website</p>
      </div>

      <div className="sitemap-content">
        {/* Home Page */}
        <div className="sitemap-section">
          <h2>Main Pages</h2>
          <ul className="sitemap-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/sitemap">Sitemap</Link>
            </li>
          </ul>
        </div>

        {/* All Static Pages */}
        {sitemapLoading ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "var(--text-secondary)",
            }}
          >
            Loading sitemap...
          </div>
        ) : (
          sitemapEntries.filter((entry) => entry.url_type === "page").length > 0 && (
            <div className="sitemap-section">
              <h2>Other Pages</h2>
              <ul className="sitemap-list">
                {sitemapEntries
                  .filter((entry) => entry.url_type === "page" && entry.slug)
                  .map((entry) => (
                    <li key={entry.id}>
                      <Link to={`/${entry.slug}`}>{entry.slug}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          )
        )}

        {sitemapLoading ? null : (
          <div className="sitemap-section">
            <h2>Categories</h2>
            <ul className="sitemap-list">
              {sitemapEntries
                .filter((entry) => entry.url_type === "category" && entry.slug)
                .map((entry) => (
                  <li key={entry.id}>
                    <Link to={`/${entry.slug}`}>{entry.slug}</Link>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {sitemapLoading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
            Loading sitemap...
          </div>
        ) : (
          <div className="sitemap-section">
            <h2>Calculators</h2>
            <ul className="sitemap-list">
              {sitemapEntries
                .filter((entry) => entry.url_type === "calculator" && entry.slug)
                .map((entry) => (
                  <li key={entry.id}>
                    <Link to={`/${entry.slug}`}>{entry.slug}</Link>
                  </li>
                ))}
            </ul>
          </div>
        )}

        {/* Total Count */}
        <div className="sitemap-footer">
          <p>
            Total Calculators:{" "}
            <strong>
              {sitemapEntries.filter((entry) => entry.url_type === "calculator").length}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
