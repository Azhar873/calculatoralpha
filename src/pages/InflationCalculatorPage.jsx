import InflationCalculator from '../components/calculators/InflationCalculator/InflationCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const InflationCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Inflation Calculator',
        'Calculate inflation rates and purchasing power over time.',
        `/inflation-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="inflation-calculator"
                schemaData={schema}
            />
            <InflationCalculator />
        </div>
    )
}

export default InflationCalculatorPage
