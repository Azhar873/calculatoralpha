import AgeCalculator from '../components/calculators/AgeCalculator/AgeCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const AgeCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Age Calculator',
        'Calculate your age in years, months, days, and more with detailed breakdown.',
        `${seoConfig.siteUrl}/age-calculator`
    )

    return (
        <div className="page-container">
            <SEO
                pageKey="age-calculator"
                schemaData={schema}
            />
            <AgeCalculator />
        </div>
    )
}

export default AgeCalculatorPage
