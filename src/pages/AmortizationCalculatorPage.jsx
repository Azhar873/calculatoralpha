import AmortizationCalculator from '../components/calculators/AmortizationCalculator/AmortizationCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const AmortizationCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Amortization Calculator',
        'Generate detailed amortization schedules for loans and mortgages.',
        `/amortization-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="amortization-calculator"
                schemaData={schema}
            />
            <AmortizationCalculator />
        </div>
    )
}

export default AmortizationCalculatorPage
