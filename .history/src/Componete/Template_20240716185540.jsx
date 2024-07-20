import React, { useRef, useState, useEffect } from 'react';
import ReactPrint from 'react-to-print';
import Barcode from 'react-barcode';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import './Template.css';
import { toast } from 'react-toastify';
import html2pdf from 'html2pdf.js';

function Template(props) {
  const ref = useRef();
  const [abrirPopupProduto, setAbrirPopup] = useState(false);
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState(0);
  const [lista, setLista] = useState([]);
  const [soma, setSoma] = useState(0);
  const [imposto, setImposto] = useState(0);
  const [desconto, setDesconto] = useState(0);

  const adicionarDados = () => {
    if (quantidade <= 0) {
      toast.error('A quantidade deve ser um número positivo.');
      return;
    }
    const novaLista = [...lista, { produto: item, quantidade }];
    setLista(novaLista);
    localStorage.setItem('faturas', JSON.stringify(novaLista));
    setItem('');
    setQuantidade(0);
    setAbrirPopup(false);
    calcularTotal();
  };

  useEffect(() => {
    const total = lista.reduce(
      (acc, curr) => acc + parseInt(curr.quantidade),
      0,
    );
    setSoma(total);
  }, [lista]);

  const calcularTotal = () => {
    return soma + (soma * imposto) / 100 - desconto;
  };

  const downloadPdf = () => {
    const element = ref.current;
    html2pdf()
      .from(element)
      .save(`fatura_${props.NumeroDaFatura}.pdf`);
  };

  return (
    <>
      <div className="container" ref={ref}>
        <h1>Fatura #{props.NumeroDaFatura}</h1>
        <p>Data: {props.data}</p>
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
                      <td>{itens.produto}</td>
                      <td>
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
                      <i className="fas fa-rupee-sign" aria-hidden="true"></i>{' '}
                      R$ {soma}
                    </strong>
                  </p>
                  <p>
                    <strong>
                      <i className="fas fa-rupee-sign" aria-hidden="true"></i> R$ {' '}
                      R$ {calcularTotal()}
                    </strong>
                  </p>
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
      <button onClick={downloadPdf}>Download PDF</button>

      <Dialog open={abrirPopupProduto}>
        <DialogTitle>
          <div className="title">
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
