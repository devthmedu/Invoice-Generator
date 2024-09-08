// components/BarcodeDisplay.js
import React from 'react';
import Barcode from 'react-barcode';
import './BarcodeDisplay.css';

function BarcodeDisplay({ numeroDaFatura }) {
  return (
    <div className="barcode-container">
      <h2>Código de Barras:</h2>
      <div className="barcode-wrapper">
        {numeroDaFatura ? <Barcode value={numeroDaFatura} /> : <p>Sem código disponível</p>}
      </div>
    </div>
  );
}

export default BarcodeDisplay;