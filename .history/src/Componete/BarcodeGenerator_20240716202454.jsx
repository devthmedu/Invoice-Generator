import React, { useState } from 'react';
import Barcode from 'react-barcode';

function BarcodeGenerator() {
  const [inputValue, setInputValue] = useState('');

  const clearInput = () => {
    setInputValue('');
  };

  const isValidBarcode = (value) => {
    return /^[0-9]+$/.test(value); // Check if the value is a non-empty string of integers
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <input
        type="text"
        placeholder="Digite o código"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '300px',
          marginBottom: '10px',
        }}
      />
      <div style={{ margin: '20px 0' }}>
        {inputValue && isValidBarcode(inputValue) && (
          <Barcode value={inputValue} />
        )}
      </div>
      <button
        onClick={clearInput}
        style={{
          padding: '10px 15px',
          fontSize: '16px',
          backgroundColor: '#48ede5',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Limpar
      </button>
    </div>
  );
}

export default BarcodeGenerator;
