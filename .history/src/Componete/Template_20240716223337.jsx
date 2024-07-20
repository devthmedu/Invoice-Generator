import React, { useRef, useState, useEffect } from 'react';
import ReactPrint from 'react-to-print';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { FaTimes, FaTrashAlt, FaEdit } from 'react-icons/fa';
import QRCode from 'qrcode.react';
import './Template.css';

function Template({ nomeCliente, NumeroDaFatura, data, produtos, total }) {
  const ref = useRef();
  const [abrirPopupProduto, setAbrirPopup] = useState(false);
  const [item, setItem] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');
  const [lista, setLista] = useState(produtos);
  const [soma, setSoma] = useState(total);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    setLista(produtos);
    calcularTotal(produtos);
  }, [produtos]);

  const adicionarProduto = () => {
    if (item && quantidade && preco) {
      const novoProduto = {
        item,
        quantidade: Number(quantidade),
        preco: Number(preco),
      };
      const listaAtualizada =
        editIndex !== null
          ? lista.map((p, index) => (index === editIndex ? novoProduto : p))
          : [...lista, novoProduto];

      setLista(listaAtualizada);
      setEditIndex(null);
      setItem('');
      setQuantidade('');
      setPreco('');
      calcularTotal(listaAtualizada);
      setAbrirPopup(false);
    }
  };

  const calcularTotal = (produtos) => {
    const total = produtos.reduce((acc, p) => acc + p.quantidade * p.preco, 0);
    setSoma(total);
  };

  const editarProduto = (index) => {
    const produtoEditado = lista[index];
    setItem(produtoEditado.item);
    setQuantidade(produtoEditado.quantidade);
    setPreco(produtoEditado.preco);
    setEditIndex(index);
    setAbrirPopup(true);
  };

  const removerProduto = (index) => {
    const listaAtualizada = lista.filter((_, i) => i !== index);
    setLista(listaAtualizada);
    calcularTotal(listaAtualizada);
  };

  return (
    <div ref={ref} className="pdf-container">
      <img src="/public/logo.png" alt="Logo" className="pdf-logo" />
      <h1>Fatura</h1>
      <p>
        <strong>Cliente:</strong> {nomeCliente}
      </p>
      <p>
        <strong>Número da Fatura:</strong> {NumeroDaFatura}
      </p>
      <p>
        <strong>Data:</strong> {data}
      </p>

      <h2>Produtos</h2>
      <ul className="product-list">
        {lista.map((p, index) => (
          <li key={index}>
            <span>
              {p.quantidade} x {p.item} @ R${p.preco.toFixed(2)} = R${' '}
              {(p.quantidade * p.preco).toFixed(2)}
            </span>
            <div>
              <button onClick={() => editarProduto(index)}>
                <FaEdit />
              </button>
              <button onClick={() => removerProduto(index)}>
                <FaTrashAlt />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h3>Total: R$ {soma.toFixed(2)}</h3>
      <h2>QR Code</h2>
      <QRCode value={`Fatura: ${NumeroDaFatura}`} />

      <button
        onClick={() => setAbrirPopup(true)}
        className="add-product-button"
      >
        Adicionar Produto
      </button>
      <ReactPrint
        trigger={() => <button className="print-button">Imprimir</button>}
        content={() => ref.current}
      />

      <Dialog open={abrirPopupProduto} onClose={() => setAbrirPopup(false)}>
        <DialogTitle>
          Adicionar Produto
          <FaTimes onClick={() => setAbrirPopup(false)} />
        </DialogTitle>
        <DialogContent>
          <input
            type="text"
            placeholder="Produto"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />
          <input
            type="number"
            placeholder="Preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
          <button onClick={adicionarProduto}>Salvar</button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Template;
