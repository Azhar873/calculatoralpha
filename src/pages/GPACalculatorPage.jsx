import GPACalculator from '../components/calculators/GPACalculator/GPACalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const GPACalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'GPA Calculator',
        'Calculate your GPA (Grade Point Average) for high school or college with weighted grades.',
        `${seoConfig.siteUrl}/gpa-calculator`
    )

    return (
        <div className="page-container">
            <SEO
                pageKey="gpa-calculator"
                schemaData={schema}
            />
            <GPACalculator />
        </div>
    )
}

export default GPACalculatorPage
