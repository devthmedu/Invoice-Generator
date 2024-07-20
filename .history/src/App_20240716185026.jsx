import React, { useState, useEffect } from 'react';
import './App.css';
import TemplatePdf from './Componete/Template';
import { FaArrowRight } from 'react-icons/fa';
import { toast } from 'react-toastify';

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
    if (!numeroDaFatura.match(/^[0-9]+$/)) {
      toast.error('Por favor, insira um número de fatura válido.');
      return;
    }
    toast.success('Fatura criada com sucesso!');
    setVisualizar(false);
  };

  return (
    <>
      {visualizar ? (
        <div className="containers">
          <div className="form">
            <div className="inputs">
              <input
                type="text"
                placeholder="Número da Fatura"
                value={numeroDaFatura}
                onChange={(e) => setNumeroDaFatura(e.target.value)}
              />
            </div>
            <div className="buttons">
              <button onClick={criar}>
                Criar <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <TemplatePdf NumeroDaFatura={numeroDaFatura} data={data} />
      )}
    </>
  );
}

export default App;
