import React, { useRef, useState, useEffect } from 'react';
import ReactPrint from 'react-to-print';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import './Template.css';

function Template(props) {
  const ref = useRef();
  const [abrirPopupProduto, setAbrirPopup] = useState(false);
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [lista, setLista] = useState([]);
  const [soma, setSoma] = useState(0);

  const adicionarDados = () => {
    if (item && quantidade > 0) {
      setLista([...lista, { produto: item, quantidade }]);
      setItem('');
      setQuantidade(0);
      setAbrirPopup(false);
    }
  };

  useEffect(() => {
    const total = lista.reduce(
      (acc, curr) => acc + parseInt(curr.quantidade),
      0,
    );
    setSoma(total);
  }, [lista]);

  return (
    <>
      <div className="container" ref={ref}>
        <div className="logo">
          <img src="logo.png" alt="Logo" />
        </div>
        <h1>Fatura</h1>
        <div className="client-info">
          <p>
            <strong>Cliente:</strong> {props.nomeCliente}
          </p>
          <p>
            <strong>Número da Fatura:</strong> {props.NumeroDaFatura}
          </p>
          <p>
            <strong>Data:</strong> {props.data}
          </p>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {lista.length ? (
              lista.map((itens, index) => (
                <tr key={index}>
                  <td>{itens.produto}</td>
                  <td>R$ {itens.quantidade}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: 'center' }}>
                  Nenhum produto adicionado
                </td>
              </tr>
            )}
            <tr>
              <td className="text-right">
                <strong>Valor Total:</strong>
              </td>
              <td>
                <strong>R$ {soma}</strong>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="notes">
          <strong>Observações:</strong>
          <p>Termos e condições adicionais podem ser incluídos aqui.</p>
        </div>
      </div>

      <ReactPrint
        trigger={() => <button className="print-button">Imprimir</button>}
        content={() => ref.current}
        documentTitle={`FATURA ${props.NumeroDaFatura}`}
      />

      <button onClick={() => setAbrirPopup(true)} className="add-button">
        Adicionar Produto
      </button>

      <Dialog open={abrirPopupProduto} onClose={() => setAbrirPopup(false)}>
        <DialogTitle>
          <div className="dialog-title">
            <div className="hed">Novo produto</div>
            <div className="icon-cross" onClick={() => setAbrirPopup(false)}>
              <FaTimes />
            </div>
          </div>
        </DialogTitle>

        <DialogContent>
          <div className="container">
            <div className="forms">
              <input
                type="text"
                value={item}
                onChange={(e) => setItem(e.target.value)}
                placeholder="Nome do Produto"
              />
              <input
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                placeholder="Quantidade"
              />
            </div>
            <div className="buttons">
              <button onClick={adicionarDados} className="add-button">
                Adicionar
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Template;
