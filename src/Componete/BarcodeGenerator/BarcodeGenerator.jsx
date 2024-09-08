// components/BarcodeGenerator.js
import React, { useState } from 'react';
import Barcode from 'react-barcode';
import { Button, RadioGroup, FormControlLabel, Radio, TextField, Typography, Alert, Slider } from '@mui/material';
import { Copy, RefreshCcw, Barcode as BarcodeIcon } from 'lucide-react'; // Importando ícones

import 'float-ui/dist/float-ui.min.css'; // Import Float UI CSS
import './BarcodeGenerator.css'; // Certifique-se de que este CSS foi criado

function BarcodeGenerator() {
  const [inputValue, setInputValue] = useState('');
  const [barcodeFormat, setBarcodeFormat] = useState('CODE128'); // Default format
  const [scale, setScale] = useState(1); // Default scale
  const [error, setError] = useState('');

  const clearInput = () => {
    setInputValue('');
    setError('');
  };

  const isValidBarcode = (value) => {
    return /^[0-9]+$/.test(value); // Validates input as a non-empty string of integers
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inputValue);
    alert('Código copiado para a área de transferência!');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (!isValidBarcode(value)) {
      setError('Código inválido. Use apenas números.');
    } else {
      setError('');
    }
  };

  return (
    <div className="barcode-container">
      <Typography variant="h4" className="title">
        <BarcodeIcon className="barcode-icon" /> Gerador de Código de Barras
      </Typography>
      <TextField
        label="Digite o código"
        variant="outlined"
        fullWidth
        value={inputValue}
        onChange={handleInputChange}
        className="barcode-input"
        error={!!error}
        helperText={error}
      />
      <div className="barcode-format">
        <Typography variant="h6">Formato do Código de Barras</Typography>
        <RadioGroup
          value={barcodeFormat}
          onChange={(e) => setBarcodeFormat(e.target.value)}
          className="barcode-format-group"
        >
          <FormControlLabel value="CODE128" control={<Radio />} label="CODE128" />
          <FormControlLabel value="CODE39" control={<Radio />} label="CODE39" />
          <FormControlLabel value="EAN13" control={<Radio />} label="EAN13" />
          <FormControlLabel value="UPC" control={<Radio />} label="UPC" />
        </RadioGroup>
      </div>
      <div className="barcode-scale">
        <Typography variant="h6">Escala do Código de Barras</Typography>
        <Slider
          value={scale}
          onChange={(e, newValue) => setScale(newValue)}
          aria-labelledby="scale-slider"
          min={0.5}
          max={3}
          step={0.1}
          valueLabelDisplay="auto"
        />
      </div>
      <div className="barcode-display">
        {inputValue && isValidBarcode(inputValue) ? (
          <div className="barcode-wrapper">
            <Barcode value={inputValue} format={barcodeFormat} width={scale} height={50 * scale} />
            <Button
              variant="contained"
              color="primary"
              onClick={copyToClipboard}
              className="copy-button"
              startIcon={<Copy />}
            >
              Copiar Código
            </Button>
          </div>
        ) : (
          error && <Alert severity="error" className="error-message">{error}</Alert>
        )}
      </div>
      <Button
        variant="outlined"
        color="secondary"
        onClick={clearInput}
        className="clear-button"
        startIcon={<RefreshCcw />}
      >
        Limpar
      </Button>
    </div>
  );
}

export default BarcodeGenerator;
