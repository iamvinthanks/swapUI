import { useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import { Transition } from '@/components/ui/transition';
import DashboardLayout from '@/layouts/_dashboard';
import { RadioGroup } from '@/components/ui/radio-group';
import { Listbox } from '@/components/ui/listbox';
import Image from '@/components/ui/image';
import Button from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import Uploader from '@/components/ui/forms/uploader';
import InputLabel from '@/components/ui/input-label';
import ToggleBar from '@/components/ui/toggle-bar';
import { TagIcon } from '@/components/icons/tag-icon';
import { LoopIcon } from '@/components/icons/loop-icon';
import { SandClock } from '@/components/icons/sand-clock';
import { ChevronDown } from '@/components/icons/chevron-down';
import { Ethereum } from '@/components/icons/ethereum';
import { Flow } from '@/components/icons/flow';
import { Warning } from '@/components/icons/warning';
import { Unlocked } from '@/components/icons/unlocked';
import Avatar from '@/components/ui/avatar';
import Userrek from '@/components/ui/user-rek';
//images
import AuthorImage from '@/assets/images/author.jpg';
import NFT1 from '@/assets/images/nft/nft-1.jpg';
import axios from 'axios';

const PriceOptions = [
  {
    name: 'Fixed price',
    value: 'fixed',
    icon: <TagIcon className="h-5 w-5 sm:h-auto sm:w-auto" />,
  },
  {
    name: 'Open for bids',
    value: 'bids',
    icon: <LoopIcon className="h-5 w-5 sm:h-auto sm:w-auto" />,
  },
  {
    name: 'Timed auction',
    value: 'auction',
    icon: <SandClock className="h-5 w-5 sm:h-auto sm:w-auto" />,
  },
];

type PriceTypeProps = {
  value: string;
  onChange: (value: string) => void;
};

function PriceType({ value, onChange }: PriceTypeProps) {
  return (
    <RadioGroup
      value={value}
      onChange={onChange}
      className="grid grid-cols-3 gap-3"
    >
      {PriceOptions.map((item, index) => (
        <RadioGroup.Option value={item.value} key={index}>
          {({ checked }) => (
            <span
              className={`relative flex cursor-pointer items-center justify-center rounded-lg border-2 border-solid bg-white text-center text-sm font-medium tracking-wider shadow-card transition-all hover:shadow-large dark:bg-light-dark ${
                checked ? 'border-brand' : 'border-white dark:border-light-dark'
              }`}
            >
              <span className="relative flex h-28 flex-col items-center justify-center gap-3 px-2 text-center text-xs uppercase sm:h-36 sm:gap-4 sm:text-sm">
                {item.icon}
                {item.name}
              </span>
            </span>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
}

const CreateNFTPage: NextPageWithLayout = () => {
  let [publish, setPublish] = useState(true);
  let [explicit, setExplicit] = useState(false);
  let [unlocked, setUnlocked] = useState(false);
  let [priceType, setPriceType] = useState('fixed');
  // let [blockchain, setBlockChain] = useState(BlockchainOptions[0]);
  const [rekening, setRekening] = useState('');
  const [amount, setAmount] = useState('');
  const [coin, setCoin] = useState('');
  const createescrow = async () => {
    const response = await axios
      .post(
        'http://192.168.177.42:8001/api/createescrow',
        {
          amount: amount,
          rek_seller: rekening,
          id_rek_seller: coin,
          fee_from_buyer: explicit,
        },
        {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer 7|bn4T4znq2EDHtJB2xMd2QgSWw6fIqWxj5ZfcOHpH`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    // console.log(amount,rekening,coin,explicit)
  };

  return (
    <>
      <NextSeo
        title="Create NFT"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <div className="mx-auto w-full px-4 pt-8 pb-14 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8 xl:px-10 2xl:px-0">
        <h2 className="mb-6 text-lg font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:mb-10 sm:text-2xl">
          Create New Escrow
        </h2>
        <div className="mb-8 grid grid-cols-1 gap-12 lg:grid-cols-3">
          <div className="lg:col-span-6">
            {/* File uploader */}
            <div className="mb-12">
              <InputLabel title="Upload Item" important />
              <Uploader />
            </div>
          </div>
        </div>
        {/* Title */}

        <div className="mb-8">
          <InputLabel title="Judul Escrow" important />
          <Input
            value={amount}
            min={0}
            type="number"
            placeholder="Masukan Judul Transaksi  "
            inputClassName="spin-button-hidden"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        {/* Price */}
        <div className="mb-8">
          <InputLabel title="Jumlah Dana" important />
          <Input
            value={amount}
            min={0}
            type="number"
            placeholder="Enter your price"
            inputClassName="spin-button-hidden"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <div className="mb-8">
          <InputLabel title="Buyer ID" important />
          <Input
            value={amount}
            min={0}
            type="number"
            placeholder="Enter Buyer ID"
            inputClassName="spin-button-hidden"
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
        </div>
        <div className="mb-8">
          <InputLabel title="rekening Pencairan" important />
          <Userrek
            label={'Nomor Rekening'}
            exchangeRate={2.0}
            title={'Rekening'}
            placeholder={'Rekening Penerima'}
            getCoinValue={(data) => console.log(data)}
            // value={rekening}
            // onChange={(e) => {
            //   setRekening(e.target.value);
            // }}
            setRekening={setRekening}
            setCoin={setCoin}
          />
        </div>

        {/* Explicit content */}
        <div className="mb-8">
          <ToggleBar
            title="Fee akan ditangguhkan ke Seller?"
            subTitle="Secara default fee akan ditangguhkan ke Buyer,Jika diaktifkan maka fee akan ditangguhkan kepada seller"
            icon={<Warning />}
            checked={explicit}
            onChange={() => setExplicit(!explicit)}
          />
        </div>

        <Button shape="rounded" onClick={createescrow}>
          CREATE
        </Button>
      </div>
    </>
  );
};

CreateNFTPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateNFTPage;
