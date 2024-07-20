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
      setLista([...lista, { produto: item, quantidade: quantidade }]);
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
        <h1>Fatura</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
            </tr>
          </thead>
          <tbody>
            {lista.length ? (
              lista.map((item, index) => (
                <tr key={index}>
                  <td>{item.produto}</td>
                  <td>₹ {item.quantidade}</td>
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
              <td>₹ {soma}</td>
            </tr>
            <tr style={{ color: '#F81D2D' }}>
              <td className="text-right">
                <h4>
                  <strong>Total:</strong>
                </h4>
              </td>
              <td>
                <h4>
                  <strong>₹ {soma}</strong>
                </h4>
              </td>
            </tr>
          </tbody>
        </table>

        <ReactPrint
          trigger={() => <button className="print-button">Imprimir</button>}
          content={() => ref.current}
          documentTitle={`FATURA ${props.NumeroDaFatura}`}
        />

        <button
          className="add-product-button"
          onClick={() => setAbrirPopup(true)}
        >
          Adicionar Produto
        </button>

        <Dialog open={abrirPopupProduto} onClose={() => setAbrirPopup(false)}>
          <DialogTitle>
            <div className="dialog-title">
              <span>Novo Produto</span>
              <FaTimes
                className="icon-cross"
                onClick={() => setAbrirPopup(false)}
              />
            </div>
          </DialogTitle>
          <DialogContent>
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
              <button onClick={adicionarDados}>Adicionar</button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default Template;
