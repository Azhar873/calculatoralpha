import InterestCalculator from '../components/calculators/InterestCalculator/InterestCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const InterestCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Interest Calculator',
        'Calculate simple and compound interest on loans and investments.',
        `/interest-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="interest-calculator"
                schemaData={schema}
            />
            <InterestCalculator />
        </div>
    )
}

export default InterestCalculatorPage
