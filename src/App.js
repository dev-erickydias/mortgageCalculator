import './style.css';
import { useState } from 'react';

export default function App() {
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [totalPayment, setTotalPayment] = useState('');
  const [totalInterest, setTotalInterest] = useState('');

  function onSubmit(event) {
    event.preventDefault(); // Prevent page reload on form submission.

    const data = new FormData(event.target);

    // Get and convert input values.
    const loanAmount = parseFloat(data.get('loan-amount'));
    const monthlyInterestRate =
      parseFloat(data.get('interest-rate')) / 100 / 12;
    const loanTermInMonths =
      parseFloat(data.get('loan-term')) * 12;

    // Calculate monthly mortgage payment.
    const monthlyPaymentAmount =
      (loanAmount * monthlyInterestRate) /
      (1 -
        1 /
          Math.pow(
            1 + monthlyInterestRate,
            loanTermInMonths,
          ));
    const totalPayment =
      monthlyPaymentAmount * loanTermInMonths;

    const currencyFormatter = new Intl.NumberFormat(
      'en-US',
      {
        style: 'currency',
        currency: 'USD',
      },
    );

    // Display monthly payment amount.
    setMonthlyPayment(
      currencyFormatter.format(monthlyPaymentAmount),
    );

    // Display total payment amount.
    setTotalPayment(currencyFormatter.format(totalPayment));

    // Display total interest amount.
    setTotalInterest(
      currencyFormatter.format(totalPayment - loanAmount),
    );
  }

  return (
    <div className="mortgage-calculator">
      <form
        className="mortgage-calculator-form"
        onSubmit={onSubmit}>
        <div>
          <label>
          Montante do empréstimo:{' '}
            <input
              type="number"
              name="loan-amount"
              defaultValue="100000"
              min="1"
              required
            />
          </label>
        </div>
        <div>
          <label>
          Prazo do empréstimo (anos):{' '}
            <input
              type="number"
              name="loan-term"
              defaultValue="30"
              min="1"
              required
            />
          </label>
        </div>
        <div>
          <label>
          Taxa de juro (%): {' '}
            <input
              type="number"
              name="interest-rate"
              defaultValue="3"
              step="0.01"
              min="0.01"
              required
            />
          </label>
        </div>
        <div>
          <button type="submit">Calcular</button>
        </div>
      </form>
      <hr />
      <div
        aria-live="polite"
        className="mortgage-calculator-results">
        <div>
        Valor do pagamento mensal:{' '}
          <strong>{monthlyPayment}</strong>
        </div>
        <div>
        Valor total do pagamento:{' '}
          <strong>{totalPayment}</strong>
        </div>
        <div>
        Juros totais pagos:{' '}
          <strong>{totalInterest}</strong>
        </div>
      </div>
    </div>
  );
}
