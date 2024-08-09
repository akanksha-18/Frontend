import React, { useState, useEffect } from 'react';
import './CryptoTaxCalculator.css';

const CryptoTaxCalculator = () => {
  const [financialYear, setFinancialYear] = useState('FY 2023-24');
  const [country, setCountry] = useState('Australia');
  const [purchasePrice, setPurchasePrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [expenses, setExpenses] = useState('');
  const [investmentType, setInvestmentType] = useState('Long Term');
  const [annualIncome, setAnnualIncome] = useState('$0 - $18,200');
  
  const [capitalGainsAmount, setCapitalGainsAmount] = useState(0);
  const [discountForLongTermGains, setDiscountForLongTermGains] = useState(0);
  const [netCapitalGains, setNetCapitalGains] = useState(0);
  const [taxRate, setTaxRate] = useState('');
  const [taxToPay, setTaxToPay] = useState(0);

  useEffect(() => {
    calculateTax();
  }, [purchasePrice, salePrice, expenses, investmentType, annualIncome]);

  const calculateTax = () => {
    const purchase = parseFloat(purchasePrice) || 0;
    const sale = parseFloat(salePrice) || 0;
    const exp = parseFloat(expenses) || 0;

    const capitalGains = sale - purchase - exp;
    setCapitalGainsAmount(capitalGains);

    let discount = 0;
    if (investmentType === 'Long Term' && capitalGains > 0) {
      discount = capitalGains * 0.5;
    }
    setDiscountForLongTermGains(discount);

    const netGains = capitalGains - discount;
    setNetCapitalGains(netGains);

    const { rate, taxCalculation } = getTaxRateAndCalculation(annualIncome);
    setTaxRate(rate);

    const tax = taxCalculation(netGains);
    setTaxToPay(tax);
  };

  const getTaxRateAndCalculation = (income) => {
    switch (income) {
      case '$0 - $18,200':
        return { rate: '0%', taxCalculation: (gains) => 0 };
      case '$18,201 - $45,000':
        return { 
          rate: '19% of excess over $18,200', 
          taxCalculation: (gains) => (gains - 18200) * 0.19 
        };
      case '$45,001 - $120,000':
        return { 
          rate: '$5,092 + 32.5% of excess over $45,000',
          taxCalculation: (gains) => 5092 + (gains - 45000) * 0.325
        };
      case '$120,001 - $180,000':
        return { 
          rate: '$29,467 + 37% of excess over $120,000',
          taxCalculation: (gains) => 29467 + (gains - 120000) * 0.37
        };
      case '$180,001+':
        return { 
          rate: '$51,667 + 45% of excess over $180,000',
          taxCalculation: (gains) => 51667 + (gains - 180000) * 0.45
        };
      default:
        return { rate: '0%', taxCalculation: (gains) => 0 };
    }
  };

  return (
    <div className="crypto-tax-calculator">
      <h1>Free Crypto Tax Calculator Australia</h1>
      <div className="calculator-content">
        <div className="input-column">
          <div className="input-group">
            <label>Financial Year</label>
            <select value={financialYear} onChange={(e) => setFinancialYear(e.target.value)}>
              <option>FY 2023-24</option>
            </select>
          </div>
          <div className="input-group">
            <label>Country</label>
            <select value={country} onChange={(e) => setCountry(e.target.value)}>
              <option>Australia</option>
            </select>
          </div>
          <div className="input-group">
            <label>Purchase Price</label>
            <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Sale Price</label>
            <input type="number" value={salePrice} onChange={(e) => setSalePrice(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Expenses</label>
            <input type="number" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Investment Type</label>
            <select value={investmentType} onChange={(e) => setInvestmentType(e.target.value)}>
              <option>Long Term</option>
              <option>Short Term</option>
            </select>
          </div>
          <div className="input-group">
            <label>Annual Income</label>
            <select value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)}>
              <option>$0 - $18,200</option>
              <option>$18,201 - $45,000</option>
              <option>$45,001 - $120,000</option>
              <option>$120,001 - $180,000</option>
              <option>$180,001+</option>
            </select>
          </div>
        </div>
        <div className="results-column">
          <h2>Your Tax Results</h2>
          <div className="result-item">
            <span>Capital Gains Amount</span>
            <span>${capitalGainsAmount.toFixed(2)}</span>
          </div>
          {investmentType === 'Long Term' && (
            <div className="result-item">
              <span>Discount for Long Term Gains</span>
              <span>${discountForLongTermGains.toFixed(2)}</span>
            </div>
          )}
          <div className="result-item">
            <span>Net Capital Gains</span>
            <span>${netCapitalGains.toFixed(2)}</span>
          </div>
          <div className="result-item">
            <span>Tax Rate</span>
            <span>{taxRate}</span>
          </div>
          <div className="result-item highlight">
            <span>The tax you need to pay</span>
            <span>${taxToPay.toFixed(2)}</span>
          </div>
        </div>
      </div>
      {/* FAQ section can be added here */}
    </div>
  );
};

export default CryptoTaxCalculator;