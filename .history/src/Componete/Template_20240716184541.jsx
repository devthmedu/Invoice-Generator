import React, { useRef, useState, useEffect } from 'react';
import ReactPrint from 'react-to-print';
import Barcode from 'react-barcode';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { FaTimes } from 'react-icons/fa'; 
import './Template.css' 

function Template(props) {
  const ref = useRef();
  const [abrirPopupProduto, setAbrirPopup] = useState(false);
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [lista, setLista] = useState([]);
  const [soma, setSoma] = useState(0);

  const adicionarDados = () => {
    setLista([...lista, { produto: item, quantidade: quantidade }]);
    console.log(lista);
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
    console.log(`A Soma é = ${total}`);
  }, [lista]);

  return (
    <>
      <div className="container" ref={ref}>
        {/* ... Your content here ... */}
        <div>
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
                      <td className="col-md-3">
                        <i className="fas fa-rupee-sign" aria-hidden="true"></i>{' '}
                        ₹ {itens.quantidade}
                      </td>
                    </tr>
                  ))
                : null}
              <tr>
                <td className="text-right">
                  <p>
                    <strong>Valor Total: </strong>
                  </p>
                  <p>
                    <strong>Valor a Pagar: </strong>
                  </p>
                </td>
                <td>
                  <p>
                    <strong>
                      <i className="fas fa-rupee-sign" aria-hidden="true"></i> ₹{' '}
                      {soma}
                    </strong>
                  </p>
                  <p>
                    <strong>
                      <i className="fas fa-rupee-sign" aria-hidden="true"></i> ₹{' '}
                      {soma}
                    </strong>
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
                    <strong>
                      <i className="fas fa-rupee-sign" aria-hidden="true"></i> ₹{' '}
                      {soma}
                    </strong>
                  </h4>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <ReactPrint
        trigger={() => <button>Imprimir</button>}
        content={() => ref.current}
        documentTitle={`FATURA ${props.NumeroDaFatura}`}
      />

      <button onClick={() => setAbrirPopup(true)}>Adicionar Produto</button>

      <Dialog open={abrirPopupProduto}>
        <DialogTitle>
          <div className="title">
            <div className="hed">Novo produto</div>
            <div className="icon-cross" onClick={() => setAbrirPopup(false)}>
              <FaTimes /> {/* Usando o ícone de fechar */}
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
