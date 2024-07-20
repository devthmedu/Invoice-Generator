import React, { useState, useEffect } from 'react';
import './App.css';
import TemplatePdf from './Componete/Template';

function App() {
  const [numeroDaFatura, setNumeroDaFatura] = useState('');
  const [data, setData] = useState('');
  const [visualizar, setVisualizar] = useState(true);

  useEffect(() => {
    const atual = new Date();
    const formattedDate = `${atual.getDate()}/${atual.getMonth() +
      1}/${atual.getFullYear()}`;
    console.log(`A data é ${formattedDate}`);
    setData(formattedDate);
  }, []);

  const criar = () => {
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
              <button onClick={criar}>Criar ➡️</button>
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
