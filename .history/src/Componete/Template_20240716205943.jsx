import React, { useRef, useState, useEffect } from 'react';
import ReactPrint from 'react-to-print';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { FaTimes, FaTrashAlt, FaMoneyBillAlt } from 'react-icons/fa';
import QRCode from 'qrcode.react'; // Para gerar o código de barras
import './Template.css';

function Template({ nomeCliente, NumeroDaFatura, data }) {
  const ref = useRef();
  const [abrirPopupProduto, setAbrirPopup] = useState(false);
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [lista, setLista] = useState([]);
  const [soma, setSoma] = useState(0);
  const [formaPagamento, setFormaPagamento] = useState('dinheiro');

  const adicionarDados = () => {
    const quantidadeNum = Number(quantidade);
    const precoNum = Number(preco);

    if (item && quantidadeNum > 0 && precoNum >= 0) {
      const novoProduto = {
        produto: item,
        quantidade: quantidadeNum,
        preco: precoNum,
      };
      setLista((prevLista) => [...prevLista, novoProduto]);
      resetFields();
      setAbrirPopup(false);
    } else {
      alert('Por favor, insira um produto válido, quantidade e preço.');
    }
  };

  const resetFields = () => {
    setItem('');
    setQuantidade('');
    setPreco('');
  };

  const removerProduto = (index) => {
    setLista((prevLista) => prevLista.filter((_, i) => i !== index));
  };

  useEffect(() => {
    const total = lista.reduce(
      (acc, curr) => acc + curr.quantidade * curr.preco,
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
            <strong>Cliente:</strong> {nomeCliente}
          </p>
          <p>
            <strong>Número da Fatura:</strong> {NumeroDaFatura}
          </p>
          <p>
            <strong>Data:</strong> {data}
          </p>
        </div>

        <div className="payment-method">
          <strong>Método de Pagamento:</strong>
          <select
            value={formaPagamento}
            onChange={(e) => setFormaPagamento(e.target.value)}
          >
            <option value="dinheiro">Dinheiro</option>
            <option value="cartao">Cartão de Crédito</option>
            <option value="pix">Pix</option>
          </select>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Total</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {lista.length > 0 ? (
              lista.map((item, index) => (
                <tr key={index}>
                  <td>
                    <FaMoneyBillAlt /> {item.produto}
                  </td>
                  <td>{item.quantidade}</td>
                  <td>R$ {item.preco.toFixed(2)}</td>
                  <td>R$ {(item.quantidade * item.preco).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => removerProduto(index)}
                      className="remove-button"
                    >
                      <FaTrashAlt /> Remover
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>
                  Nenhum produto adicionado
                </td>
              </tr>
            )}
            <tr>
              <td className="text-right" colSpan="3">
                <strong>Valor Total:</strong>
              </td>
              <td>
                <strong>R$ {soma.toFixed(2)}</strong>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>

        <div className="notes">
          <strong>Observações:</strong>
          <p>Termos e condições adicionais podem ser incluídos aqui.</p>
        </div>

        <div className="barcode-container">
          <strong>Código de Barras:</strong>
          <QRCode value={NumeroDaFatura} /> {/* Geração do código de barras */}
        </div>

        <div className="button-group">
          <ReactPrint
            trigger={() => <button className="print-button">Imprimir</button>}
            content={() => ref.current}
            documentTitle={`FATURA ${NumeroDaFatura}`}
          />
          <button onClick={() => setAbrirPopup(true)} className="add-button">
            Adicionar Produto
          </button>
        </div>
      </div>

      <Dialog open={abrirPopupProduto} onClose={() => setAbrirPopup(false)}>
        <DialogTitle>
          <div className="dialog-title">
            <div className="hed">Novo Produto</div>
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
                required
              />
              <input
                type="number"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                placeholder="Quantidade"
                required
                min="1"
              />
              <input
                type="number"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                placeholder="Preço"
                required
                min="0"
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
