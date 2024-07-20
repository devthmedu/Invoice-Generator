import React, { useState, useEffect } from 'react';
import './App.css';
import TemplatePdf from './Componete/Template';
import Barcode from 'react-barcode';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import logo from '/logo.png'; 

function App() {
  const [numeroDaFatura, setNumeroDaFatura] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [data, setData] = useState('');
  const [visualizar, setVisualizar] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const atual = new Date();
    const dataFormatada = `${String(atual.getDate()).padStart(2, '0')}/${String(
      atual.getMonth() + 1,
    ).padStart(2, '0')}/${atual.getFullYear()}`;
    setData(dataFormatada);
  }, []);

  const criar = () => {
    if (!numeroDaFatura.match(/^[0-9]+$/)) {
      toast.error('Por favor, insira um número de fatura válido.');
      return;
    }
    if (!nomeCliente) {
      toast.error('Por favor, insira o nome do cliente.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success('Fatura criada com sucesso!');
      setLoading(false);
      setVisualizar(false);
    }, 500);
  };

  const voltar = () => {
    setVisualizar(true);
    setNumeroDaFatura('');
    setNomeCliente('');
  };

  return (
    <>
      {visualizar ? (
        <div className="container">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="title">Gerador de Fatura</h1>
          <div className="form">
            <div className="inputs">
              <input
                type="text"
                placeholder="Nome do Cliente"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                disabled={loading}
                className="input-field"
                required
              />
              <input
                type="text"
                placeholder="Número da Fatura"
                value={numeroDaFatura}
                onChange={(e) => setNumeroDaFatura(e.target.value)}
                disabled={loading}
                className="input-field"
                required
              />
            </div>
            <div className="buttons">
              <button
                onClick={criar}
                disabled={loading}
                className="submit-button"
                title={
                  loading
                    ? 'Aguarde enquanto a fatura é criada'
                    : 'Criar fatura'
                }
              >
                {loading ? 'Criando...' : 'Criar'} <FaArrowRight />
              </button>
            </div>
          </div>
          {numeroDaFatura && (
            <div className="barcode-container">
              <h2>Código de Barras:</h2>
              <Barcode value={numeroDaFatura} />
            </div>
          )}
        </div>
      ) : (
        <div className="pdf-container">
          <TemplatePdf
            NumeroDaFatura={numeroDaFatura}
            data={data}
            nomeCliente={nomeCliente}
          />
          <button onClick={voltar} className="back-button">
            Voltar <FaArrowLeft />
          </button>
        </div>
      )}
    </>
  );
}

export default App;
