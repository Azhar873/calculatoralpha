import InterestRateCalculator from '../components/calculators/InterestRateCalculator/InterestRateCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const InterestRateCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Interest Rate Calculator',
        'Calculate interest rates on loans and investments with APR and APY.',
        `/interest-rate-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="interest-rate-calculator"
                schemaData={schema}
            />
            <InterestRateCalculator />
        </div>
    )
}

export default InterestRateCalculatorPage
