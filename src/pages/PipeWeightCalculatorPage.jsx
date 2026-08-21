import PipeWeightCalculator from '../components/calculators/PipeWeightCalculator/PipeWeightCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema } from '../utils/seo-config'

const PipeWeightCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Pipe Weight Calculator',
        'Calculate pipe weight based on material, diameter, wall thickness, and total length.',
        '/pipe-weight-calculator'
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="pipe-weight-calculator"
                schemaData={schema}
            />
            <PipeWeightCalculator />
        </div>
    )
}

export default PipeWeightCalculatorPage
