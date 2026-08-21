import { useMemo } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import Header from "./components/Layout/Header/Header";
import Home from "./pages/Home";
import Sitemap from "./pages/Sitemap";
import CalculatorPage from "./pages/CalculatorPage";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Layout/Footer/Footer";
import { useCalculators } from "./context/CalculatorsContext";

// Admin Components
import AdminLayout from "./components/Admin/AdminLayout";
import Login from "./pages/Admin/Login";
import Dashboard from "./pages/Admin/Dashboard";
import CalculatorsList from "./pages/Admin/CalculatorsList";
import EditCalculator from "./pages/Admin/EditCalculator";
import CategoriesList from "./pages/Admin/CategoriesList";
import EditCategory from "./pages/Admin/EditCategory";
import PagesList from "./pages/Admin/PagesList";
import EditPage from "./pages/Admin/EditPage";
import Settings from "./pages/Admin/Settings";
import PageView from "./pages/PageView";
import NotFound from "./pages/NotFound";
import ContactInquiries from "./pages/Admin/ContactInquiries";

const PublicLayout = ({ children }) => (
  <div
    className="app"
    style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
  >
    <Header />
    <main style={{ flex: 1 }}>{children}</main>
    <Footer />
  </div>
);

const PageOrCalculatorRoute = () => {
  const { slug } = useParams();
  const { calculatorsData = [], isLoading } = useCalculators();

  const normalizedSlug = (slug || "").replace(/^\/+|\/+$/g, "");

  const isCalculatorSlug = useMemo(() => {
    if (!normalizedSlug) return false;

    const flatCalculators = calculatorsData.flatMap(
      (category) => category.calculators || [],
    );

    return flatCalculators.some((calc) => {
      const path = (calc.path || `/${calc.slug || ""}`)
        .replace(/\/+$/g, "")
        .replace(/^\//, "");
      const slugValue = (calc.slug || "").replace(/^\//, "");

      return slugValue === normalizedSlug || path === normalizedSlug;
    });
  }, [calculatorsData, normalizedSlug]);

  const isCategorySlug = calculatorsData.some(
    (category) => category.slug === normalizedSlug,
  );

  if (isLoading) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }

  if (isCalculatorSlug) return <CalculatorPage />;
  if (isCategorySlug) return <CategoryPage />;
  return <PageView />;
};

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/*"
        element={
          <PublicLayout>
            <Routes>
              <Route path="" element={<Home />} />
              <Route path="sitemap" element={<Sitemap />} />
              <Route path="pages/:pageSlug" element={<PageView />} />
              <Route path=":slug" element={<PageOrCalculatorRoute />} />
              <Route
                path="categories/:categorySlug"
                element={<CategoryPage />}
              />
              <Route path=":calculatorSlug" element={<CalculatorPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PublicLayout>
        }
      />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<Login />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="calculators" element={<CalculatorsList />} />
        <Route path="calculators/new" element={<EditCalculator />} />
        <Route path="calculators/edit/:id" element={<EditCalculator />} />
        <Route path="categories" element={<CategoriesList />} />
        <Route path="categories/new" element={<EditCategory />} />
        <Route path="categories/edit/:id" element={<EditCategory />} />
        <Route path="pages" element={<PagesList />} />
        <Route path="pages/new" element={<EditPage />} />
        <Route path="pages/edit/:id" element={<EditPage />} />
        <Route path="settings" element={<Settings />} />
        <Route path="contacts" element={<ContactInquiries />} />
      </Route>
    </Routes>
  );
};

export default App;
