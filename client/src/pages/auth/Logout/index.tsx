import { useEffect } from "react";
// hooks
import { useWallet, useLogin } from "components/contexts";
import { useHistory } from 'react-router-dom';

export const Logout = () => {
  const navigate = useHistory();
  const { logout } = useLogin();
  const { lock } = useWallet();

  const redirect = navigate?.location?.search
  ? navigate?.location?.search.split('=')[1]
  : '/';


  useEffect(() => {
    logout();
    lock();
    /* eslint-disable-next-line */
    navigate.push(redirect);
  }, []);

  return <div />;
};
