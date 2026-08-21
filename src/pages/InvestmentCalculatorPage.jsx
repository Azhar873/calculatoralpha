import InvestmentCalculator from '../components/calculators/InvestmentCalculator/InvestmentCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const InvestmentCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Investment Calculator',
        'Calculate investment returns, compound growth, and future value.',
        `/investment-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="investment-calculator"
                schemaData={schema}
            />
            <InvestmentCalculator />
        </div>
    )
}

export default InvestmentCalculatorPage
