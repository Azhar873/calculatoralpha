import ConversionCalculator from '../components/calculators/ConversionCalculator/ConversionCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const ConversionCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Conversion Calculator',
        'Convert between different units of measurement for length, weight, temperature, and more.',
        `/conversion-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="conversion-calculator"
                schemaData={schema}
            />
            <ConversionCalculator />
        </div>
    )
}

export default ConversionCalculatorPage
