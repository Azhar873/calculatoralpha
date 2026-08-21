import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./Header.module.scss";
import { useCalculators } from "../../../context/CalculatorsContext";
import { getAllPages } from "../../../services/api";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerPages, setHeaderPages] = useState([]);
  const desktopSearchRef = useRef(null);
  const mobileSearchRef = useRef(null);
  const navigate = useNavigate();
  const { calculatorsData, isLoading } = useCalculators();

  useEffect(() => {
    getAllPages()
      .then((pages) => {
        setHeaderPages(
          pages.filter((page) => Number(page.show_in_header) === 1),
        );
      })
      .catch((error) => console.error("Failed to load header pages", error));
  }, []);

  // Flatten calculators data for easy searching
  const allCalculators = calculatorsData
    ? calculatorsData.flatMap((category) => category.calculators || [])
    : [];
  const categoriesWithCalculators = calculatorsData
    ? calculatorsData.filter(
        (category) =>
          Array.isArray(category.calculators) &&
          category.calculators.length > 0,
      )
    : [];

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      const clickedInsideDesktop = desktopSearchRef.current?.contains(
        event.target,
      );
      const clickedInsideMobile = mobileSearchRef.current?.contains(
        event.target,
      );

      if (!clickedInsideDesktop && !clickedInsideMobile) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      navigate(searchResults[0].path);
      setShowResults(false);
      setSearchQuery("");
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const filtered = allCalculators.filter((calc) =>
      calc.name.toLowerCase().includes(query.toLowerCase()),
    );
    setSearchResults(filtered);
    setShowResults(true);
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchQuery("");
  };

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

  const getCategorySlug = (category) =>
    category.slug ||
    category.title
      .replace(/\s*Calculators?/gi, "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerContent}>
          <Link to="/" className={styles.logo}>
            <img src="/logo.png" alt="CalculatorAlpha" width="200" />
            {/* <span className={styles.logoText}>Calculator</span>
                        <span className={styles.logoAccent}>App</span> */}
          </Link>

          <button
            className={styles.mobileMenuBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M3 12h18M3 6h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Offcanvas Overlay + Menu — both portaled into document.body for correct z-index stacking */}
          {createPortal(
            <>
              {/* Overlay */}
              {mobileMenuOpen && (
                <div
                  className={styles.offcanvasOverlay}
                  onClick={() => setMobileMenuOpen(false)}
                />
              )}

              {/* Offcanvas Menu */}
              <div
                className={`${styles.offcanvas} ${mobileMenuOpen ? styles.offcanvasOpen : ""}`}
              >
                <div className={styles.offcanvasHeader}>
                  <h3>Calculators</h3>
                  <button
                    className={styles.offcanvasClose}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M18 6L6 18M6 6l12 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Search in Offcanvas */}
                <div className={styles.offcanvasSearch} ref={mobileSearchRef}>
                  <form className={styles.searchForm} onSubmit={handleSearch}>
                    <input
                      type="text"
                      className={styles.searchInput}
                      placeholder="Search calculators..."
                      value={searchQuery}
                      onChange={handleInputChange}
                      onFocus={() => {
                        if (searchQuery.trim() !== "") {
                          setShowResults(true);
                        }
                      }}
                    />
                    <button type="submit" className={styles.searchBtn}>
                      <svg
                        className={styles.searchIcon}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </form>

                  {showResults && (
                    <div className={styles.searchResults}>
                      {searchResults.length > 0 ? (
                        searchResults.map((result, index) => (
                          <Link
                            key={index}
                            to={result.path}
                            className={styles.searchResultItem}
                            onClick={() => {
                              handleResultClick();
                              setMobileMenuOpen(false);
                            }}
                          >
                            {result.name}
                          </Link>
                        ))
                      ) : (
                        <div className={styles.noResults}>
                          No calculators found
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <nav className={styles.offcanvasBody}>
                  <Link
                    to="/"
                    className={styles.offcanvasLink}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  {isLoading ? (
                    <div
                      style={{
                        padding: "20px",
                        textAlign: "center",
                        color: "var(--text-secondary)",
                      }}
                    >
                      Loading calculators...
                    </div>
                  ) : (
                    categoriesWithCalculators.map((category, index) => (
                      <div key={index} className={styles.offcanvasCategory}>
                        <div className={styles.categoryHeader}>
                          {category.icon && (
                            <img
                              src={getIconUrl(category.icon)}
                              alt={category.title}
                              className={styles.categoryIcon}
                            />
                          )}
                          <span className={styles.categoryTitle}>
                            {category.title}
                          </span>
                        </div>
                        <div className={styles.categoryLinks}>
                          {category.calculators &&
                            [...category.calculators]
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((calc, calcIndex) => (
                                <Link
                                  key={calcIndex}
                                  to={calc.path}
                                  className={styles.offcanvasLink}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {calc.name}
                                </Link>
                              ))}
                        </div>
                      </div>
                    ))
                  )}
                  {headerPages.map((page) => (
                    <Link
                      key={page.id}
                      to={`/${page.slug}`}
                      className={styles.offcanvasLink}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {page.title}
                    </Link>
                  ))}
                </nav>
              </div>
            </>,
            document.body,
          )}

          {/* Desktop Navigation */}
          <nav className={styles.navigation}>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
            {!isLoading && categoriesWithCalculators.length > 0 && (
              <div className={styles.dropdown}>
                <button type="button" className={styles.dropdownBtn}>
                  <span>Categories</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M3 4.5L6 7.5L9 4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <div className={styles.dropdownMenu}>
                  {categoriesWithCalculators.map((category, index) => (
                    <Link
                      key={category.slug || index}
                      to={`/${getCategorySlug(category)}`}
                      className={styles.categoryDropdownItem}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {category.icon &&
                        (isImageIcon(category.icon) ? (
                          <img
                            src={getIconUrl(category.icon)}
                            alt=""
                            className={styles.dropdownCategoryIcon}
                          />
                        ) : (
                          <span className={styles.dropdownCategoryEmoji}>
                            {category.icon}
                          </span>
                        ))}
                      <span>
                        {category.title.replace(/\s*Calculators?/gi, "").trim()}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {headerPages.map((page) => (
              <Link key={page.id} to={`/${page.slug}`} className={styles.navLink}>
                {page.title}
              </Link>
            ))}
          </nav>

          <div className={styles.searchContainer} ref={desktopSearchRef}>
            <form className={styles.searchForm} onSubmit={handleSearch}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search calculators..."
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={() => {
                  if (searchQuery.trim() !== "") {
                    setShowResults(true);
                  }
                }}
              />
              <button type="submit" className={styles.searchBtn}>
                <svg
                  className={styles.searchIcon}
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>

            {showResults && (
              <div className={styles.searchResults}>
                {searchResults.length > 0 ? (
                  searchResults.map((result, index) => (
                    <Link
                      key={index}
                      to={result.path}
                      className={styles.searchResultItem}
                      onClick={handleResultClick}
                    >
                      {result.name}
                    </Link>
                  ))
                ) : (
                  <div className={styles.noResults}>No calculators found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
