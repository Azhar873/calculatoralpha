import ScientificCalculator from '../components/calculators/ScientificCalculator/ScientificCalculator'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, getSEOData, seoConfig } from '../utils/seo-config'
import styles from './ScientificCalculatorPage.module.scss'

function ScientificCalculatorPage() {
    const seoData = getSEOData('scientific-calculator')
    const schema = generateCalculatorSchema(
        'Scientific Calculator',
        seoData.description,
        `${seoConfig.siteUrl}/scientific-calculator`
    )

    return (
        <div className={styles.calculatorPage}>
            <SEO
                pageKey="scientific-calculator"
                schemaData={schema}
            />
            <div className="container">
                <div className={styles.pageHeader}>
                    <h1>Scientific Calculator</h1>
                    <p>Perform advanced mathematical calculations with scientific functions</p>
                </div>

                <ScientificCalculator />

                <div className={styles.pageInfo}>
                    <h2>How to Use</h2>
                    <ul>
                        <li>Use the number pad for basic calculations</li>
                        <li>Click scientific function buttons (sin, cos, tan, log, etc.) for advanced operations</li>
                        <li>Memory buttons (MC, MR, M+, M-) help store and recall values</li>
                        <li>Press C to clear the display</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ScientificCalculatorPage
