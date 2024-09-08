// components/ProductList.js
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './ProductList.css';

function ProductList({ produtos, editarProduto, removerProduto }) {
  if (produtos.length === 0) {
    return null; // Não renderiza nada se não houver produtos
  }

  return (
    <div className="product-list">
      <h3>Produtos Adicionados:</h3>
      <ul>
        {produtos.map((item, index) => (
          <li key={index}>
            <span>
              {item.quantidade} x {item.produto} @ R$ {item.preco.toFixed(2)} = R$ {(item.quantidade * item.preco).toFixed(2)}
            </span>
            <div className="actions">
              <button onClick={() => editarProduto(index)} title="Editar">
                <FaEdit />
              </button>
              <button onClick={() => removerProduto(index)} title="Remover">
                <FaTrash />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
