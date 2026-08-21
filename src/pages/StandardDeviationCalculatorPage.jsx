import StandardDeviationCalculator from '../components/calculators/StandardDeviationCalculator/StandardDeviationCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const StandardDeviationCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Standard Deviation Calculator',
        'Calculate standard deviation, variance, and mean with step-by-step solutions.',
        `/standard-deviation-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="standard-deviation-calculator"
                schemaData={schema}
            />
            <StandardDeviationCalculator />
        </div>
    )
}

export default StandardDeviationCalculatorPage
