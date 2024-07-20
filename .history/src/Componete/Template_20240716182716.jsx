import React from 'react'
import ReactPrint from 'react-to-print'
import { useRef, useState } from 'react';
import Barcode from 'react-barcode';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Close } from '@mui/icons-material'


function Template(props) {
  const ref = useRef();
  const [abrirPopupProdutod, setAbrirPopup] = useState(false);

  const [Item, setItem] = useState('');
  const [Quantidade, setQuantidade] = useState(0);
  const [Desconto, setDesconto] = useState(props.desconto);
  const [Total, setTotal] = useState(0);
  const [Lista, setLista] = useState([])

const adicionarDados = () => {
  Lista.push({
    produto:Item,
    quantidade: Quantidade
  });

  console.log(Lista);
  setItem('');
  setQuantidade(0);
  setAbrirPopup(false );

}

let soma = 0; 
Lista.forEach(quantidade => {
  soma += parseInt(quantidade.quantidade );
});

console.log('A Soma é = ${soma}');

return (
  <>
    <div className = "container" ref={ref}>
      <div className="container">
        <div className="row">
          
        </div>
      </div>

    </div>
  
  
  
  
  
  
  </>
)










export default Template