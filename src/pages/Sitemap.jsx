import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCalculators } from "../context/CalculatorsContext";
import { getAllPages } from "../services/api";
import "./Sitemap.css";

const Sitemap = () => {
  const { calculatorsData, isLoading } = useCalculators();
  const [pages, setPages] = useState([]);
  const [pagesLoading, setPagesLoading] = useState(true);

  useEffect(() => {
    const loadPages = async () => {
      setPagesLoading(true);
      try {
        const pageList = await getAllPages();
        setPages(Array.isArray(pageList) ? pageList : []);
      } catch (err) {
        console.error("Failed to load pages for sitemap:", err);
        setPages([]);
      } finally {
        setPagesLoading(false);
      }
    };

    loadPages();
  }, []);

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
        {pagesLoading ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "var(--text-secondary)",
            }}
          >
            Loading pages...
          </div>
        ) : (
          pages.length > 0 && (
            <div className="sitemap-section">
              <h2>Other Pages</h2>
              <ul className="sitemap-list">
                {pages
                  .filter((page) => page.slug)
                  .sort((a, b) => a.title.localeCompare(b.title))
                  .map((page) => (
                    <li key={page.id || page.slug}>
                      <Link to={`/${page.slug}`}>{page.title || page.slug}</Link>
                    </li>
                  ))}
              </ul>
            </div>
          )
        )}

        {/* All Calculator Categories */}
        {isLoading ? (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              color: "var(--text-secondary)",
            }}
          >
            Loading calculators...
          </div>
        ) : (
          calculatorsData.map((category, index) => (
            <div key={index} className="sitemap-section">
              <h2>
                <span className="category-icon">
                  {category.icon ? (
                    <img
                      src={getImageUrl(category.icon)}
                      alt={category.title}
                      style={{
                        width: "28px",
                        height: "28px",
                        objectFit: "contain",
                        verticalAlign: "middle",
                      }}
                    />
                  ) : (
                    "📁"
                  )}
                </span>
                {category.title}
              </h2>
              <ul className="sitemap-list">
                {category.calculators &&
                  [...category.calculators]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((calculator, calcIndex) => (
                      <li key={calcIndex}>
                        <Link to={calculator.path}>{calculator.name}</Link>
                      </li>
                    ))}
              </ul>
            </div>
          ))
        )}

        {/* Total Count */}
        <div className="sitemap-footer">
          <p>
            Total Calculators:{" "}
            <strong>
              {calculatorsData
                ? calculatorsData.reduce(
                    (total, category) =>
                      total +
                      (category.calculators ? category.calculators.length : 0),
                    0,
                  )
                : 0}
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
