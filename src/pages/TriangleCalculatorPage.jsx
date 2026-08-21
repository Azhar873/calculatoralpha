import TriangleCalculator from '../components/calculators/TriangleCalculator/TriangleCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const TriangleCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Triangle Calculator',
        'Calculate triangle area, perimeter, angles, and sides with multiple solving methods.',
        `/triangle-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="triangle-calculator"
                schemaData={schema}
            />
            <TriangleCalculator />
        </div>
    )
}

export default TriangleCalculatorPage
