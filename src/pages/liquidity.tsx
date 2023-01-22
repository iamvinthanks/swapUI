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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const LiquidityPage: NextPageWithLayout = () => {
  const [age, setAge] = useState('');
  const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setAge(event.target.value);
  };
  const [Jumlah, setJumlah] = useState('');
  const [refrence, setRefrence] = useState('');
  const [rekening, setRekening] = useState('');
  const [coin, setCoin] = useState('');
  const [result, setResult] = useState(true);
  const [spinner, setSpinner] = useState(false);
  const [rate, setRate] = useState(0);
  const[total, setTotal] = useState('');
  const [card, setCard] = useState({
    idr_value: '0',
    crypto_value: '0',
    bersih: '',
    market_value: '',
  });
  const calculate = async () => {
    console.log(age)
    // const res = await fetch(
    //   `https://indodax.com/api/usdt_idr/ticker`
    //   )
    //   const data = await res.json();
    //   setRate(data.ticker.high)
    //   setTotal((parseFloat(Jumlah) / parseFloat(data.ticker.high)).toFixed(8))
  }
  

  

  
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
          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={age}
              onChange={handleChange}
              autoWidth
              label="Age"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Twenty</MenuItem>
              <MenuItem value={21}>Twenty one</MenuItem>
              <MenuItem value={22}>Twenty one and a half</MenuItem>
            </Select>
          </FormControl>
          {/* <RekInput
              label={'Rek Code'}
              exchangeRate={2.0}
              title={'Rekening'}
              placeholder={'Input Rekening'}
              getCoinValue={(data) => console.log(data)}
              value={rekening}
              onChange={(e) => {
                setRekening(e.target.value);
              }}
              setCoin={setCoin}
            /> */}
          </div>
        </div>
        {spinner && <LinearProgress color="success" />}
        {result && (
          <div className="flex flex-col gap-4 xs:gap-[18px]">
            <TransactionInfo label={'Crypto Value'} value={Jumlah} />
            <TransactionInfo label={'Market Price'} value={rate} />
            {/* <TransactionInfo label={'IDR Value'} value={card.idr_value} /> */}
            {/* <TransactionInfo label={'Fee'} value={'5000'} /> */}
            <TransactionInfo label={'Total Crypto'} value={total} />
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
              Approve ETH
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
