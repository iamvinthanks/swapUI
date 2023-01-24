import { Bitcoin } from '@/components/icons/bitcoin';
import { Ethereum } from '@/components/icons/ethereum';
import { Tether } from '@/components/icons/tether';
import { Bnb } from '@/components/icons/bnb';
import { Usdc } from '@/components/icons/usdc';
import { Cardano } from '@/components/icons/cardano';
import { Doge } from '@/components/icons/doge';
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import { map } from 'lodash';

// const [data, setData] = useState([]);
// useEffect(() => {
//     axios.get('https://63c0cd6d71656267186d60c4.mockapi.io/price')
//         .then((res) => {
//             setData(res.data);
//             console.log(res.data);
//         })
// }, [])

const data = [
  {
    icon: <Bitcoin />,
    code: 'Pilih',
    name: 'Nomor Rekening',
    price: 19076.29,
  },
];
const resp = axios
  .get('https://63c0cd6d71656267186d60c4.mockapi.io/price')
  .then((res) => {
    map(res.data, (key) => {
      data.push({
        icon: <Bitcoin />,
        code: key.code,
        name: key.name,
        price: key.price,
      });
    });
    console.log(data);
  });
function getRekList() {
  return data;

  // {
  //     icon: <Ethereum />,
  //     code: '014',
  //     name    : 'BCA',
  //     price: 1053.28,
  // },
  // {
  //     icon: <Tether />,
  //     code: '015',
  //     name    : 'MANDIRI',
  //     price: 0.999,
  // },
  // {
  //     icon: <Bnb />,
  //     code: 'BNB',
  //     name    : 'Binance Coin',
  //     price: 214.96,
  // },
  // {
  //     icon: <Usdc />,
  //     code: 'USDC',
  //     name    : 'USD Coin',
  //     price: 1.001,
  // },
  // {
  //     icon: <Cardano />,
  //     code: 'ADA',
  //     name    : 'Cardano',
  //     price: 0.448,
  // },
}
export const rekList = getRekList();
