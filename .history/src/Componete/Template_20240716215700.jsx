import React, { useRef, useState, useEffect } from 'react';
import ReactPrint from 'react-to-print';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { FaTimes, FaTrashAlt, FaMoneyBillAlt, FaEdit } from 'react-icons/fa';
import QRCode from 'qrcode.react';
import './Template.css';

function Template({ nomeCliente, NumeroDaFatura, data }) {
  const ref = useRef();
  const [abrirPopupProduto, setAbrirPopup] = useState(false);
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [lista, setLista] = useState([]);
  const [soma, setSoma] = useState(0);
  const [taxa, setTaxa] = useState(0);
  const [desconto, setDesconto] = useState(0);
  const [formaPagamento, setFormaPagamento] = useState('dinheiro');
  const [editIndex, setEditIndex] = useState(null);
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  useEffect(() => {
    const storedLista = JSON.parse(localStorage.getItem('produtos'));
    if (storedLista) {
      setLista(storedLista);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('produtos', JSON.stringify(lista));
    const total = lista.reduce(
      (acc, curr) => acc + curr.quantidade * curr.preco,
      0,
    );
    setSoma(total);
  }, [lista]);

  const adicionarDados = () => {
    const quantidadeNum = Number(quantidade);
    const precoNum = Number(preco);

    if (item && quantidadeNum > 0 && precoNum >= 0) {
      const novoProduto = {
        produto: item,
        quantidade: quantidadeNum,
        preco: precoNum,
      };

      if (editIndex !== null) {
        const updatedLista = lista.map((prod, index) =>
          index === editIndex ? novoProduto : prod,
        );
        setLista(updatedLista);
        setMensagemSucesso('Produto atualizado com sucesso!');
      } else {
        setLista((prevLista) => [...prevLista, novoProduto]);
        setMensagemSucesso('Produto adicionado com sucesso!');
      }
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
    setMensagemSucesso('');
  };

  const editarProduto = (index) => {
    const produtoEditado = lista[index];
    setItem(produtoEditado.produto);
    setQuantidade(produtoEditado.quantidade);
    setPreco(produtoEditado.preco);
    setEditIndex(index);
    setAbrirPopup(true);
  };

  const removerProduto = (index) => {
    setLista((prevLista) => prevLista.filter((_, i) => i !== index));
  };

  const calcularTotalComTaxa = () => {
    const total = soma + (soma * taxa) / 100;
    return total.toFixed(2);
  };

  const calcularTotalComDesconto = () => {
    const totalComTaxa = parseFloat(calcularTotalComTaxa());
    const totalFinal = totalComTaxa - (totalComTaxa * desconto) / 100;
    return totalFinal.toFixed(2);
  };

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

        <div className="tax-section">
          <strong>Taxa (%):</strong>
          <input
            type="number"
            value={taxa}
            onChange={(e) => setTaxa(e.target.value)}
            placeholder="0"
            min="0"
          />
        </div>

        <div className="discount-section">
          <strong>Desconto (%):</strong>
          <input
            type="number"
            value={desconto}
            onChange={(e) => setDesconto(e.target.value)}
            placeholder="0"
            min="0"
          />
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
                      onClick={() => editarProduto(index)}
                      className="edit-button"
                    >
                      <FaEdit /> Editar
                    </button>
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
            <tr>
              <td className="text-right" colSpan="3">
                <strong>Total com Taxa:</strong>
              </td>
              <td>
                <strong>R$ {calcularTotalComTaxa()}</strong>
              </td>
              <td></td>
            </tr>
            <tr>
              <td className="text-right" colSpan="3">
                <strong>Total com Desconto:</strong>
              </td>
              <td>
                <strong>R$ {calcularTotalComDesconto()}</strong>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>

        {mensagemSucesso && (
          <div className="success-message">{mensagemSucesso}</div>
        )}

        <div className="notes">
          <strong>Observações:</strong>
          <p>Termos e condições adicionais podem ser incluídos aqui.</p>
        </div>

        <div className="barcode-container">
          <strong>Código de Barras:</strong>
          <QRCode value={NumeroDaFatura} />
        </div>

        <div className="button-group">
          <ReactPrint
            trigger={() => <button className="print-button">Imprimir</button>}
            content={() => ref.current}
            documentTitle={`FATURA ${NumeroDaFatura}`}
          />
          <button
            onClick={() => {
              setAbrirPopup(true);
              resetFields();
            }}
            className="add-button"
          >
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
                {editIndex !== null ? 'Atualizar' : 'Adicionar'}
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Template;
