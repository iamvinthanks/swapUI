import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import DashboardLayout from '@/layouts/_dashboard';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import { Plus } from '@/components/icons/plus';
import ActiveLink from '@/components/ui/links/active-link';
import Trade from '@/components/ui/trade';
import RekInput from '@/components/ui/rek-input';
import LinearProgress from '@mui/material/LinearProgress';
import { SetStateAction, useEffect, useState } from 'react';
import Userrek from '@/components/ui/user-rek';
import AvailableCoin from '@/components/ui/available-coin';
import axios from 'axios';

const LiquidityPage: NextPageWithLayout = () => {
  const [Jumlah, setJumlah] = useState('');
  const [payment, setpayment] = useState('');
  const [paymentid, setpaymentid] = useState('');
  const [SelectedCoin, setSelectedCoin] = useState('');
  const [Coin, setCoin] = useState('');
  const [result, setResult] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [rate, setRate] = useState(0);
  const [total, setTotal] = useState('');
  const [card, setCard] = useState({
    idr_value: '0',
    crypto_value: '0',
    bersih: '',
    market_value: '',
  });
  const calculate = async () => {
    let SelectedCoin2 = Coin.toLowerCase();
    setResult(false);
    setSpinner(true);
    const res = await axios.get(
      `https://indodax.com/api/${SelectedCoin2}_idr/ticker`
    );
    setRate(res.data.ticker.high);
    setTotal(
      (parseFloat(Jumlah) / parseFloat(res.data.ticker.high)).toFixed(8)
    );
    setSpinner(false);
    setResult(true);

    // console.log(Jumlah,SelectedCoin,payment,paymentid)
  };
  return (
    <>
      <NextSeo
        title="Liquidity"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <Trade>
        <div className="mb-5 border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
          <div className="relative flex flex-col gap-3">
            <CoinInput
              label={'Jumlah'}
              exchangeRate={1.0}
              title={'IDR'}
              type={'number'}
              // defaultCoinIndex={0}
              placeholder={'Jumlah'}
              getCoinValue={(code) => console.log('From coin value:', code)}
              value={Jumlah}
              onChange={(e) => {
                setJumlah(e.target.value);
              }}
            />
            <AvailableCoin
              label={'Select Coin'}
              exchangeRate={2.0}
              title={'Rekening'}
              placeholder={'Rekening Penerima'}
              getCoinValue={(data) => console.log(data)}
              setRekening={setSelectedCoin}
              setCoin={setCoin}
            />
            <Userrek
              label={'Metode Pembayaran'}
              exchangeRate={2.0}
              title={'Rekening'}
              placeholder={'Rekening Penerima'}
              getCoinValue={(data) => console.log(data)}
              // value={rekening}
              // onChange={(e) => {
              //   setRekening(e.target.value);
              // }}
              setRekening={setpayment}
              setCoin={setpaymentid}
            />
          </div>
        </div>
        {spinner && <LinearProgress color="success" />}
        {result && (
          <div className="flex flex-col gap-4 xs:gap-[18px]">
            <TransactionInfo label={'Estimasi Crypto'} value={Jumlah} />
            <TransactionInfo label={'Estimasi Harga Market'} value={rate} />
            {/* <TransactionInfo label={'IDR Value'} value={card.idr_value} /> */}
            {/* <TransactionInfo label={'Fee'} value={'5000'} /> */}
            <TransactionInfo label={'Estimasi Total Crypto'} value={total} />
          </div>
        )}
        <div className="mt-6 grid grid-cols-2 gap-2.5 xs:mt-8">
          <Button
            onClick={calculate}
            size="large"
            shape="rounded"
            fullWidth={true}
            className="uppercase"
          >
            Calculate
          </Button>
          <Button
            size="large"
            shape="rounded"
            fullWidth={true}
            className="uppercase"
          >
            Buy Gift Card
          </Button>
          {/* <ActiveLink href="/liquidity-position">
          </ActiveLink>
          <ActiveLink href="/liquidity-position">
          </ActiveLink> */}
        </div>
      </Trade>
    </>
  );
};

LiquidityPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default LiquidityPage;
