import CalorieCalculator from '../components/calculators/CalorieCalculator/CalorieCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const CalorieCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Calorie Calculator',
        'Calculate your daily calorie needs for weight loss, maintenance, or gain.',
        `${seoConfig.siteUrl}/calorie-calculator`
    )

    return (
        <div className="page-container">
            <SEO
                pageKey="calorie-calculator"
                schemaData={schema}
            />
            <CalorieCalculator />
        </div>
    )
}

export default CalorieCalculatorPage
