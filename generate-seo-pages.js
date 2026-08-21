// Script to generate SEO-enabled calculator page templates
// This creates the import and SEO setup for all calculator pages

const calculatorPages = [
    { file: 'AutoLoanCalculatorPage', component: 'AutoLoanCalculator', key: 'auto-loan-calculator', name: 'Auto Loan Calculator', desc: 'Calculate your auto loan payments, interest, and total cost with amortization schedule.' },
    { file: 'InterestCalculatorPage', component: 'InterestCalculator', key: 'interest-calculator', name: 'Interest Calculator', desc: 'Calculate simple and compound interest on loans and investments.' },
    { file: 'PaymentCalculatorPage', component: 'PaymentCalculator', key: 'payment-calculator', name: 'Payment Calculator', desc: 'Calculate monthly payments for loans, mortgages, and credit cards.' },
    { file: 'RetirementCalculatorPage', component: 'RetirementCalculator', key: 'retirement-calculator', name: 'Retirement Calculator', desc: 'Calculate how much you need to save for retirement with investment growth projections.' },
    { file: 'AmortizationCalculatorPage', component: 'AmortizationCalculator', key: 'amortization-calculator', name: 'Amortization Calculator', desc: 'Generate detailed amortization schedules for loans and mortgages.' },
    { file: 'InvestmentCalculatorPage', component: 'InvestmentCalculator', key: 'investment-calculator', name: 'Investment Calculator', desc: 'Calculate investment returns, compound growth, and future value.' },
    { file: 'InflationCalculatorPage', component: 'InflationCalculator', key: 'inflation-calculator', name: 'Inflation Calculator', desc: 'Calculate inflation rates and purchasing power over time.' },
    { file: 'FinanceCalculatorPage', component: 'FinanceCalculator', key: 'finance-calculator', name: 'Finance Calculator', desc: 'Comprehensive finance calculator for budgeting, savings, and financial planning.' },
    { file: 'IncomeTaxCalculatorPage', component: 'IncomeTaxCalculator', key: 'income-tax-calculator', name: 'Income Tax Calculator', desc: 'Calculate your income tax liability and take-home pay with tax brackets.' },
    { file: 'CompoundInterestCalculatorPage', component: 'CompoundInterestCalculator', key: 'compound-interest-calculator', name: 'Compound Interest Calculator', desc: 'Calculate compound interest on investments and savings with detailed breakdown.' },
    { file: 'SalaryCalculatorPage', component: 'SalaryCalculator', key: 'salary-calculator', name: 'Salary Calculator', desc: 'Calculate your take-home salary after taxes and deductions.' },
    { file: 'InterestRateCalculatorPage', component: 'InterestRateCalculator', key: 'interest-rate-calculator', name: 'Interest Rate Calculator', desc: 'Calculate interest rates on loans and investments with APR and APY.' },
    { file: 'SalesTaxCalculatorPage', component: 'SalesTaxCalculator', key: 'sales-tax-calculator', name: 'Sales Tax Calculator', desc: 'Calculate sales tax on purchases with tax rates by state.' },
    { file: 'BMRCalculatorPage', component: 'BMRCalculator', key: 'bmr-calculator', name: 'BMR Calculator', desc: 'Calculate your BMR (Basal Metabolic Rate) and daily calorie needs with activity levels.' },
    { file: 'BodyFatCalculatorPage', component: 'BodyFatCalculator', key: 'body-fat-calculator', name: 'Body Fat Calculator', desc: 'Calculate your body fat percentage using various methods with healthy ranges.' },
    { file: 'IdealWeightCalculatorPage', component: 'IdealWeightCalculator', key: 'ideal-weight-calculator', name: 'Ideal Weight Calculator', desc: 'Calculate your ideal body weight based on height, age, and gender.' },
    { file: 'PaceCalculatorPage', component: 'PaceCalculator', key: 'pace-calculator', name: 'Pace Calculator', desc: 'Calculate your running or walking pace, speed, and finish time.' },
    { file: 'PregnancyCalculatorPage', component: 'PregnancyCalculator', key: 'pregnancy-calculator', name: 'Pregnancy Calculator', desc: 'Calculate your pregnancy due date and current week with trimester information.' },
    { file: 'PregnancyConceptionCalculatorPage', component: 'PregnancyConceptionCalculator', key: 'pregnancy-conception-calculator', name: 'Pregnancy Conception Calculator', desc: 'Calculate your conception date based on due date or last period.' },
    { file: 'DueDateCalculatorPage', component: 'DueDateCalculator', key: 'due-date-calculator', name: 'Due Date Calculator', desc: 'Calculate your pregnancy due date based on last menstrual period or conception date.' },
    { file: 'FractionCalculatorPage', component: 'FractionCalculator', key: 'fraction-calculator', name: 'Fraction Calculator', desc: 'Calculate fractions with addition, subtraction, multiplication, and division.' },
    { file: 'RandomNumberGeneratorPage', component: 'RandomNumberGenerator', key: 'random-number-generator', name: 'Random Number Generator', desc: 'Generate random numbers within a specified range.' },
    { file: 'TriangleCalculatorPage', component: 'TriangleCalculator', key: 'triangle-calculator', name: 'Triangle Calculator', desc: 'Calculate triangle area, perimeter, angles, and sides with multiple solving methods.' },
    { file: 'StandardDeviationCalculatorPage', component: 'StandardDeviationCalculator', key: 'standard-deviation-calculator', name: 'Standard Deviation Calculator', desc: 'Calculate standard deviation, variance, and mean with step-by-step solutions.' },
    { file: 'DateCalculatorPage', component: 'DateCalculator', key: 'date-calculator', name: 'Date Calculator', desc: 'Calculate the difference between two dates or add/subtract days from a date.' },
    { file: 'TimeCalculatorPage', component: 'TimeCalculator', key: 'time-calculator', name: 'Time Calculator', desc: 'Calculate time difference, add or subtract time with hours, minutes, and seconds.' },
    { file: 'HoursCalculatorPage', component: 'HoursCalculator', key: 'hours-calculator', name: 'Hours Calculator', desc: 'Calculate hours and minutes between two times for work time tracking.' },
    { file: 'GradeCalculatorPage', component: 'GradeCalculator', key: 'grade-calculator', name: 'Grade Calculator', desc: 'Calculate your final grade based on assignments, tests, and exams with weighted categories.' },
    { file: 'ConcreteCalculatorPage', component: 'ConcreteCalculator', key: 'concrete-calculator', name: 'Concrete Calculator', desc: 'Calculate concrete volume, bags needed, and cost for your project.' },
    { file: 'SubnetCalculatorPage', component: 'SubnetCalculator', key: 'subnet-calculator', name: 'Subnet Calculator', desc: 'Calculate IP subnets, network addresses, and host ranges for network planning.' },
    { file: 'PasswordGeneratorPage', component: 'PasswordGenerator', key: 'password-generator', name: 'Password Generator', desc: 'Generate strong, secure passwords with customizable options.' },
    { file: 'ConversionCalculatorPage', component: 'ConversionCalculator', key: 'conversion-calculator', name: 'Conversion Calculator', desc: 'Convert between different units of measurement for length, weight, temperature, and more.' },
];

// Generate template for each page
calculatorPages.forEach(calc => {
    const template = `import ${calc.component} from '../components/calculators/${calc.component}/${calc.component}'
import SEO from '../components/SEO/SEO'
import { generateCalculatorSchema, seoConfig } from '../utils/seo-config'

const ${calc.file} = () => {
    const schema = generateCalculatorSchema(
        '${calc.name}',
        '${calc.desc}',
        \`\${seoConfig.siteUrl}/${calc.key}\`
    )

    return (
        <div className="page-container">
            <SEO 
                pageKey="${calc.key}"
                schemaData={schema}
            />
            <${calc.component} />
        </div>
    )
}

export default ${calc.file}
`;

    console.log(`\n// ===== ${calc.file}.jsx =====`);
    console.log(template);
});
