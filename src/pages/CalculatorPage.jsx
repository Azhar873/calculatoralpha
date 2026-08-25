import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import SEO from "../components/SEO/SEO";
import NotFound from "./NotFound";
import { useCalculators } from "../context/CalculatorsContext";
import AgeCalculator from "../components/calculators/AgeCalculator/AgeCalculator";
import AmortizationCalculator from "../components/calculators/AmortizationCalculator/AmortizationCalculator";
import AutoLoanCalculator from "../components/calculators/AutoLoanCalculator/AutoLoanCalculator";
import BMICalculator from "../components/calculators/BMICalculator/BMICalculator";
import BMRCalculator from "../components/calculators/BMRCalculator/BMRCalculator";
import BodyFatCalculator from "../components/calculators/BodyFatCalculator/BodyFatCalculator";
import CalorieCalculator from "../components/calculators/CalorieCalculator/CalorieCalculator";
import CompoundInterestCalculator from "../components/calculators/CompoundInterestCalculator/CompoundInterestCalculator";
import ConcreteCalculator from "../components/calculators/ConcreteCalculator/ConcreteCalculator";
import ConversionCalculator from "../components/calculators/ConversionCalculator/ConversionCalculator";
import DateCalculator from "../components/calculators/DateCalculator/DateCalculator";
import DueDateCalculator from "../components/calculators/DueDateCalculator/DueDateCalculator";
import FinanceCalculator from "../components/calculators/FinanceCalculator/FinanceCalculator";
import FractionCalculator from "../components/calculators/FractionCalculator/FractionCalculator";
import GPACalculator from "../components/calculators/GPACalculator/GPACalculator";
import GradeCalculator from "../components/calculators/GradeCalculator/GradeCalculator";
import HoursCalculator from "../components/calculators/HoursCalculator/HoursCalculator";
import IdealWeightCalculator from "../components/calculators/IdealWeightCalculator/IdealWeightCalculator";
import IncomeTaxCalculator from "../components/calculators/IncomeTaxCalculator/IncomeTaxCalculator";
import InflationCalculator from "../components/calculators/InflationCalculator/InflationCalculator";
import InterestCalculator from "../components/calculators/InterestCalculator/InterestCalculator";
import InterestRateCalculator from "../components/calculators/InterestRateCalculator/InterestRateCalculator";
import InvestmentCalculator from "../components/calculators/InvestmentCalculator/InvestmentCalculator";
import LoanCalculator from "../components/calculators/LoanCalculator/LoanCalculator";
import MortgageCalculator from "../components/calculators/MortgageCalculator/MortgageCalculator";
import PaceCalculator from "../components/calculators/PaceCalculator/PaceCalculator";
import PasswordGenerator from "../components/calculators/PasswordGenerator/PasswordGenerator";
import PaymentCalculator from "../components/calculators/PaymentCalculator/PaymentCalculator";
import PercentageCalculator from "../components/calculators/PercentageCalculator/PercentageCalculator";
import PipeWeightCalculator from "../components/calculators/PipeWeightCalculator/PipeWeightCalculator";
import PipeVolumeCalculator from "../components/calculators/PipeVolumeCalculator/PipeVolumeCalculator";
import PipeScheduleLookup from "../components/calculators/PipeScheduleLookup/PipeScheduleLookup";
import PipeCostEstimator from "../components/calculators/PipeCostEstimator/PipeCostEstimator";
import PregnancyCalculator from "../components/calculators/PregnancyCalculator/PregnancyCalculator";
import PregnancyConceptionCalculator from "../components/calculators/PregnancyConceptionCalculator/PregnancyConceptionCalculator";
import RandomNumberGenerator from "../components/calculators/RandomNumberGenerator/RandomNumberGenerator";
import RetirementCalculator from "../components/calculators/RetirementCalculator/RetirementCalculator";
import SalaryCalculator from "../components/calculators/SalaryCalculator/SalaryCalculator";
import SalesTaxCalculator from "../components/calculators/SalesTaxCalculator/SalesTaxCalculator";
import ScientificCalculator from "../components/calculators/ScientificCalculator/ScientificCalculator";
import StandardDeviationCalculator from "../components/calculators/StandardDeviationCalculator/StandardDeviationCalculator";
import SubnetCalculator from "../components/calculators/SubnetCalculator/SubnetCalculator";
import TimeCalculator from "../components/calculators/TimeCalculator/TimeCalculator";
import TriangleCalculator from "../components/calculators/TriangleCalculator/TriangleCalculator";
import UnitConverter from "../components/calculators/UnitConverter/UnitConverter";
import "./CalculatorPage.css";

const calculatorComponents = {
  "age-calculator": AgeCalculator,
  "amortization-calculator": AmortizationCalculator,
  "auto-loan-calculator": AutoLoanCalculator,
  "bmi-calculator": BMICalculator,
  "bmr-calculator": BMRCalculator,
  "body-fat-calculator": BodyFatCalculator,
  "calorie-calculator": CalorieCalculator,
  "compound-interest-calculator": CompoundInterestCalculator,
  "concrete-calculator": ConcreteCalculator,
  "conversion-calculator": ConversionCalculator,
  "date-calculator": DateCalculator,
  "due-date-calculator": DueDateCalculator,
  "finance-calculator": FinanceCalculator,
  "fraction-calculator": FractionCalculator,
  "gpa-calculator": GPACalculator,
  "grade-calculator": GradeCalculator,
  "hours-calculator": HoursCalculator,
  "ideal-weight-calculator": IdealWeightCalculator,
  "income-tax-calculator": IncomeTaxCalculator,
  "inflation-calculator": InflationCalculator,
  "interest-calculator": InterestCalculator,
  "interest-rate-calculator": InterestRateCalculator,
  "investment-calculator": InvestmentCalculator,
  "loan-calculator": LoanCalculator,
  "mortgage-calculator": MortgageCalculator,
  "pace-calculator": PaceCalculator,
  "password-generator": PasswordGenerator,
  "payment-calculator": PaymentCalculator,
  "percentage-calculator": PercentageCalculator,
  "pipe-weight-calculator": PipeWeightCalculator,
  "pipe-volume-calculator": PipeVolumeCalculator,
  "pipe-schedule-lookup": PipeScheduleLookup,
  "pipe-cost-estimator": PipeCostEstimator,
  "pregnancy-calculator": PregnancyCalculator,
  "pregnancy-conception-calculator": PregnancyConceptionCalculator,
  "random-number-generator": RandomNumberGenerator,
  "retirement-calculator": RetirementCalculator,
  "salary-calculator": SalaryCalculator,
  "sales-tax-calculator": SalesTaxCalculator,
  "scientific-calculator": ScientificCalculator,
  "standard-deviation-calculator": StandardDeviationCalculator,
  "subnet-calculator": SubnetCalculator,
  "time-calculator": TimeCalculator,
  "triangle-calculator": TriangleCalculator,
  "unit-converter": UnitConverter,
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

const CalculatorPage = ({ calculatorSlug: propCalculatorSlug }) => {
  const { calculatorSlug, slug } = useParams();
  const resolvedSlug = propCalculatorSlug || calculatorSlug || slug;
  const { calculatorsData = [], isLoading, error } = useCalculators();

  const normalizeCalculatorId = (calc) =>
    (calc.path || `/${calc.slug || ""}`)
      .replace(/\/+/g, "/")
      .replace(/^\//, "");

  const getCalculatorUrl = (calc) => {
    const rawPath = calc.path || `/${calc.slug || ""}`;
    return rawPath.startsWith("/") ? rawPath : `/${rawPath}`;
  };

  const matchesCalculatorSlug = useMemo(
    () => (calc, slug) => {
      const normalizedPath = normalizeCalculatorId(calc);
      return (
        calc.slug === slug || normalizedPath === slug || calc.path === `/${slug}`
      );
    },
    [],
  );

  const calculator = useMemo(() => {
    if (!resolvedSlug) return null;

    const flatCalculators = calculatorsData.flatMap(
      (category) => category.calculators || [],
    );
    const slugValue = resolvedSlug.replace(/^\//, "");

    return flatCalculators.find((calc) =>
      matchesCalculatorSlug(calc, slugValue),
    );
  }, [calculatorsData, matchesCalculatorSlug, resolvedSlug]);

  const relatedCalculators = useMemo(() => {
    if (!resolvedSlug || !calculator) return [];

    const slugValue = resolvedSlug.replace(/^\//, "");
    const category = calculatorsData.find((category) =>
      (category.calculators || []).some((calc) =>
        matchesCalculatorSlug(calc, slugValue),
      ),
    );

    if (!category) return [];

    return (category.calculators || [])
      .filter((calc) => !matchesCalculatorSlug(calc, slugValue))
      .slice(0, 5);
  }, [calculatorsData, calculator, matchesCalculatorSlug, resolvedSlug]);

  const currentCategory = useMemo(
    () =>
      calculatorsData.find((category) =>
        (category.calculators || []).some((calc) =>
          matchesCalculatorSlug(calc, resolvedSlug?.replace(/^\//, "")),
        ),
      ),
    [calculatorsData, matchesCalculatorSlug, resolvedSlug],
  );

  if (isLoading) {
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

  if (error) {
    return (
      <div className="calculator-page">
        <div className="calculator-page__status">
          Error loading calculator: {error}
        </div>
      </div>
    );
  }

  if (!calculator) {
    return <NotFound />;
  }

  const CalculatorComponent = calculatorComponents[calculator.slug];
  const categorySlug = calculator.category_slug || calculator.category;
  const categoryName = calculator.category_name || categorySlug;
  const pageTitle = calculator.meta_title || calculator.name;
  const pageDescription =
    calculator.meta_description ||
    calculator.description ||
    calculator.heading ||
    "";
  const pageKeywords = calculator.meta_keywords || "";

  return (
    <div className="calculator-page">
      <nav className="calculator-page__breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span aria-hidden="true">/</span>
        {categorySlug ? (
          <>
            <Link to={`/${categorySlug}`}>{categoryName}</Link>
            <span aria-hidden="true">/</span>
          </>
        ) : null}
        <span aria-current="page">{calculator.name}</span>
      </nav>

      <SEO
        title={pageTitle}
        description={pageDescription}
        keywords={pageKeywords}
      />

      <div className="calculator-page__layout">
        <aside className="calculator-page__sidebar">
          {relatedCalculators.length > 0 && (
            <section className="calculator-page__sidebar-section">
              <h2>Related Calculators</h2>
              <ul>
                {relatedCalculators.map((related) => (
                  <li key={related.path || related.slug}>
                    <Link to={getCalculatorUrl(related)}>
                      {related.name || related.title || related.slug}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <section className="calculator-page__sidebar-section">
            <h2>Categories</h2>
            <ul className="calculator-page__category-list">
              {calculatorsData.map((category) => (
                <li
                  key={category.slug}
                  className={category.slug === currentCategory?.slug ? "active" : ""}
                >
                  <Link to={`/${category.slug}`}>
                    {category.icon && (
                      <img src={getIconUrl(category.icon)} alt="" />
                    )}
                    <span>{category.title || category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <main className="calculator-page__main">
          <div className="calculator-page__calculator-container">
            {CalculatorComponent ? (
              <CalculatorComponent />
            ) : (
              <div className="calculator-page__status">
                Calculator component not available for this slug.
              </div>
            )}
          </div>
          <div className="calculator-page__description">
            <h2>Description</h2>
            {calculator.description ? (
              <div
                className="calculator-page__description-content"
                dangerouslySetInnerHTML={{ __html: calculator.description }}
              />
            ) : (
              <p>No description available.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CalculatorPage;
