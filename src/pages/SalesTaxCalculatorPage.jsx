import SalesTaxCalculator from '../components/calculators/SalesTaxCalculator/SalesTaxCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const SalesTaxCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Sales Tax Calculator',
        'Calculate sales tax on purchases with tax rates by state.',
        `/sales-tax-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="sales-tax-calculator"
                schemaData={schema}
            />
            <SalesTaxCalculator />
        </div>
    )
}

export default SalesTaxCalculatorPage
