import { Link } from "react-router-dom";
import { hexToCSSFilter } from "hex-to-css-filter";
import "./CategoryCard.css";

function CategoryCard({ slug, title, icon, calculators, gradient }) {
  // Handle icon path
  const getIconUrl = (iconPath) => {
    if (!iconPath) return "";
    if (iconPath.startsWith("http")) return iconPath;

    const apiBase = import.meta.env.VITE_API_URL || "";
    const baseUrl = apiBase.replace(/\/api\/?$/, "");

    if (iconPath.startsWith("/")) {
      return `${baseUrl}${iconPath}`;
    }

    if (iconPath.startsWith("uploads/")) {
      return `${baseUrl}/${iconPath}`;
    }

    return `${baseUrl}/uploads/icons/${iconPath}`;
  };

  // Generate CSS filter from gradient color
  const iconFilter = gradient ? hexToCSSFilter(gradient).filter : "none";

  return (
    <div
      className="category-card"
      style={{
        "--card-gradient": gradient,
        "--icon-filter": iconFilter,
      }}
    >
      <div className="category-icon">
        <img
          src={getIconUrl(icon)}
          alt={title}
          style={{ filter: "var(--icon-filter)" }}
        />
        <h3 className="category-title">
          {slug ? <Link to={`/${slug}`}>{title}</Link> : title}
        </h3>
      </div>

      <div className="category-calculators">
        {[...calculators]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((calc, index) => (
            <Link key={index} to={calc.path} className="calculator-link">
              {calc.name}
            </Link>
          ))}
      </div>
    </div>
  );
}

export default CategoryCard;
