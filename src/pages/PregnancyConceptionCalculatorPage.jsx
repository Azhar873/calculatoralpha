import PregnancyConceptionCalculator from '../components/calculators/PregnancyConceptionCalculator/PregnancyConceptionCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const PregnancyConceptionCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Pregnancy Conception Calculator',
        'Calculate your conception date based on due date or last period.',
        `/pregnancy-conception-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="pregnancy-conception-calculator"
                schemaData={schema}
            />
            <PregnancyConceptionCalculator />
        </div>
    )
}

export default PregnancyConceptionCalculatorPage
