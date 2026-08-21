import MortgageCalculator from '../components/calculators/MortgageCalculator/MortgageCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const MortgageCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Mortgage Calculator',
        'Calculate monthly mortgage payments, total interest, and amortization schedule.',
        `${seoConfig.siteUrl}/mortgage-calculator`
    )

    return (
        <div style={{ padding: '40px 20px' }}>
            <SEO
                pageKey="mortgage-calculator"
                schemaData={schema}
            />
            <MortgageCalculator />
        </div>
    )
}

export default MortgageCalculatorPage
