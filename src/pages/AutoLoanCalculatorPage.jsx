import AutoLoanCalculator from '../components/calculators/AutoLoanCalculator/AutoLoanCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const AutoLoanCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Auto Loan Calculator',
        'Calculate your auto loan payments, interest, and total cost with amortization schedule.',
        `/auto-loan-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="auto-loan-calculator"
                schemaData={schema}
            />
            <AutoLoanCalculator />
        </div>
    )
}

export default AutoLoanCalculatorPage
