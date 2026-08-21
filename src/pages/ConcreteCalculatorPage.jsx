import ConcreteCalculator from '../components/calculators/ConcreteCalculator/ConcreteCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const ConcreteCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Concrete Calculator',
        'Calculate concrete volume, bags needed, and cost for your project.',
        `/concrete-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="concrete-calculator"
                schemaData={schema}
            />
            <ConcreteCalculator />
        </div>
    )
}

export default ConcreteCalculatorPage
