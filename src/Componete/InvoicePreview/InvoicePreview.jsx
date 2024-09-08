import React from 'react';
import PropTypes from 'prop-types';
import TemplatePdf from '../Template/Template';
import ActionButton from '../ActionButton/ActionButton';
import './InvoicePreview.css';

const PaymentOptions = () => (
  <div className="payment-options">
    <h4>Formas de Pagamento</h4>
    <div className="payment-methods">
      <div className="payment-method">
        <img src="path/to/pix-icon.png" alt="Pix" className="payment-icon" />
        <p>Pix</p>
      </div>
      <div className="payment-method">
        <img src="path/to/boleto-icon.png" alt="Boleto" className="payment-icon" />
        <p>Boleto</p>
      </div>
      <div className="payment-method">
        <img src="path/to/cartao-icon.png" alt="Cartão de Crédito" className="payment-icon" />
        <p>Cartão de Crédito</p>
      </div>
    </div>
  </div>
);

const InvoicePreview = ({ numeroDaFatura, data, nomeCliente, produtos, total, voltar }) => (
  <div className="invoice-preview">
    <header className="invoice-header">
      <h1>Pré-visualização da Fatura</h1>
      <div className="invoice-info">
        <h2>Fatura: {numeroDaFatura}</h2>
        <p>Data: {data}</p>
        <p>Cliente: {nomeCliente}</p>
      </div>
    </header>
    <div className="invoice-content">
      <TemplatePdf
        numeroDaFatura={numeroDaFatura}
        data={data}
        nomeCliente={nomeCliente}
        produtos={produtos}
        total={total}
      />
      <div className="invoice-summary">
        <h3>Total:</h3>
        <p>R$ {total.toFixed(2)}</p>
      </div>
    </div>
    <PaymentOptions />
    <ActionButton onClick={voltar} className="back-button">
      Voltar
    </ActionButton>
  </div>
);

InvoicePreview.propTypes = {
  numeroDaFatura: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired,
  nomeCliente: PropTypes.string.isRequired,
  produtos: PropTypes.arrayOf(
    PropTypes.shape({
      quantidade: PropTypes.number.isRequired,
      produto: PropTypes.string.isRequired,
      preco: PropTypes.number.isRequired,
    })
  ).isRequired,
  total: PropTypes.number.isRequired,
  voltar: PropTypes.func.isRequired,
};

export default InvoicePreview;
