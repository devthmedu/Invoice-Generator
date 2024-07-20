import React, { useState, useEffect } from 'react';
import './App.css';
import TemplatePdf from './Componete/Template';
import Barcode from 'react-barcode';
import { FaArrowRight, FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import logo from '/logo.png';
import jsPDF from 'jspdf'; // Importando jsPDF
import Modal from 'react-modal'; // Importando Modal

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
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [historicoFaturas, setHistoricoFaturas] = useState(
    JSON.parse(localStorage.getItem('historicoFaturas')) || [],
  );

  useEffect(() => {
    const atual = new Date();
    const dataFormatada = `${String(atual.getDate()).padStart(2, '0')}/${String(
      atual.getMonth() + 1,
    ).padStart(2, '0')}/${atual.getFullYear()}`;
    setData(dataFormatada);

    const storedData = JSON.parse(localStorage.getItem('invoiceData'));
    if (storedData) {
      setNumeroDaFatura(storedData.numeroDaFatura);
      setNomeCliente(storedData.nomeCliente);
      setProdutos(storedData.produtos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'invoiceData',
      JSON.stringify({ numeroDaFatura, nomeCliente, produtos }),
    );
  }, [numeroDaFatura, nomeCliente, produtos]);

  const validarEntrada = () => {
    let isValid = true;
    if (!numeroDaFatura.match(/^[0-9]+$/)) {
      handleError('Por favor, insira um número de fatura válido.');
      isValid = false;
    }
    if (!nomeCliente) {
      handleError('Por favor, insira o nome do cliente.');
      isValid = false;
    }
    return isValid;
  };

  const handleError = (message) => {
    setErrorMessage(message);
    setErrorModalOpen(true);
  };

  const criarFatura = () => {
    if (!validarEntrada()) return;

    setLoading(true);
    setTimeout(() => {
      toast.success('Fatura criada com sucesso!');
      setLoading(false);
      setVisualizar(false);

      // Adiciona nova fatura ao histórico
      const novaFatura = { numeroDaFatura, nomeCliente, produtos };
      setHistoricoFaturas([...historicoFaturas, novaFatura]);
      localStorage.setItem(
        'historicoFaturas',
        JSON.stringify([...historicoFaturas, novaFatura]),
      );
    }, 500);
  };

  const validarEntradaProduto = () => {
    if (!produto) {
      toast.error('Por favor, insira o nome do produto.');
      return false;
    }
    if (quantidade <= 0) {
      toast.error('Quantidade deve ser maior que zero.');
      return false;
    }
    if (preco <= 0) {
      toast.error('Preço deve ser maior que zero.');
      return false;
    }
    return true;
  };

  const adicionarProduto = () => {
    if (validarEntradaProduto()) {
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
    localStorage.removeItem('invoiceData');
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text(`Fatura: ${numeroDaFatura}`, 10, 10);
    doc.text(`Cliente: ${nomeCliente}`, 10, 20);
    doc.text(`Data: ${data}`, 10, 30);
    produtos.forEach((item, index) => {
      doc.text(
        `${item.quantidade} x ${item.produto} @ R$${item.preco.toFixed(
          2,
        )} = R$${(item.quantidade * item.preco).toFixed(2)}`,
        10,
        40 + index * 10,
      );
    });
    doc.text(
      `Total: R$ ${totalFatura.toFixed(2)}`,
      10,
      40 + produtos.length * 10,
    );
    doc.save('fatura.pdf');
  };

  return (
    <>
      <ToastContainer />
      <Modal
        isOpen={isErrorModalOpen}
        onRequestClose={() => setErrorModalOpen(false)}
      >
        <h2>Erro</h2>
        <p>{errorMessage}</p>
        <button onClick={() => setErrorModalOpen(false)}>Fechar</button>
      </Modal>
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
          <button onClick={exportarPDF} className="export-button">
            Exportar PDF
          </button>
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
