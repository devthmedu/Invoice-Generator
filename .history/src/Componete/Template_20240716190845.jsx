import React, { useRef, useState, useEffect } from 'react';
import ReactPrint from 'react-to-print';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { FaTimes, FaPlus, FaPrint, FaInfoCircle } from 'react-icons/fa';
import './Template.css';

function Template(props) {
  const ref = useRef();
  const [abrirPopupProduto, setAbrirPopup] = useState(false);
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [lista, setLista] = useState([]);
  const [soma, setSoma] = useState(0);

  const adicionarDados = () => {
    if (!item || quantidade <= 0) {
      alert('Por favor, insira um produto e uma quantidade válida.');
      return;
    }
    setLista([...lista, { produto: item, quantidade }]);
    setItem('');
    setQuantidade(0);
    setAbrirPopup(false);
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
            <strong>Cliente:</strong> Nome do Cliente
          </p>
          <p>
            <strong>Email:</strong> email@exemplo.com
          </p>
          <p>
            <strong>Telefone:</strong> (XX) XXXX-XXXX
          </p>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>
                <h5>Produtos</h5>
              </th>
              <th>
                <h5>Quantidade</h5>
              </th>
            </tr>
          </thead>
          <tbody>
            {lista.length
              ? lista.map((itens, index) => (
                  <tr key={index}>
                    <td className="col-md-9">{itens.produto}</td>
                    <td className="col-md-3">R$ {itens.quantidade}</td>
                  </tr>
                ))
              : null}
            <tr>
              <td className="text-right">
                <p>
                  <strong>Valor Total:</strong>
                </p>
                <p>
                  <strong>Valor a Pagar:</strong>
                </p>
              </td>
              <td>
                <p>
                  <strong>R$ {soma}</strong>
                </p>
                <p>
                  <strong>R$ {soma}</strong>
                </p>
              </td>
            </tr>
            <tr style={{ color: '#F81D2D' }}>
              <td className="text-right">
                <h4>
                  <strong>Total:</strong>
                </h4>
              </td>
              <td className="text-left">
                <h4>
                  <strong>R$ {soma}</strong>
                </h4>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="notes">
          <strong>Observações:</strong>
          <p>Termos e condições adicionais podem ser incluídos aqui.</p>
        </div>

        <div className="actions">
          <ReactPrint
            trigger={() => (
              <button>
                <FaPrint /> Imprimir
              </button>
            )}
            content={() => ref.current}
            documentTitle={`FATURA ${props.NumeroDaFatura}`}
          />
          <button onClick={() => setAbrirPopup(true)}>
            <FaPlus /> Adicionar Produto
          </button>
        </div>
      </div>

      <Dialog open={abrirPopupProduto}>
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
              <button onClick={adicionarDados}>Adicionar</button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Template;
