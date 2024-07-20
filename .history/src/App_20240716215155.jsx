import React, { useState, useEffect } from 'react';
import './App.css';
import TemplatePdf from './Componete/Template';
import Barcode from 'react-barcode';
import { FaArrowRight, FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import logo from '/logo.png';

function App() {
  const [numeroDaFatura, setNumeroDaFatura] = useState('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [data, setData] = useState('');
  const [visualizar, setVisualizar] = useState(true);
  const [loading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [produto, setProduto] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [preco, setPreco] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const atual = new Date();
    const dataFormatada = `${String(atual.getDate()).padStart(2, '0')}/${String(
      atual.getMonth() + 1,
    ).padStart(2, '0')}/${atual.getFullYear()}`;
    setData(dataFormatada);

    // Load stored invoice data if available
    const storedData = JSON.parse(localStorage.getItem('invoiceData'));
    if (storedData) {
      setNumeroDaFatura(storedData.numeroDaFatura);
      setNomeCliente(storedData.nomeCliente);
      setProdutos(storedData.produtos);
    }
  }, []);

  useEffect(() => {
    // Save invoice data to local storage
    localStorage.setItem(
      'invoiceData',
      JSON.stringify({ numeroDaFatura, nomeCliente, produtos }),
    );
  }, [numeroDaFatura, nomeCliente, produtos]);

  const validarEntrada = () => {
    if (!numeroDaFatura.match(/^[0-9]+$/)) {
      toast.error('Por favor, insira um número de fatura válido.');
      return false;
    }
    if (!nomeCliente) {
      toast.error('Por favor, insira o nome do cliente.');
      return false;
    }
    return true;
  };

  const criarFatura = () => {
    if (!validarEntrada()) return;

    setLoading(true);
    setTimeout(() => {
      toast.success('Fatura criada com sucesso!');
      setLoading(false);
      setVisualizar(false);
    }, 500);
  };

  const adicionarProduto = () => {
    if (produto && quantidade > 0 && preco > 0) {
      const newProduto = {
        produto,
        quantidade: Number(quantidade),
        preco: Number(preco),
      };
      if (editIndex !== null) {
        const updatedProdutos = produtos.map((item, index) =>
          index === editIndex ? newProduto : item,
        );
        setProdutos(updatedProdutos);
        setEditIndex(null);
        toast.success('Produto atualizado com sucesso!');
      } else {
        setProdutos((prevProdutos) => [...prevProdutos, newProduto]);
        toast.success('Produto adicionado com sucesso!');
      }
      resetProdutoFields();
    } else {
      toast.error(
        'Por favor, insira um produto válido com quantidade e preço.',
      );
    }
  };

  const editarProduto = (index) => {
    const produtoEditado = produtos[index];
    setProduto(produtoEditado.produto);
    setQuantidade(produtoEditado.quantidade);
    setPreco(produtoEditado.preco);
    setEditIndex(index);
  };

  const removerProduto = (index) => {
    setProdutos(produtos.filter((_, i) => i !== index));
    toast.success('Produto removido com sucesso!');
  };

  const resetProdutoFields = () => {
    setProduto('');
    setQuantidade(1);
    setPreco('');
  };

  const totalFatura = produtos.reduce(
    (acc, curr) => acc + curr.quantidade * curr.preco,
    0,
  );

  const voltar = () => {
    setVisualizar(true);
    resetForm();
  };

  const resetForm = () => {
    setNumeroDaFatura('');
    setNomeCliente('');
    setProdutos([]);
    localStorage.removeItem('invoiceData'); // Clear local storage
  };

  return (
    <>
      {visualizar ? (
        <div className="container">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="title">Gerador de Fatura</h1>
          <div className="form">
            <div className="inputs">
              <input
                type="text"
                placeholder="Nome do Cliente"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                disabled={loading}
                className="input-field"
                required
              />
              <input
                type="text"
                placeholder="Número da Fatura"
                value={numeroDaFatura}
                onChange={(e) => setNumeroDaFatura(e.target.value)}
                disabled={loading}
                className="input-field"
                required
              />
            </div>
            <div className="product-form">
              <input
                type="text"
                placeholder="Produto"
                value={produto}
                onChange={(e) => setProduto(e.target.value)}
                className="input-field"
              />
              <input
                type="number"
                placeholder="Quantidade"
                value={quantidade}
                onChange={(e) => setQuantidade(e.target.value)}
                className="input-field"
                min="1"
              />
              <input
                type="number"
                placeholder="Preço"
                value={preco}
                onChange={(e) => setPreco(e.target.value)}
                className="input-field"
                min="0"
              />
              <button onClick={adicionarProduto} className="submit-button">
                {editIndex !== null ? 'Atualizar Produto' : 'Adicionar Produto'}
              </button>
            </div>
            <div className="buttons">
              <button
                onClick={criarFatura}
                disabled={loading}
                className="submit-button"
                title={
                  loading
                    ? 'Aguarde enquanto a fatura é criada'
                    : 'Criar fatura'
                }
              >
                {loading ? 'Criando...' : 'Criar Fatura'} <FaArrowRight />
              </button>
            </div>
          </div>
          <div className="barcode-container">
            <h2>Código de Barras:</h2>
            {numeroDaFatura && <Barcode value={numeroDaFatura} />}
          </div>
          <div className="product-list">
            <h3>Produtos Adicionados:</h3>
            <ul>
              {produtos.map((item, index) => (
                <li key={index}>
                  {item.quantidade} x {item.produto} @ R${' '}
                  {item.preco.toFixed(2)} = R${' '}
                  {(item.quantidade * item.preco).toFixed(2)}
                  <button onClick={() => editarProduto(index)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => removerProduto(index)}>
                    <FaTrash />
                  </button>
                </li>
              ))}
            </ul>
            <h3>Total: R$ {totalFatura.toFixed(2)}</h3>
          </div>
        </div>
      ) : (
        <div className="pdf-container">
          <TemplatePdf
            NumeroDaFatura={numeroDaFatura}
            data={data}
            nomeCliente={nomeCliente}
            produtos={produtos}
            total={totalFatura}
          />
          <button onClick={voltar} className="back-button">
            Voltar <FaArrowLeft />
          </button>
        </div>
      )}
    </>
  );
}

export default App;
