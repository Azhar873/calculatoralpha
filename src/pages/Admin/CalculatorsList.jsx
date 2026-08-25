import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import {
  getAdminCalculators,
  updateAdminCalculator,
  deleteAdminCalculator,
} from "../../services/adminApi";

const CalculatorsList = () => {
  const [calculators, setCalculators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCalculators();
  }, []);

  const fetchCalculators = async () => {
    try {
      const data = await getAdminCalculators();
      setCalculators(
        data.map((calc) => ({
          ...calc,
          is_active: Number(calc.is_active) === 1 ? 1 : 0,
        })),
      );
    } catch (error) {
      console.error("Error fetching calculators", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this calculator?")) {
      try {
        await deleteAdminCalculator(id);
        fetchCalculators();
      } catch (error) {
        alert("Failed to delete calculator", error);
      }
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      const nextValue = Number(isActive) === 1 ? 0 : 1;
      await updateAdminCalculator(id, { is_active: nextValue });
      await fetchCalculators();
    } catch (error) {
      alert("Failed to update calculator status", error);
    }
  };

  const filteredCalculators = calculators.filter(
    (calc) =>
      calc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      calc.category_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
  };

  return (
    <div>
      <h1 className="admin-page-title">Calculators</h1>

      <div className="admin-card">
        <div className="admin-table-controls">
          <div>
            Show{" "}
            <input type="number" defaultValue={10} style={{ width: "50px" }} />{" "}
            entries
          </div>
          <div>
            <Link to="/admin/calculators/new" className="admin-btn">
              Add new Calculator
            </Link>
          </div>
        </div>
        <div
          className="admin-table-controls"
          style={{ justifyContent: "flex-end" }}
        >
          <div>
            Search:{" "}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Calculator Name</th>
              <th>Calculator Heading</th>
              <th>Category</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCalculators.map((calc) => (
              <tr key={calc.id}>
                <td>{calc.id}</td>
                <td>{calc.name}</td>
                <td>{calc.heading}</td>
                <td>{calc.category_name?.toUpperCase()}</td>
                <td>{calc.is_active ? "Active" : "Disabled"}</td>
                <td>
                  <Link
                    to={`/admin/calculators/edit/${calc.id}`}
                    style={{ color: "#4caf50", marginRight: "10px" }}
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleToggleActive(calc.id, calc.is_active)}
                    style={{
                      color: calc.is_active ? "#f39c12" : "#2e7d32",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    {calc.is_active ? "Disable" : "Enable"}
                  </button>
                  <button
                    onClick={() => handleDelete(calc.id)}
                    style={{
                      color: "#f44336",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            Showing 1 to {filteredCalculators.length} of {calculators.length}{" "}
            entries
          </div>
          {/* Basic Pagination placeholder */}
          <div style={{ display: "flex", gap: "5px" }}>
            <button
              className="admin-btn-outline"
              style={{ padding: "5px 10px" }}
            >
              Previous
            </button>
            <button className="admin-btn" style={{ padding: "5px 10px" }}>
              1
            </button>
            <button
              className="admin-btn-outline"
              style={{ padding: "5px 10px" }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorsList;
