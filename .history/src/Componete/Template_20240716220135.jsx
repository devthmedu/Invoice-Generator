import React, { useRef, useState, useEffect } from 'react';
import ReactPrint from 'react-to-print';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { FaTimes, FaTrashAlt, FaMoneyBillAlt, FaEdit } from 'react-icons/fa';
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
  const [taxa, setTaxa] = useState(0);
  const [formaPagamento, setFormaPagamento] = useState('dinheiro');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    setLista(produtos);
    setSoma(total);
  }, [produtos, total]);

  const adicionarProduto = () => {
    if (item && quantidade && preco) {
      const novoProduto = {
        item,
        quantidade: Number(quantidade),
        preco: Number(preco),
      };
      if (editIndex !== null) {
        const listaAtualizada = lista.map((p, index) =>
          index === editIndex ? novoProduto : p,
        );
        setLista(listaAtualizada);
        setEditIndex(null);
      } else {
        setLista([...lista, novoProduto]);
      }
      setItem('');
      setQuantidade('');
      setPreco('');
      calcularTotal(lista);
    }
    setAbrirPopup(false);
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

  const salvarFatura = () => {
    // Salvar fatura em um banco de dados ou arquivo
  };

  return (
    <div ref={ref} className="pdf-container">
      <h1>Fatura</h1>
      <p>Cliente: {nomeCliente}</p>
      <p>Número da Fatura: {NumeroDaFatura}</p>
      <p>Data: {data}</p>
      <h2>Produtos</h2>
      <ul>
        {lista.map((p, index) => (
          <li key={index}>
            {p.quantidade} x {p.item} @ R${p.preco.toFixed(2)} = R$
            {(p.quantidade * p.preco).toFixed(2)}
            <button onClick={() => editarProduto(index)}>
              <FaEdit />
            </button>
            <button onClick={() => removerProduto(index)}>
              <FaTrashAlt />
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: R$ {soma.toFixed(2)}</h3>
      <h2>QR Code</h2>
      <QRCode value={`Fatura: ${NumeroDaFatura}`} />
      <h3>Forma de Pagamento: {formaPagamento}</h3>
      <button onClick={() => setAbrirPopup(true)}>Adicionar Produto</button>
      <ReactPrint
        trigger={() => <button>Imprimir</button>}
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
