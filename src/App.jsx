import React, { useState, useEffect } from 'react';
import './App.css';
import InvoiceForm from './Componete/InvoiceForm/InvoiceForm';
import ProductForm from './Componete/ProductForm/ProductForm';
import ProductList from './Componete/ProductList/ProductList';
import BarcodeDisplay from './Componete/BarcodeDisplay/BarcodeDisplay';
import InvoicePreview from './Componete/InvoicePreview/InvoicePreview';
import ActionButton from './Componete/ActionButton/ActionButton';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '/favicon.svg';
import { FaArrowRight } from 'react-icons/fa';

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

  return (
    <>
      <ToastContainer />
      {visualizar ? (
        <div className="container">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="title">Gerador de Fatura</h1>
          <InvoiceForm
            numeroDaFatura={numeroDaFatura}
            nomeCliente={nomeCliente}
            setNumeroDaFatura={setNumeroDaFatura}
            setNomeCliente={setNomeCliente}
            loading={loading}
          />
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
          <ProductList
            produtos={produtos}
            editarProduto={editarProduto}
            removerProduto={removerProduto}
          />
          <BarcodeDisplay numeroDaFatura={numeroDaFatura} />
          <div className="buttons">
            <ActionButton
              onClick={criarFatura}
              disabled={loading}
              title={
                loading
                  ? 'Aguarde enquanto a fatura é criada'
                  : 'Criar fatura'
              }
            >
              {loading ? 'Criando...' : 'Criar Fatura'} <FaArrowRight />
            </ActionButton>
          </div>
        </div>
      ) : (
        <InvoicePreview
          numeroDaFatura={numeroDaFatura}
          data={data}
          nomeCliente={nomeCliente}
          produtos={produtos}
          total={totalFatura}
          voltar={voltar}
        />
      )}
    </>
  );
}

export default App;
