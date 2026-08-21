import React, { useEffect, useState } from "react";
import { getAdminSettings, updateAdminSettings } from "../../services/adminApi";

const Settings = () => {
  const [sections, setSections] = useState({
    section1: "",
    section2: "",
    section3: "",
    section4: "",
    section5: "",
    section6: "",
    section7: "",
    section8: "",
    footerText: "",
    footerCopyright: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getAdminSettings();
        if (data) {
          setSections((prev) => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.error("Failed to load settings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSections((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateAdminSettings(sections);
      alert("Settings updated successfully");
    } catch (error) {
      console.error("Failed to update settings", error);
      alert("Failed to update settings");
    }
  };

  if (loading) return <div>Loading...</div>;

  const sectionLabels = [
    "Section 1 (Science)",
    "Section 2 (Mathematics)",
    "Section 3 (Finance)",
    "Section 4 (Health)",
    "Section 5 (Knowledge)",
    "Section 6 (Real Estate)",
    "Section 7 (Conversions)",
    "Section 8 (Popular Tools)",
  ];

  return (
    <div>
      <h1 className="admin-page-title">SETTINGS</h1>

      <form onSubmit={handleSubmit} className="admin-card">
        <p style={{ marginBottom: "2rem", color: "#666" }}>
          Add Calculators ID and Set out the home page
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1.5rem",
          }}
        >
          {Object.keys(sections)
            .filter((key) => key.startsWith("section"))
            .map((key, index) => (
              <div
                key={key}
                className="admin-form-group"
                style={{ marginBottom: "0" }}
              >
                <label>{sectionLabels[index]}</label>
                <input
                  type="text"
                  className="admin-form-control"
                  name={key}
                  value={sections[key] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}
        </div>

        <div style={{ marginTop: "2rem", display: "grid", gap: "1.5rem" }}>
          <div className="admin-form-group">
            <label>Footer text</label>
            <textarea
              className="admin-form-control"
              name="footerText"
              value={sections.footerText || ""}
              onChange={handleChange}
              rows={3}
            />
          </div>
          <div className="admin-form-group">
            <label>Footer copyright</label>
            <input
              type="text"
              className="admin-form-control"
              name="footerCopyright"
              value={sections.footerCopyright || ""}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="admin-btn"
            style={{ width: "200px", justifyContent: "center" }}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
