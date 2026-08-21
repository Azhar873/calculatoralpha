import FractionCalculator from '../components/calculators/FractionCalculator/FractionCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const FractionCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Fraction Calculator',
        'Calculate fractions with addition, subtraction, multiplication, and division.',
        `/fraction-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="fraction-calculator"
                schemaData={schema}
            />
            <FractionCalculator />
        </div>
    )
}

export default FractionCalculatorPage
