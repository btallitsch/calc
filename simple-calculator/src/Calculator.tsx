import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [firstValue, setFirstValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondValue, setWaitingForSecondValue] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false); // New error state

  const handleDigit = (digit: string) => {
    if (waitingForSecondValue) {
      setDisplayValue(digit);
      setWaitingForSecondValue(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (firstValue === null) {
      setFirstValue(inputValue);
    } else if (operator) {
      const result = performCalculation(firstValue, inputValue, operator);
      
      if (isNaN(result)) {
        setError(true);
        setDisplayValue('Error');
      } else {
        setDisplayValue(String(result));
        setFirstValue(result);
      }
    }

    setOperator(nextOperator);
    setWaitingForSecondValue(true);
  };

  const performCalculation = (first: number, second: number, operator: string): number => {
    switch (operator) {
      case '+':
        return first + second;
      case '-':
        return first - second;
      case '*':
        return first * second;
      case '/':
        return second === 0 ? NaN : first / second; // Return NaN for division by zero
      default:
        return second;
    }
  };

  const handleClear = () => {
    setDisplayValue('0');
    setFirstValue(null);
    setOperator(null);
    setWaitingForSecondValue(false);
    setError(false); // Clear error state
  };

  return (
    <div className="calculator">
      <div className="calculator-display">{displayValue}</div>
      <div className="calculator-keys">
        <button onClick={handleClear}>AC</button>
        <button onClick={() => handleOperator('/')}>/</button>
        <button onClick={() => handleOperator('*')}>*</button>
        <button onClick={() => handleOperator('-')}>-</button>
        <button onClick={() => handleDigit('7')}>7</button>
        <button onClick={() => handleDigit('8')}>8</button>
        <button onClick={() => handleDigit('9')}>9</button>
        <button onClick={() => handleOperator('+')}>+</button>
        <button onClick={() => handleDigit('4')}>4</button>
        <button onClick={() => handleDigit('5')}>5</button>
        <button onClick={() => handleDigit('6')}>6</button>
        <button onClick={() => handleDigit('1')}>1</button>
        <button onClick={() => handleDigit('2')}>2</button>
        <button onClick={() => handleDigit('3')}>3</button>
        <button onClick={() => handleDigit('0')}>0</button>
        <button onClick={() => handleDigit('.')}>.</button>
        <button onClick={() => handleOperator('=')}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
