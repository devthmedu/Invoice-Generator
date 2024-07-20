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
     <div className="container" ref={ref}>
                <div className="container">
                    <div className="row">
                        <div>
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-4 brcode">
                                        <Barcode value={`4n%${props.NumeroDaFatura}+ut%`} width={1} height={50} displayValue={false} />
                                    </div>
                                    <div className="col-md-8 text-right bbc">
                                        <h4 style={{ color: '#325aa8' }}><strong>Empresa</strong></h4>
                                        <p>(+91) 1234567890</p>
                                        <p>exemplo@gmail.com</p>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <h2 style={{ color: '#325aa8' }}>FATURA</h2>
                                        <h5> Id: {props.NumeroDaFatura}</h5>
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th><h5>Produtos</h5></th>
                                                <th><h5>Quantidade</h5></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                Lista.length ?
                                                Lista.map((itens, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td className="col-md-9">{itens.produto}</td>
                                                            <td className="col-md-3"><i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {itens.quantidade}</td>
                                                        </tr>
                                                    )
                                                }): null
                                            }
                                            <tr>
                                                <td className="text-right">
                                                    <p>
                                                        <strong>Valor Total: </strong>
                                                    </p>
                                                    <p>
                                                        <strong>Valor a Pagar: </strong>
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        <strong><i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {soma}</strong>
                                                    </p>
                                                    <p>
                                                        <strong><i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {soma}</strong>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr style={{ color: '#F81D2D' }}>
                                                <td className="text-right"><h4><strong>Total:</strong></h4></td>
                                                <td className="text-left"><h4><strong><i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {soma}</strong></h4></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <div className="col-md-12">
                                        <p><b>Data :</b> {props.data}</p>
                                        <br />
                                        <p><b>Nome</b></p>
                                        <p><b>Contato: (+91) 1234567890</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ReactPrint trigger={() => <button>Imprimir</button>} content={() => ref.current} documentTitle={`FATURA ${props.NumeroDaFatura}`} />

            <button onClick={() => setAbrirPopup(true)}>Adicionar Produto</button>

            <Dialog open={abrirPopupProduto}>
                <DialogTitle>
                    <div className="title">
                        <div className="hed">Novo produto</div>
                        <div className="icon-cross" onClick={() => setAbrirPopup(false)}><Close /></div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="container">
                        <div className="forms">
                            <input type="text" value={Item} onChange={(e) => setItem(e.target.value)} placeholder='Nome do Produto' />
                            <input type="text" value={Quantidade} onChange={(e) => setQuantidade(e.target.value)} placeholder='Quantidade ₹' />
                        </div>
                        <div className="buttons">
                            <button onClick={adicionarDados}>Adicionar</button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
  

)










export default Template