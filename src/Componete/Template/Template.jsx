import React, { useRef, useState, useEffect } from 'react';
import ReactPrint from 'react-to-print';
import { Dialog, DialogTitle, DialogContent, IconButton, Button } from '@mui/material';
import { X, Trash2, Edit2, Save, Eye } from 'lucide-react'; // Importando ícones
import QRCode from 'qrcode.react';
import ProductForm from '../ProductForm/ProductForm'; // Importando o componente ProductForm
import './Template.css';

const Template = ({
  nomeCliente,
  numeroDaFatura,
  data,
  produtos,
  total,
  vencimento,
  formaPagamento,
  cpf,
}) => {
  const ref = useRef();
  const [abrirPopupProduto, setAbrirPopup] = useState(false);
  const [produto, setProduto] = useState('');
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
    if (produto && quantidade && preco) {
      const novoProduto = {
        item: produto,
        quantidade: Number(quantidade),
        preco: Number(preco),
      };
      const listaAtualizada =
        editIndex !== null
          ? lista.map((p, index) => (index === editIndex ? novoProduto : p))
          : [...lista, novoProduto];

      setLista(listaAtualizada);
      setEditIndex(null);
      setProduto('');
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
    setProduto(produtoEditado.item);
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
      <header className="pdf-header">
        <h1>Informações da Fatura</h1>
        <div className="pdf-info">
          <p><strong>Cliente:</strong> {nomeCliente}</p>
          <p><strong>Número da Fatura:</strong> {numeroDaFatura}</p>
          <p><strong>Data:</strong> {data}</p>
          <p><strong>Vencimento:</strong> {vencimento}</p>
          <p><strong>Forma de Pagamento:</strong> {formaPagamento}</p>
          <p><strong>CPF:</strong> {cpf}</p>
        </div>
      </header>

      <section className="pdf-products">
        <h2>Produtos</h2>
        <ul className="product-list">
          {lista.map((p, index) => (
            <li key={index} className="product-item">
              <span>
                {p.quantidade} x {p.item} @ R${p.preco.toFixed(2)} = R$ {(p.quantidade * p.preco).toFixed(2)}
              </span>
              <div className="action-buttons">
                <IconButton onClick={() => editarProduto(index)} color="primary" size="small" aria-label="Editar produto">
                  <Edit2 size={16} />
                </IconButton>
                <IconButton onClick={() => removerProduto(index)} color="secondary" size="small" aria-label="Remover produto">
                  <Trash2 size={16} />
                </IconButton>
                <IconButton onClick={() => alert(`Visualizando detalhes de ${p.item}`)} size="small" aria-label="Visualizar detalhes">
                  <Eye size={16} />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
        <h3>Total: R$ {soma.toFixed(2)}</h3>
      </section>

      <section className="pdf-qr">
        <h2>QR Code</h2>
        <QRCode value={`Fatura: ${numeroDaFatura}`} />
      </section>

      <Button
        onClick={() => setAbrirPopup(true)}
        variant="contained"
        color="primary"
        className="add-product-button"
        startIcon={<Save />}
        aria-label="Adicionar produto"
      >
        Adicionar Produto
      </Button>

      <ReactPrint
        trigger={() => <Button variant="contained" color="success" className="print-button">Imprimir</Button>}
        content={() => ref.current}
      />

      <Dialog open={abrirPopupProduto} onClose={() => setAbrirPopup(false)}>
        <DialogTitle>
          Adicionar Produto
          <IconButton onClick={() => setAbrirPopup(false)} size="small" color="error" aria-label="Fechar">
            <X size={16} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ProductForm
            produto={produto}
            quantidade={quantidade}
            preco={preco}
            setProduto={setProduto}
            setQuantidade={setQuantidade}
            setPreco={setPreco}
            adicionarProduto={adicionarProduto}
            editIndex={editIndex}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Template;
