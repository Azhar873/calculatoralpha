import PaymentCalculator from '../components/calculators/PaymentCalculator/PaymentCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const PaymentCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Payment Calculator',
        'Calculate monthly payments for loans, mortgages, and credit cards.',
        `/payment-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="payment-calculator"
                schemaData={schema}
            />
            <PaymentCalculator />
        </div>
    )
}

export default PaymentCalculatorPage
