import React, { useState, useEffect } from 'react';
import './App.css';
import TemplatePdf from './Componete/Template';
import { FaArrowRight } from 'react-icons/fa';

function App() {
  const [numeroDaFatura, setNumeroDaFatura] = useState('');
  const [data, setData] = useState('');
  const [visualizar, setVisualizar] = useState(true);

  useEffect(() => {
    const atual = new Date();
    const dataFormatada = `${atual.getDate()}/${atual.getMonth() +
      1}/${atual.getFullYear()}`;
    setData(dataFormatada);
  }, []);

  const criar = () => {
    if (numeroDaFatura.trim()) {
      setVisualizar(false);
    } else {
      alert('Por favor, insira um número de fatura válido.');
    }
  };

  return (
    <>
      {visualizar ? (
        <div className="container">
          <h1>Criar Fatura</h1>
          <div className="form">
            <input
              type="text"
              placeholder="Número da Fatura"
              value={numeroDaFatura}
              onChange={(e) => setNumeroDaFatura(e.target.value)}
              className="input-field"
            />
            <button onClick={criar} className="create-button">
              Criar <FaArrowRight />
            </button>
          </div>
        </div>
      ) : (
        <TemplatePdf NumeroDaFatura={numeroDaFatura} data={data} />
      )}
    </>
  );
}

export default App;
