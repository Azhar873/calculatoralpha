import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/SEO/SEO";
import { getAllCalculators, getCategoryBySlug } from "../services/api";
import { useCalculators } from "../context/CalculatorsContext";

const CategoryPage = () => {
  const { categorySlug, slug } = useParams();
  const currentCategorySlug = categorySlug || slug;
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { calculatorsData = [] } = useCalculators();

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const [data, allCalculators] = await Promise.all([
          getCategoryBySlug(currentCategorySlug),
          getAllCalculators(),
        ]);
        const matchingCategory = calculatorsData.find(
          (item) => item.slug === currentCategorySlug,
        );
        const calculatorsFromList = Array.isArray(allCalculators)
          ? allCalculators.filter(
              (calculator) =>
                calculator.category_slug === currentCategorySlug ||
                calculator.category === currentCategorySlug,
            )
          : [];
        const calculators = [
          ...(Array.isArray(data.calculators) ? data.calculators : []),
          ...calculatorsFromList,
          ...(matchingCategory?.calculators || []),
        ].filter(
          (calculator, index, list) =>
            list.findIndex(
              (item) => item.slug === calculator.slug,
            ) === index,
        );

          console.group("CategoryPage Debug");
          console.log("Current category slug:", currentCategorySlug);
          console.log("Category API response:", data);
          console.log("All calculators API response:", allCalculators);
          console.log("Calculators matched by category:", calculatorsFromList);
          console.groupEnd();

        setCategory({
          ...data,
          calculators,
        });
      } catch (err) {
        console.error("Failed to load category", err);
        const fallbackCategory = calculatorsData.find(
          (item) => item.slug === currentCategorySlug,
        );

        if (fallbackCategory) {
          console.log("CategoryPage fallback category:", fallbackCategory);
          setCategory(fallbackCategory);
        } else {
          setError("Category not found.");
        }
      } finally {
        setLoading(false);
      }
    };
    loadCategory();
  }, [currentCategorySlug, calculatorsData]);

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

  if (error || !category) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h1>Category not found</h1>
      </div>
    );
  }

  const pageTitle = category.meta_title || category.name;
  const pageDescription =
    category.meta_description || category.description || "";
  const pageKeywords = category.meta_keywords || "";

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

  const isImageIcon = (iconPath) =>
    /^(https?:\/\/|\/|uploads\/)/.test(iconPath) ||
    /\.(png|jpe?g|svg|webp|gif)$/i.test(iconPath);


  const hasHtml = (value) => /<[^>]+>/.test(value || "");

  const renderDescription = (value, className) => {
    if (!value) return null;

    return hasHtml(value) ? (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    ) : (
      <p className={className}>{value}</p>
    );
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
      <section
        style={{
          marginBlock: "2rem",
          padding: "1.5rem",
          // borderRadius: 16,
          background: "white",
          border: "1px solid #ececec",
          lineHeight: 1.75,
          color: "#596579",
        }}
      >
        {/* <h2 style={{ margin: "0 0 1rem", color: "#1e1b4b" }}>
          Description
        </h2> */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75rem", marginBottom: "1rem" }}>
          {category.icon && isImageIcon(category.icon) && (
            <img
              src={getIconUrl(category.icon)}
              alt=""
              style={{ width: 48, height: 48, objectFit: "contain" }}
            />
          )}
          {category.icon && !isImageIcon(category.icon) && (
            <span style={{ fontSize: "2rem", lineHeight: 1 }}>
              {category.icon}
            </span>
          )}
          <h1 style={{ margin: 0, color: "#1e1b4b" }}>{category.name}</h1>
        </div>
        {category.description ? (
          renderDescription(category.description, "categoryDescription")
        ) : (
          <p>No description available.</p>
        )}
      </section>

      {Array.isArray(category.calculators) &&
      category.calculators.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 320px))",
            gap: "1rem",
            justifyContent: "start",
          }}
        >
          {category.calculators.map((calculator) => (
            <Link
              key={calculator.slug}
              to={calculator.path || `/${calculator.slug}`}
              style={{
                minHeight: 74,
                padding: "0.75rem 1rem",
                borderRadius: 4,
                border: "1px solid #ececec",
                display: "flex",
                alignItems: "center",
                gap: "0.9rem",
                textDecoration: "none",
                color: "inherit",
                background: "white",
                boxShadow: "0 2px 8px rgba(15, 23, 42, 0.04)",
              }}
            >
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  color: "#4f46e5",
                  fontSize: "1rem",
                }}
              >
                {calculator.name}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p>No calculators found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
