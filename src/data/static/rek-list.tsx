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


export const rekList = getRekList()
function getRekList() {
    return [
        {
            icon: <Bitcoin />,
            code: '0',
            account_number: 'ALVIN',
            price: 19076.29,
        },
        {
            icon: <Ethereum />,
            code: '014',
            account_number: 'BCA',
            price: 1053.28,
        },
        {
            icon: <Tether />,
            code: '015',
            account_number: 'MANDIRI',
            price: 0.999,
        },
        {
            icon: <Bnb />,
            code: 'BNB',
            account_number: 'Binance Coin',
            price: 214.96,
        },
        {
            icon: <Usdc />,
            code: 'USDC',
            account_number: 'USD Coin',
            price: 1.001,
        },
        {
            icon: <Cardano />,
            code: 'ADA',
            account_number: 'Cardano',
            price: 0.448,
        },
    ]

}


