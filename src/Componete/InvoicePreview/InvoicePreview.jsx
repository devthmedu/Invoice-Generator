import React from 'react';
import PropTypes from 'prop-types';
import TemplatePdf from '../Template/Template';
import ActionButton from '../ActionButton/ActionButton';
import './InvoicePreview.css'; // Certifique-se de que o caminho está correto

const PaymentOptions = () => (
  <section className="payment-options" aria-labelledby="payment-options-heading">
    <h4 id="payment-options-heading">Formas de Pagamento</h4>
    <div className="payment-methods">
      <div className="payment-method" role="listitem">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 16 16"><path fill="currentColor" d="M11.917 11.71a2.05 2.05 0 0 1-1.454-.602l-2.1-2.1a.4.4 0 0 0-.551 0l-2.108 2.108a2.04 2.04 0 0 1-1.454.602h-.414l2.66 2.66c.83.83 2.177.83 3.007 0l2.667-2.668zM4.25 4.282c.55 0 1.066.214 1.454.602l2.108 2.108a.39.39 0 0 0 .552 0l2.1-2.1a2.04 2.04 0 0 1 1.453-.602h.253L9.503 1.623a2.127 2.127 0 0 0-3.007 0l-2.66 2.66h.414z"/><path fill="currentColor" d="m14.377 6.496l-1.612-1.612a.3.3 0 0 1-.114.023h-.733c-.379 0-.75.154-1.017.422l-2.1 2.1a1.005 1.005 0 0 1-1.425 0L5.268 5.32a1.45 1.45 0 0 0-1.018-.422h-.9a.3.3 0 0 1-.109-.021L1.623 6.496c-.83.83-.83 2.177 0 3.008l1.618 1.618a.3.3 0 0 1 .108-.022h.901c.38 0 .75-.153 1.018-.421L7.375 8.57a1.034 1.034 0 0 1 1.426 0l2.1 2.1c.267.268.638.421 1.017.421h.733q.06.001.114.024l1.612-1.612c.83-.83.83-2.178 0-3.008z"/></svg>
      </div>
      <div className="payment-method" role="listitem">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 32 32"><path fill="currentColor" d="M6 3v26h16v-2H8V5h10v6h6v2h2V9.6l-.3-.3l-6-6l-.3-.3zm14 3.4L22.6 9H20zM10 13v2h12v-2zm17 2v2c-1.7.3-3 1.7-3 3.5c0 2 1.5 3.5 3.5 3.5h1c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5H25v2h2v2h2v-2c1.7-.3 3-1.7 3-3.5c0-2-1.5-3.5-3.5-3.5h-1c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5H31v-2h-2v-2zm-17 3v2h7v-2zm9 0v2h3v-2zm-9 4v2h7v-2zm9 0v2h3v-2z"/></svg>
      </div>
      <div className="payment-method" role="listitem">
       <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M12.5 2.25h-11a1 1 0 0 0-1 1v7.5a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-7.5a1 1 0 0 0-1-1m-12 3.5h13m-4 3.5H11"/></svg>
      </div>
    </div>
  </section>
);

const InvoicePreview = ({ numeroDaFatura, data, nomeCliente, produtos, total, voltar }) => (
  <main className="invoice-preview">
    <header className="invoice-header">
      <img src="./favicon.svg" alt="Logo da Empresa" className="pdf-logo" />
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
