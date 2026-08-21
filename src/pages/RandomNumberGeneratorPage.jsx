import RandomNumberGenerator from '../components/calculators/RandomNumberGenerator/RandomNumberGenerator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const RandomNumberGeneratorPage = () => {
    const schema = generateCalculatorSchema(
        'Random Number Generator',
        'Generate random numbers within a specified range.',
        `/random-number-generator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="random-number-generator"
                schemaData={schema}
            />
            <RandomNumberGenerator />
        </div>
    )
}

export default RandomNumberGeneratorPage
