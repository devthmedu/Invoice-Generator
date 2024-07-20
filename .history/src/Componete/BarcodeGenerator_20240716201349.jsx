import React, { useState } from 'react';
import Barcode from 'react-barcode';

function BarcodeGenerator() {
  const [inputValue, setInputValue] = useState('');

  const clearInput = () => {
    setInputValue('');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Allow only numeric input
    if (/^[0-9]*$/.test(value)) {
      setInputValue(value);
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Gerador de Código de Barras</h2>
      <input
        type="text"
        placeholder="Digite o código (apenas números)"
        value={inputValue}
        onChange={handleInputChange}
        style={{
          padding: '10px',
          fontSize: '16px',
          width: '300px',
          marginBottom: '10px',
          border: '1px solid #ccc',
          borderRadius: '5px',
        }}
      />
      <div style={{ margin: '20px 0' }}>
        {inputValue && <Barcode value={inputValue} />}
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
