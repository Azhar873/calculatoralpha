import BodyFatCalculator from '../components/calculators/BodyFatCalculator/BodyFatCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const BodyFatCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Body Fat Calculator',
        'Calculate your body fat percentage using various methods with healthy ranges.',
        `/body-fat-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="body-fat-calculator"
                schemaData={schema}
            />
            <BodyFatCalculator />
        </div>
    )
}

export default BodyFatCalculatorPage
