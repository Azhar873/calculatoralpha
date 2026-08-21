import IdealWeightCalculator from '../components/calculators/IdealWeightCalculator/IdealWeightCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const IdealWeightCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Ideal Weight Calculator',
        'Calculate your ideal body weight based on height, age, and gender.',
        `/ideal-weight-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="ideal-weight-calculator"
                schemaData={schema}
            />
            <IdealWeightCalculator />
        </div>
    )
}

export default IdealWeightCalculatorPage
