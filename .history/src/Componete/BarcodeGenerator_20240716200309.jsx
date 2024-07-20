import React, { useState } from 'react';
import Barcode from 'react-barcode';

function BarcodeGenerator() {
  const [inputValue, setInputValue] = useState('');

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <input
        type="text"
        placeholder="Digite o código"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', width: '300px' }}
      />
      <div style={{ margin: '20px 0' }}>
        {inputValue && <Barcode value={inputValue} />}
      </div>
    </div>
  );
}

export default BarcodeGenerator;
