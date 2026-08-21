import CompoundInterestCalculator from '../components/calculators/CompoundInterestCalculator/CompoundInterestCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const CompoundInterestCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Compound Interest Calculator',
        'Calculate compound interest on investments and savings with detailed breakdown.',
        `/compound-interest-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="compound-interest-calculator"
                schemaData={schema}
            />
            <CompoundInterestCalculator />
        </div>
    )
}

export default CompoundInterestCalculatorPage
