import { useState } from 'react'
import styles from './SalesTaxCalculator.module.scss'

const SalesTaxCalculator = () => {
    const [price, setPrice] = useState('')
    const [taxRate, setTaxRate] = useState('')
    const [priceIncludesTax, setPriceIncludesTax] = useState(false)

    const [netPrice, setNetPrice] = useState(null)
    const [taxAmount, setTaxAmount] = useState(null)
    const [totalPrice, setTotalPrice] = useState(null)

    const calculateSalesTax = () => {
        const p = parseFloat(price)
        const rate = parseFloat(taxRate)

        if (isNaN(p) || isNaN(rate) || p < 0 || rate < 0) {
            alert('Please enter valid positive numbers.')
            return
        }

        let calculatedTax = 0
        let calculatedTotal = 0
        let calculatedNet = 0

        if (priceIncludesTax) {
            // Price entered is the Total Price
            // Total = Net * (1 + rate/100)
            // Net = Total / (1 + rate/100)
            calculatedNet = p / (1 + rate / 100)
            calculatedTax = p - calculatedNet
            calculatedTotal = p
        } else {
            // Price entered is Net Price
            calculatedNet = p
            calculatedTax = p * (rate / 100)
            calculatedTotal = p + calculatedTax
        }

        setNetPrice(calculatedNet.toFixed(2))
        setTaxAmount(calculatedTax.toFixed(2))
        setTotalPrice(calculatedTotal.toFixed(2))
    }

    return (
        <div className={styles.salesTaxCalculatorContainer}>
            <div className={styles.salesTaxCalculator}>
                <div className={styles.header}>
                    <h2>Sales Tax Calculator</h2>
                    <p>Calculate sales tax and total price</p>
                </div>

                <div className={styles.inputGroup}>
                    <label>Amount ($)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="e.g. 100"
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label>Sales Tax Rate (%)</label>
                    <input
                        type="number"
                        value={taxRate}
                        onChange={(e) => setTaxRate(e.target.value)}
                        placeholder="e.g. 8.25"
                    />
                </div>

                <div className={styles.checkboxGroup} onClick={() => setPriceIncludesTax(!priceIncludesTax)}>
                    <input
                        type="checkbox"
                        checked={priceIncludesTax}
                        onChange={() => { }} // handled by parent onClick
                    />
                    <span>Price already includes tax</span>
                </div>

                <button className={styles.calculateBtn} onClick={calculateSalesTax}>
                    Calculate
                </button>

                {totalPrice && (
                    <div className={styles.resultContainer}>
                        <div className={styles.resultRow}>
                            <div className={styles.resultLabel}>
                                {priceIncludesTax ? 'Net Price (Before Tax)' : 'Total Price (After Tax)'}
                            </div>
                            <div className={styles.resultValue}>
                                ${priceIncludesTax ? netPrice : totalPrice}
                            </div>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>{priceIncludesTax ? 'Total Price (Included)' : 'Net Price:'}</span>
                            <span>${priceIncludesTax ? totalPrice : netPrice}</span>
                        </div>
                        <div className={styles.resultRowSecondary}>
                            <span>Sales Tax Amount:</span>
                            <span>${taxAmount}</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SalesTaxCalculator
