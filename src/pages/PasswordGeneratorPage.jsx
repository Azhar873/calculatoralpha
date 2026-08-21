import PasswordGenerator from '../components/calculators/PasswordGenerator/PasswordGenerator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const PasswordGeneratorPage = () => {
    const schema = generateCalculatorSchema(
        'Password Generator',
        'Generate strong, secure passwords with customizable options.',
        `/password-generator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="password-generator"
                schemaData={schema}
            />
            <PasswordGenerator />
        </div>
    )
}

export default PasswordGeneratorPage
