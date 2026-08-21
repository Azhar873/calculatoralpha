import React, { useEffect, useState } from "react";
import styles from "./Footer.module.scss";
import { getSiteSettings, getAllPages } from "../../../services/api";
import { Link } from "react-router-dom";

const Footer = () => {
  const [settings, setSettings] = useState({});

  const [pages, setPages] = useState([]);
  const [loadingPages, setLoadingPages] = useState(false);
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await getSiteSettings();
        setSettings(data || {});
      } catch (error) {
        console.error("Failed to load footer settings", error);
      }
    };

    loadSettings();
    // load public pages for footer links
    const loadPages = async () => {
      setLoadingPages(true);
      try {
        const p = await getAllPages();
        console.debug("Footer: fetched pages", p);
        setPages(Array.isArray(p) ? p : []);
      } catch (err) {
        console.error("Failed to load footer pages", err);
        setPages([]);
      } finally {
        setLoadingPages(false);
      }
    };

    loadPages();
  }, []);

  const footerText =
    settings.footerText ||
    "Smart calculators and easy math tools for daily life, finance, health and study. Everything you need in one clean, modern hub.";
  const footerCopyright =
    settings.footerCopyright ||
    `© ${new Date().getFullYear()} Calculatoralpha. All rights reserved.`;

  const explorePages = pages.filter((pg) => {
    const section = (pg.footer_section || "").toString().trim().toLowerCase();
    return section === "explore";
  });

  const resourcePages = pages.filter((pg) => {
    const section = (pg.footer_section || "").toString().trim().toLowerCase();
    return section === "resources";
  });

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <img src="/logo.png" alt="CalculatorAlpha" width="200" />
            </Link>
            <p>{footerText}</p>
          </div>

          <div className={styles.column}>
            <h3>Explore</h3>
            <ul className={styles.linkList}>
              <li>
                <Link to="/">Home</Link>
              </li>
              {explorePages.length === 0 && !loadingPages && (
                <li className={styles.muted}>No pages</li>
              )}
              {explorePages.map((pg) => (
                <li key={pg.id}>
                  <Link to={`/${pg.slug}`}>{pg.title}</Link>
                </li>
              ))}
              <li>
                <Link to="/sitemap">Sitemap</Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            {resourcePages.length !== 0 && resourcePages && <h3>Resources</h3>}
            <ul className={styles.linkList}>
              {resourcePages.map((pg) => (
                <li key={pg.id}>
                  <Link to={`/${pg.slug}`}>{pg.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{footerCopyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
