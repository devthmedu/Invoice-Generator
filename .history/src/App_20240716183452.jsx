import React, { useState, useEffect } from 'react';
import './App.css';
import TemplatePdf from './Componete/Template';

function App() {
  const [NumeroDaFatura, setNumeroDaFatura] = useState('');
  const [Datas, setDatas] = useState('');
  const [visualizar, setVisualizar] = useState(true);

  let novaData = new Date();
  let dia = novaData.getDate();

  const numeros = [
    {
      produto: 'dsdsd',
      quantidade: '23782',
    },
    {
      produto: 'dsd',
      quantidade: '993',
    },
    {
      produto: 'dssdffedfdsd',
      quantidade: '623',
    },
  ];

  useEffect(() => {
    const atual = new Date();
    const data = `${atual.getDate()}/${atual.getMonth() +
      1}/${atual.getFullYear()}`;
    console.log(`A data é ${data}`);
    setDatas(data);
  }, []);

  const Criar = () => {
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
                value={NumeroDaFatura}
                onChange={(e) => setNumeroDaFatura(e.target.value)}
              />
            </div>
            <div className="buttons">
              <button onClick={Criar}>Criar ➡️</button>
            </div>
          </div>
        </div>
      ) : (
        <TemplatePdf NumeroDaFatura={NumeroDaFatura} data={Datas} />
      )}
    </>
  );
}

export default App;
