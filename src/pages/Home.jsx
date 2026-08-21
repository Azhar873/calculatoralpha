import CategoryCard from "../components/CategoryCard";
import ScientificCalculator from "../components/calculators/ScientificCalculator/ScientificCalculator";
import SEO from "../components/SEO/SEO";
import { organizationSchema } from "../utils/seo-config";
import "./Home.css";
import { useCalculators } from "../context/CalculatorsContext";

function Home() {
  const { calculatorsData: categories, isLoading } = useCalculators();

  console.log("Home categories:", categories);

  return (
    <div className="home">
      <SEO pageKey="home" schemaData={organizationSchema} />
      <div className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Free Online <span className="gradient-text">Calculators</span>
              </h1>
              <p className="hero-description">
                Professional calculators for math, finance, fitness, and more.
                Fast, accurate, and easy to use.
              </p>
            </div>

            <div className="featured-calculator">
              <ScientificCalculator />
            </div>
          </div>
        </div>
      </div>

      <div className="features-section">
        <div className="container">
          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <h3>Fast & Accurate</h3>
              <p>Instant calculations with precision you can trust</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Works perfectly on all devices and screen sizes</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🎨</div>
              <h3>Modern Design</h3>
              <p>Beautiful, intuitive interface for the best experience</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon">🔒</div>
              <h3>100% Free</h3>
              <p>No registration, no fees, no hidden costs</p>
            </div>
          </div>
        </div>
      </div>

      <div className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Calculator Categories</h2>
            <p>Choose from our wide range of specialized calculators</p>
          </div>

          <div className="categories-grid">
            {isLoading ? (
              <div
                style={{
                  textAlign: "center",
                  gridColumn: "1 / -1",
                  padding: "40px",
                  color: "var(--text-secondary)",
                }}
              >
                Loading categories...
              </div>
            ) : categories && categories.length > 0 ? (
              categories
                .filter(
                  (category) =>
                    Array.isArray(category.calculators) &&
                    category.calculators.length > 0,
                )
                .map((category, index) => (
                  <CategoryCard
                    key={index}
                    slug={category.slug}
                    title={category.title}
                    icon={category.icon}
                    calculators={category.calculators || []}
                    gradient={category.gradient}
                  />
                ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  gridColumn: "1 / -1",
                  padding: "40px",
                  color: "var(--text-secondary)",
                }}
              >
                No categories found.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
