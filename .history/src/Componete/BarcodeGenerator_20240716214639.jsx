import React, { useState } from 'react';
import Barcode from 'react-barcode';
import './BarcodeGenerator.css'; // Ensure this CSS file is created

function BarcodeGenerator() {
  const [inputValue, setInputValue] = useState('');
  const [barcodeFormat, setBarcodeFormat] = useState('CODE128'); // Default format

  const clearInput = () => {
    setInputValue('');
  };

  const isValidBarcode = (value) => {
    return /^[0-9]+$/.test(value); // Validates input as a non-empty string of integers
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inputValue);
    alert('Código copiado para a área de transferência!');
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
      <div className="barcode-format">
        <label>
          <input
            type="radio"
            value="CODE128"
            checked={barcodeFormat === 'CODE128'}
            onChange={(e) => setBarcodeFormat(e.target.value)}
          />
          CODE128
        </label>
        <label>
          <input
            type="radio"
            value="CODE39"
            checked={barcodeFormat === 'CODE39'}
            onChange={(e) => setBarcodeFormat(e.target.value)}
          />
          CODE39
        </label>
      </div>
      <div className="barcode-display">
        {inputValue && isValidBarcode(inputValue) ? (
          <div>
            <Barcode value={inputValue} format={barcodeFormat} />
            <button onClick={copyToClipboard} className="copy-button">
              Copiar Código
            </button>
          </div>
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
