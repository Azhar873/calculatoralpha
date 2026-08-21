import LoanCalculator from '../components/calculators/LoanCalculator/LoanCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const LoanCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Loan Calculator',
        'Calculate loan payments, interest rates, and total cost for personal loans.',
        `${seoConfig.siteUrl}/loan-calculator`
    )

    return (
        <div className="page-container">
            <SEO
                pageKey="loan-calculator"
                schemaData={schema}
            />
            <LoanCalculator />
        </div>
    )
}

export default LoanCalculatorPage
