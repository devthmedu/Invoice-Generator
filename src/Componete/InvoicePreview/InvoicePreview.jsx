import React from 'react';
import PropTypes from 'prop-types';
import TemplatePdf from '../Template/Template';
import ActionButton from '../ActionButton/ActionButton';
import './InvoicePreview'; // Certifique-se de que o caminho está correto

const PaymentOptions = () => (
  <section className="payment-options" aria-labelledby="payment-options-heading">
    <h4 id="payment-options-heading">Formas de Pagamento</h4>
    <div className="payment-methods">
      <div className="payment-method" role="listitem">
        <img src="/public/Pix.svg" alt="Pix - Pagamento via QR Code" className="payment-icon" />
      </div>
      <div className="payment-method" role="listitem">
        <img src="/public/boleto.svg" alt="Boleto Bancário - Pagamento via boleto" className="payment-icon" />
      </div>
      <div className="payment-method" role="listitem">
        <img src="/public/credit-card.svg" alt="Cartão de Crédito - Pagamento com cartão" className="payment-icon" />
      </div>
    </div>
  </section>
);

const InvoicePreview = ({ numeroDaFatura, data, nomeCliente, produtos, total, voltar }) => (
  <main className="invoice-preview">
    <header className="invoice-header">
      <img src="/public/favicon.svg" alt="Logo da Empresa" className="pdf-logo" />
      <h1>Pré-visualização da Fatura</h1>
     
    </header>
    <section className="invoice-content">
      <TemplatePdf
        numeroDaFatura={numeroDaFatura}
        data={data}
        nomeCliente={nomeCliente}
        produtos={produtos}
        total={total} // Certifique-se de que o TemplatePdf está preparado para receber esta prop
      />
    </section>
    <PaymentOptions />
    <ActionButton onClick={voltar} className="back-button">
      Voltar
    </ActionButton>
  </main>
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
