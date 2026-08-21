import BMRCalculator from '../components/calculators/BMRCalculator/BMRCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const BMRCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'BMR Calculator',
        'Calculate your BMR (Basal Metabolic Rate) and daily calorie needs with activity levels.',
        `/bmr-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="bmr-calculator"
                schemaData={schema}
            />
            <BMRCalculator />
        </div>
    )
}

export default BMRCalculatorPage
