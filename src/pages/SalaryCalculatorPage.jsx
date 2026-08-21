import SalaryCalculator from '../components/calculators/SalaryCalculator/SalaryCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const SalaryCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Salary Calculator',
        'Calculate your take-home salary after taxes and deductions.',
        `/salary-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="salary-calculator"
                schemaData={schema}
            />
            <SalaryCalculator />
        </div>
    )
}

export default SalaryCalculatorPage
