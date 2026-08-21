import FinanceCalculator from "../components/calculators/FinanceCalculator/FinanceCalculator";
import SEO from "../components/SEO/SEO";
import { generateCalculatorSchema } from "../utils/seo-config";

const FinanceCalculatorPage = () => {
  const schema = generateCalculatorSchema(
    "Finance Calculator",
    "Comprehensive finance calculator for budgeting, savings, and financial planning.",
    `/finance-calculator`,
  );

  return (
    <div className="page-container">
      <SEO pageKey="finance-calculator" schemaData={schema} />
      <FinanceCalculator />
    </div>
  );
};

export default FinanceCalculatorPage;
