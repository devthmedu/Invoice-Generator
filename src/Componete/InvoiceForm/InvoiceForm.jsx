import React, { useState, useEffect } from 'react';
import Barcode from 'react-barcode';
import './InvoiceForm.css';

const InvoiceForm = ({ numeroDaFatura, nomeCliente, cpfCliente, setNumeroDaFatura, setNomeCliente, setCpfCliente, loading }) => {
  const [dataEmissao, setDataEmissao] = useState(new Date());
  const [dataVencimento, setDataVencimento] = useState('');

  const calcularDataVencimento = (emissao) => {
    const vencimento = new Date(emissao);
    vencimento.setDate(vencimento.getDate() + 15);
    return vencimento.toISOString().split('T')[0];
  };

  useEffect(() => {
    setDataVencimento(calcularDataVencimento(dataEmissao));
  }, [dataEmissao]);

  return (
    <div className="invoice-form">
      <h2 className="form-title">Preencha os Dados da Fatura</h2>
      <div className="form-group">
        <label htmlFor="nomeCliente" className="form-label">Nome do Cliente</label>
        <input
          id="nomeCliente"
          type="text"
          placeholder="Digite o nome do cliente"
          value={nomeCliente}
          onChange={(e) => setNomeCliente(e.target.value)}
          disabled={loading}
          className="invoice-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="cpfCliente" className="form-label">CPF do Cliente</label>
        <input
          id="cpfCliente"
          type="text"
          placeholder="Digite o CPF do cliente"
          value={cpfCliente}
          onChange={(e) => setCpfCliente(e.target.value)}
          disabled={loading}
          className="invoice-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="numeroDaFatura" className="form-label">Número da Fatura</label>
        <input
          id="numeroDaFatura"
          type="text"
          placeholder="Digite o número da fatura"
          value={numeroDaFatura}
          onChange={(e) => setNumeroDaFatura(e.target.value)}
          disabled={loading}
          className="invoice-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="dataEmissao" className="form-label">Data de Emissão</label>
        <input
          id="dataEmissao"
          type="date"
          value={dataEmissao.toISOString().split('T')[0]}
          onChange={(e) => setDataEmissao(new Date(e.target.value))}
          disabled={loading}
          className="invoice-input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="dataVencimento" className="form-label">Data de Vencimento</label>
        <input
          id="dataVencimento"
          type="text"
          value={dataVencimento}
          disabled
          className="invoice-input"
        />
      </div>
      
      {loading && <p className="loading-message">Carregando...</p>}
    </div>
  );
};

export default InvoiceForm;
