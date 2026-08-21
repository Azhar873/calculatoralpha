import BMICalculator from '../components/calculators/BMICalculator/BMICalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const BMICalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'BMI Calculator',
        'Calculate your BMI (Body Mass Index) and check if you\'re in a healthy weight range.',
        `${seoConfig.siteUrl}/bmi-calculator`
    )

    return (
        <div className="page-container">
            <SEO
                pageKey="bmi-calculator"
                schemaData={schema}
            />
            <BMICalculator />
        </div>
    )
}

export default BMICalculatorPage
