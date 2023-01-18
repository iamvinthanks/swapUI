import Image from '@/components/ui/image';
import metamaskLogo from '@/assets/images/metamask.svg';
import { WalletContext } from '@/lib/hooks/use-connect';
import { useModal } from '@/components/modal-views/context';
import { useContext, useEffect, useState } from 'react';
import InputLabel from '@/components/ui/input-label';
import Input from '@/components/ui/forms/input';
import Password from '@/components/ui/forms/password';
import axios from 'axios';

export default function SelectWallet({ ...props }) {
  const { address, connectToWallet, error } = useContext(WalletContext);
  const [dataLogin, setdataLogin] = useState({
    email: '',
    password: '',
  });
  const Login = async () => {
    const response = await axios
      .post('http://10.10.1.42:8000/api/auth/admin/login', {
        email: dataLogin.email,
        password: dataLogin.password,
      })
      .then((response) => {
        console.log(response.data.data.token);
        window.sessionStorage.setItem('token', response.data.data.token);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };
  const { closeModal } = useModal();
  useEffect(() => {
    if (address) closeModal();
  }, [address, closeModal]);

  return (
    <div className="relative z-50 mx-auto w-[440px] max-w-full rounded-lg bg-white px-9 py-8 dark:bg-light-dark">
      <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
        LOGIN
      </h2>
      <div className="mb-8">
        <InputLabel title="Email" important />
        <Input
          value={dataLogin.email}
          min={0}
          type="email"
          placeholder="Enter your price"
          inputClassName="spin-button-hidden"
          onChange={(e) => {
            setdataLogin({ ...dataLogin, email: e.target.value });
          }}
        />
      </div>
      <div className="mb-8">
        <InputLabel title="Password" important />
        <Password
          label=""
          value={dataLogin.password}
          placeholder="Enter your password"
          onChange={(e) => {
            setdataLogin({ ...dataLogin, password: e.target.value });
          }}
        />
      </div>
      <button
        className="h-12 w-full rounded-lg bg-gray-900 text-sm font-medium uppercase tracking-wider text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
        onClick={Login}
      >
        Login
      </button>
      <div className="m-8 flex items-center justify-center">
        <div className="w-1/5 border-b border-gray-300 dark:border-gray-700" />
        <div className="mx-4 text-sm text-gray-500 dark:text-gray-400">
          Create Account ?
        </div>
        <div className="w-1/5 border-b border-gray-300 dark:border-gray-700" />
      </div>
      <button
        className="h-12 w-full rounded-lg bg-gray-900 text-sm font-medium uppercase tracking-wider text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
        onClick={connectToWallet}
      >
        Register
      </button>

      {error && (
        <p className="mt-3 text-center text-xs text-red-500">
          Please install Metamask plugin in your browser in order to connect
          wallet.
        </p>
      )}
    </div>
  );
}
