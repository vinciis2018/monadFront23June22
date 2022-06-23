import { useEffect } from "react";
// hooks
import { useWallet, useLogin } from "components/contexts";

export const Logout = () => {
  const { logout } = useLogin();
  const { lock } = useWallet();

  useEffect(() => {
    logout();
    lock();
    /* eslint-disable-next-line */
  }, []);

  return <div />;
};
