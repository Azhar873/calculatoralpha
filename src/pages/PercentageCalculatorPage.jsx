import PercentageCalculator from '../components/calculators/PercentageCalculator/PercentageCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const PercentageCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Percentage Calculator',
        'Calculate percentages, percentage increase, decrease, and more with multiple modes.',
        `${seoConfig.siteUrl}/percentage-calculator`
    )

    return (
        <div className="page-container">
            <SEO
                pageKey="percentage-calculator"
                schemaData={schema}
            />
            <PercentageCalculator />
        </div>
    )
}

export default PercentageCalculatorPage
