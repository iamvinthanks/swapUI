import { useEffect, useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import RekInput from '@/components/ui/rek-input';
import TransactionInfo from '@/components/ui/transaction-info';
// import { SwapIcon } from '@/components/icons/swap-icon';
import DashboardLayout from '@/layouts/_dashboard';
import Trade from '@/components/ui/trade';
import axios, { Axios } from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import { indexOf } from 'lodash';

const SwapPage: NextPageWithLayout = () => {
  const [result, setResult] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [code, setCode] = useState('');
  const [refrence, setRefrence] = useState('');
  const [card, setCard] = useState({
    id: '1',
    idr_value: '0',
    crypto_value: '0',
    bersih: '',
  });
  const setallert = async () => {
    console.log(code, refrence);
    setSpinner(true);
    const response = await axios.get(
      'https://63c0cd6d71656267186d60c4.mockapi.io/price/1'
    );
    setCard(response.data);
    setSpinner(false);
    setResult(true);
  };
  let [toggleCoin, setToggleCoin] = useState(false);
  return (
    <>
      <NextSeo
        title="Farms"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <Trade>
        <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
          <div
            className={cn(
              'relative flex gap-3',
              toggleCoin ? 'flex-col-reverse' : 'flex-col'
            )}
          >
            <CoinInput
              label={'Binance'}
              exchangeRate={1.0}
              title={'Code'}
              // defaultCoinIndex={0}
              getCoinValue={(code) => console.log('From coin value:', code)}
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
              }}
            />
            <CoinInput
              label={'CODE'}
              title={'Refrence'}
              exchangeRate={2.0}
              defaultCoinIndex={1}
              getCoinValue={(data) => console.log('To coin value:', data)}
              value={refrence}
              onChange={(e) => {
                setRefrence(e.target.value);
              }}
            />
            <RekInput
              label={'YOUR'}
              exchangeRate={2.0}
              title={'Rekening'}
              defaultCoinIndex={1}
              getCoinValue={(data) => console.log('To coin value:', data)}
            />
          </div>
        </div>
        {spinner && <LinearProgress color="success" />}
        {result && (
          <div className="flex flex-col gap-4 xs:gap-[18px]">
            <TransactionInfo label={'Crypto Value'} value={card.idr_value} />
            <TransactionInfo label={'Crypto Value'} value={card.idr_value} />
            <TransactionInfo label={'IDR Value'} value={card.crypto_value} />
            <TransactionInfo label={'Fee'} value={'5000'} />
            <TransactionInfo label={'Total - Fee'} value={card.bersih} />
            <TransactionInfo label={'Network Fee'} />
            <TransactionInfo label={'Criptic Fee'} />
          </div>
        )}

        <Button
          onClick={setallert}
          size="large"
          shape="rounded"
          fullWidth={true}
          className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
        >
          SWAP
        </Button>
      </Trade>
    </>
  );
};

SwapPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default SwapPage;
