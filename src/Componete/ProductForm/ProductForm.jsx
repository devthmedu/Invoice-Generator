import React from 'react';
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
      />
      <button onClick={adicionarProduto} className="submit-button">
        {editIndex !== null ? 'Atualizar Produto' : 'Adicionar Produto'}
      </button>
    </div>
  );
}

export default ProductForm;
