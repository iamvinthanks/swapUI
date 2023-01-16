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
  const [buttonSwap, setButtonSwap] = useState({
    id: '1',
    name: 'Swap',
  });
  const [coin, setCoin] = useState('');
  const [result, setResult] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [code, setCode] = useState('');
  const [refrence, setRefrence] = useState('');
  const [rekening, setRekening] = useState('');
  const [card, setCard] = useState({
    idr_value: '0',
    crypto_value: '0',
    bersih: '',
    market_value: '',
  });
  const setallert = async () => {
    if (buttonSwap.id === '1') {
      console.log(code, refrence, rekening, coin);
      setSpinner(true);
      const response = await axios.get(
        'https://63c0cd6d71656267186d60c4.mockapi.io/price/1'
      );
      setCard(response.data);
      setSpinner(false);
      setResult(true);
      // setButtonSwap({
      //   id:'2',
      //   name:'Confirm',
      //   });
    }
    if (buttonSwap.id === '2') {
      alert('YAXKKIINNNNNN?');
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
              placeholder={'Input Rekening'}
              getCoinValue={(data) => console.log(data)}
              value={rekening}
              onChange={(e) => {
                setRekening(e.target.value);
              }}
              setCoin={setCoin}
            />
          </div>
        </div>
        {spinner && <LinearProgress color="success" />}
        {result && (
          <div className="flex flex-col gap-4 xs:gap-[18px]">
            <TransactionInfo label={'Crypto Value'} value={card.idr_value} />
            <TransactionInfo label={'Market Price'} value={card.market_value} />
            <TransactionInfo label={'IDR Value'} value={card.idr_value} />
            <TransactionInfo label={'Fee'} value={'5000'} />
            <TransactionInfo label={'Total - Fee'} value={card.bersih} />
          </div>
        )}

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
      {/* <div id='confirmed' className='modal fade'>
          <div className='modal-dialog modal-confirm'>
            <div className='modal-content'>
              <div className='modal-header'>
                <div className='icon-box'>
                  <i className='material-icons'>&#xE876;</i>
                </div>
                <h4 className='modal-title w-100'>Redeem Procesed</h4>
              </div>
              <div className='modal-body'>
                <p className='text-center'>Pesanan Anda diterima dan sedang diproses oleh sistem</p>
                <table>
                <tr>
                    <td>Nama </td>
                    <td>: Rick Zolenda</td>
                </tr>
                <tr>
                    <td>Jenis Rekening </td>
                    <td>: BCA</td>
                </tr>
                <tr>
                    <td>Nomor Rekening </td>
                    <td>: 091721923123</td>
                </tr>
                <tr>
                    <td>Gift Card Value(Crypto) </td>
                    <td>: 1000 TRX</td>
                </tr>
                <tr>
                    <td>Gift Card Value(IDR)</td>
                    <td>: Rp 837.985</td>
                </tr>
                <tr>
                    <td>Jumlah Diterima(+fee) </td>
                    <td>: Rp 100.000</td>
                </tr>
                </table>
                <div role={'separator'} className={'dropdown-divider'} />
                <p className='text-center'>ID Transaksi</p>
                <input type='text' className='form-control' value='123456789' readOnly />
                <h5>IST-09812918391</h5>
              </div>
              <div className='modal-footer'>
                <button className='btn btn-success btn-block' data-dismiss='modal'>Check Status Transaksi</button>
              </div>
            </div>
          </div>
      </div> */}
    </>
  );
};

SwapPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export default SwapPage;
