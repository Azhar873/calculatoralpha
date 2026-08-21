import IncomeTaxCalculator from '../components/calculators/IncomeTaxCalculator/IncomeTaxCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const IncomeTaxCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Income Tax Calculator',
        'Calculate your income tax liability and take-home pay with tax brackets.',
        `/income-tax-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="income-tax-calculator"
                schemaData={schema}
            />
            <IncomeTaxCalculator />
        </div>
    )
}

export default IncomeTaxCalculatorPage
