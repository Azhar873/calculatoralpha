import SubnetCalculator from '../components/calculators/SubnetCalculator/SubnetCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const SubnetCalculatorPage = () => {
    const schema = generateCalculatorSchema(
        'Subnet Calculator',
        'Calculate IP subnets, network addresses, and host ranges for network planning.',
        `/subnet-calculator`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="subnet-calculator"
                schemaData={schema}
            />
            <SubnetCalculator />
        </div>
    )
}

export default SubnetCalculatorPage
