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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle'
import { indexOf } from 'lodash';


const SwapPage: NextPageWithLayout = () => {
  const [buttonSwap, setButtonSwap] = useState({
    id: '1',
    name: 'Swap',
  });
  const [coin, setCoin] = useState('')
  const [result, setResult] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [confirm, setConfirm] = useState(false)
  const [code, setCode] = useState('')
  const [refrence, setRefrence] = useState('')
  const [rekening, setRekening] = useState('')
  const [Success, setSuccess] = useState(false)
  const [Warning, setWarning] = useState(true)
  const [alertmessage,setallertmessage] = useState({
    message:'Code atau No.Refrensi Valid !',
    notes:'Klik konfirmasi Melanjutkan',
  })
  const [card, setCard] = useState({
    codevalue:'',
    codecoin:'',
    market_price:'',
    total_value:'',
    fee: 5000,
    withfee:''
  });
  const setallert = async () => {
    if (buttonSwap.id === '1') {
      // console.log(code, refrence, rekening, coin);
      setSpinner(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}`+'/verifcode',{
        headers: {
          'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        },
        params: {
          referenceNo: refrence,
        }
      })
      .then(function(response) {
        if(response.data.code == 200){
        setCard(response.data.data);
        setSpinner(false);
        setResult(true);
        setButtonSwap({
          id:'2',
          name:'Confirm',
          });
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 10000);
        }
        if(response.data.code == 201){
          setSpinner(false);
          setallertmessage({
            message:response.data.message,
            notes:response.data.notes,
          });
          setWarning(true);
          setTimeout(() => {
            setWarning(false);
          }, 10000);
        }
      })
      .catch(function(error) {
        console.log(error.response.data);
        setSpinner(false);
          setallertmessage({
            message:error.response.data.message,
            notes:error.response.data.notes,
          });
          setWarning(true);
          setTimeout(() => {
            setWarning(false);
          }, 10000);
      })
    }
    if (buttonSwap.id === '2') {
      setSpinner(true)
      const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}`+'/redeemcode',{
        headers: {
          'Authorization': 'Bearer' + sessionStorage.getItem('token')
        },
        params:{
          code: code,
          recipient_bank: coin,
          recipient_account: rekening
        }
      }).then(function(response){
        console.log(response)
      })
    }
  };
  const setconfirm = async () => {
    console.log('confirm');
  };
  let [toggleCoin, setToggleCoin] = useState(false);
  return (
    <>
      <NextSeo
        title="Farms"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <Trade>
      { Success && <Alert severity='success' className='mb-5'>
        {alertmessage.message} <strong>{alertmessage.notes}</strong>
      </Alert>}
      { Warning && <Alert severity='warning' className='mb-5'>
        {alertmessage.message} <strong>{alertmessage.notes}</strong>
      </Alert>}
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
              placeholder={'Input Code'}
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
              placeholder={'Input Refrence'}
              defaultCoinIndex={1}
              getCoinValue={(data) => console.log('To coin value:', data)}
              value={refrence}
              onChange={(e) => {
                setRefrence(e.target.value);
              }}
            />

            <RekInput
              label={'Rek Code'}
              exchangeRate={2.0}
              title={'Rekening'}
              placeholder={'Rekening Penerima'}
              getCoinValue={(data) => console.log(data)}
              value={rekening}
              onChange={(e) => {
                setRekening(e.target.value);
              }}
              setCoin={setCoin}
            />
          </div>
        </div>
        {result && (
          <div className="flex flex-col gap-4 xs:gap-[18px]">
            <TransactionInfo label={'Crypto Value'} value={card.codevalue + ' ' + card.codecoin} />
            <TransactionInfo label={'Market Price'} value={card.market_price} />
            <TransactionInfo label={'IDR Value'} value= {'IDR ' + card.total_value} />
            <TransactionInfo label={'Fee'} value={'5000'} />
            <TransactionInfo label={'Total - Fee'} value={card.withfee} />
          </div>
        )}
        {spinner && <LinearProgress color="success" />}

        <Button
          onClick={setallert}
          size="large"
          shape="rounded"
          fullWidth={true}
          className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
          id={buttonSwap.id}
        >
          {buttonSwap.name}
        </Button>
      </Trade>
      
    </>
  );
};

SwapPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default SwapPage;
