import RetirementCalculator from '../components/calculators/RetirementCalculator/RetirementCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const RetirementCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Retirement Calculator',
        'Calculate how much you need to save for retirement with investment growth projections.',
        `/retirement-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="retirement-calculator"
                schemaData={schema}
            />
            <RetirementCalculator />
        </div>
    )
}

export default RetirementCalculatorPage
