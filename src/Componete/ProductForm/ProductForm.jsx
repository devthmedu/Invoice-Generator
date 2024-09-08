import React from 'react';
import PropTypes from 'prop-types';
import './ProductForm.css';

function ProductForm({ produto, quantidade, preco, setProduto, setQuantidade, setPreco, adicionarProduto, editIndex }) {
  return (
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
        step="0.01"  // Permite valores decimais
      />
      <button onClick={adicionarProduto} className="submit-button">
        {editIndex !== null ? 'Atualizar Produto' : 'Adicionar Produto'}
      </button>
    </div>
  );
}

// Adicionando PropTypes para validação das props
ProductForm.propTypes = {
  produto: PropTypes.string.isRequired,
  quantidade: PropTypes.number.isRequired,
  preco: PropTypes.number.isRequired,
  setProduto: PropTypes.func.isRequired,
  setQuantidade: PropTypes.func.isRequired,
  setPreco: PropTypes.func.isRequired,
  adicionarProduto: PropTypes.func.isRequired,
  editIndex: PropTypes.number,
};

ProductForm.defaultProps = {
  editIndex: null,
};

export default ProductForm;
