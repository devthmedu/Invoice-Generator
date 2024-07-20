import React, { useState } from 'react';
import Barcode from 'react-barcode';
import './BarcodeGenerator.css'; // Assuming you'll create this CSS file

function BarcodeGenerator() {
  const [inputValue, setInputValue] = useState('');

  const clearInput = () => {
    setInputValue('');
  };

  const isValidBarcode = (value) => {
    return /^[0-9]+$/.test(value); // Validates input as a non-empty string of integers
  };

  return (
    <div className="barcode-container">
      <h1>Gerador de Código de Barras</h1>
      <input
        type="text"
        placeholder="Digite o código"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="barcode-input"
      />
      <div className="barcode-display">
        {inputValue && isValidBarcode(inputValue) ? (
          <Barcode value={inputValue} />
        ) : (
          inputValue && (
            <p className="error-message">
              Código inválido. Use apenas números.
            </p>
          )
        )}
      </div>
      <button onClick={clearInput} className="clear-button">
        Limpar
      </button>
    </div>
  );
}

export default BarcodeGenerator;
