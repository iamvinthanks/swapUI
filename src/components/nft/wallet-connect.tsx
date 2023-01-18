import Button from '@/components/ui/button';
import { WalletContext } from '@/lib/hooks/use-connect';
import { Menu } from '@/components/ui/menu';
import { Transition } from '@/components/ui/transition';
import ActiveLink from '@/components/ui/links/active-link';
import { ChevronForward } from '@/components/icons/chevron-forward';
import { PowerIcon } from '@/components/icons/power';
import { useModal } from '@/components/modal-views/context';
import { useContext } from 'react';

export default function WalletConnect() {
  const { openModal } = useModal();
  const { address, disconnectWallet, balance } = useContext(WalletContext);
  return (
    <>
      <Button
        onClick={() => openModal('WALLET_CONNECT_VIEW')}
        className="shadow-main hover:shadow-large"
      >
        LOGIN
      </Button>
    </>
  );
}
