import Image from '@/components/ui/image';
import metamaskLogo from '@/assets/images/metamask.svg';
import { WalletContext } from '@/lib/hooks/use-connect';
import { useModal } from '@/components/modal-views/context';
import { useContext, useEffect, useState } from 'react';
import InputLabel from '@/components/ui/input-label';
import Input from '@/components/ui/forms/input';
import Password from '@/components/ui/forms/password';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';



export default function SelectWallet({ ...props }) {
  const { address, connectToWallet, error } = useContext(WalletContext);
  const [alert, setalert] = useState(false);
  const [dataLogin, setdataLogin] = useState({
    email: '',
    password: '',
  });
  const [loginbutton, setloginbutton] = useState(true);
  const [loading, setloading] = useState(false);
  const Login = async () => {
    setloading(true);
    setloginbutton(false);
    const response = await axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}` + '/login', {
        email: dataLogin.email,
        password: dataLogin.password,
      })
      .then((response) => {
        window.sessionStorage.setItem('token', response.data.access_token);
        window.sessionStorage.setItem('name', 'Alvinnasa');
        window.location.reload();
      })
      .catch((error) => {
        setloginbutton(true);
        setloading(false);
        setalert(true);
        // setTimeout(() => {
        //   setalert(false);
        // }, 3000);
      });
  };
  const { closeModal } = useModal();
  useEffect(() => {
    if (address) closeModal();
  }, [address, closeModal]);
const messages = (
   <Alert severity="error">This is an error alert — check it out!</Alert> 
)
 

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
      
      {alert && <Fade in={alert == true}>{messages}</Fade>}
      
      <div className="mt-4 mb-4 flex items-center justify-center">
        {loading && <CircularProgress className="text-center" />}
        {loginbutton && (
          <button
            className="h-12 w-full rounded-lg bg-gray-900 text-sm font-medium uppercase tracking-wider text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
            onClick={Login}
          >
            Login
          </button>
        )}
      </div>
      
      <div className="mt-4 mb-4 flex items-center justify-center">
        <div className="w-1/5 border-b border-gray-300 dark:border-gray-700" />
        <div className="mx-4 text-sm text-gray-500 dark:text-gray-400">
          Create Account ?
        </div>
        <div className="w-1/5 border-b border-gray-300 dark:border-gray-700" />
      </div>
      <div className="mt-4 mb-4 flex items-center justify-center">
        <button
          className="h-12 w-full rounded-lg bg-gray-900 text-sm font-medium uppercase tracking-wider text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-opacity-50"
          // onClick={connectToWallet}
        >
          Register
        </button>
      </div>
      
    </div>
    
  );
}
