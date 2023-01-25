import type { CoinTypes } from '@/types';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import { ChevronDown } from '@/components/icons/chevron-down';
import { useClickAway } from '@/lib/hooks/use-click-away';
import { useLockBodyScroll } from '@/lib/hooks/use-lock-body-scroll';
import { listCoin } from '@/data/static/list-coin';
// dynamic import
// const CoinSelectView = dynamic(
//   () => import('@/components/ui/coin-select-view')
// );
const AvailableCoinSelectViewTypes = dynamic(
  () => import('@/components/ui/available-coin-select-view')
);

interface CoinInputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  exchangeRate?: number;
  defaultCoinIndex?: number;
  className?: string;
  setCoin: (coin: string) => void;
  setRekening: (rekening: string) => void;
  getCoinValue: (param: { coin: string; value: string }) => void;
}

const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;

export default function AvailableCoin({
  label,
  getCoinValue,
  defaultCoinIndex = 0,
  exchangeRate,
  className,
  setCoin,
  setRekening,
  ...rest
}: CoinInputTypes) {
  let [value, setValue] = useState('');
  let [placeholder, setPlaceholder] = useState('');
  let [selectedCoin, setSelectedCoin] = useState(listCoin[defaultCoinIndex]);
  let [visibleCoinList, setVisibleCoinList] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  useClickAway(modalContainerRef, () => {
    setVisibleCoinList(false);
  });
  useLockBodyScroll(visibleCoinList);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(decimalPattern)) {
      setValue(event.target.value);
      let param = { coin: selectedCoin.code, value: event.target.value };
      getCoinValue && getCoinValue(param);
      setCoin(selectedCoin.code);
      setRekening(selectedCoin.name);
    }
  };
  function handleSelectedCoin(coin: CoinTypes) {
    setSelectedCoin(coin);
    setCoin(coin.code);
    setRekening(coin.name);

    setVisibleCoinList(false);
  }

  return (
    <>
      <div
        className={cn(
          ' min-h-[70px] rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600',
          className
        )}
      >
        <div className="border-r border-gray-200 p-3 transition-colors duration-200 group-hover:border-gray-900 dark:border-gray-700 dark:group-hover:border-gray-600">
          <span className="mb-1.5 block text-xs uppercase text-gray-600 dark:text-gray-400">
            {label}
          </span>
          <button
            onClick={() => {
              setVisibleCoinList(true);
            }}
            // className="flex items-center font-medium outline-none dark:text-gray-100"
            className="flex w-full rounded-tr-lg rounded-br-lg border-0 pb-0.5 text-left text-lg outline-none focus:ring-0 dark:bg-light-dark"
            value={selectedCoin?.code}
            id="type_rekening"
          >
            {selectedCoin?.icon}{' '}
            <span className="ltr:ml-2 rtl:mr-2">{selectedCoin?.name} </span>
            {/* <ChevronDown className="ltr:ml-1.5 rtl:mr-1.5" /> */}
          </button>
        </div>
        {/* <input
          type="text"
          value={value}
          placeholder={placeholder}
          inputMode="decimal"
          onChange={handleOnChange}
          className="w-full rounded-tr-lg rounded-br-lg border-0 pb-0.5 text-right text-lg outline-none focus:ring-0 dark:bg-light-dark"
          {...rest}
        /> */}
        {/* <div className="flex flex-1 flex-col text-right">
          <span className="font-xs px-3 text-gray-400">
            {rekening}
          </span>
        </div> */}
      </div>

      <AnimatePresence>
        {visibleCoinList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-gray-700 bg-opacity-60 p-4 text-center backdrop-blur xs:p-5"
          >
            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-full align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <motion.div
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              exit={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              ref={modalContainerRef}
              className="inline-block text-left align-middle"
            >
              <AvailableCoinSelectViewTypes
                onSelect={(selectedCoin) => handleSelectedCoin(selectedCoin)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

AvailableCoin.displayName = 'AvailableCoin';
