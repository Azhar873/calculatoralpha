import PregnancyCalculator from '../components/calculators/PregnancyCalculator/PregnancyCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const PregnancyCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Pregnancy Calculator',
        'Calculate your pregnancy due date and current week with trimester information.',
        `/pregnancy-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="pregnancy-calculator"
                schemaData={schema}
            />
            <PregnancyCalculator />
        </div>
    )
}

export default PregnancyCalculatorPage
