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












export default Template