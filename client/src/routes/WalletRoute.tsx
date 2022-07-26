import React, { Fragment, ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useLogin, useWallet } from "components/contexts";

type PrivateRouteProps = {
  component?: any;
  layout?: any | typeof Fragment;
  exact?: boolean;
  path?: string;
};

interface Props {
  children: ReactNode;
}
function EmptyLayout({ children }: Props) {
  return <div>{children}</div>;
}

const WalletRoute: React.FC<PrivateRouteProps> = ({ component: Component, layout: Layout = EmptyLayout, ...rest }) => {
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;
  const {isUnlocked, unlock, lock, getArweavePublicAddress, isLoading } = useWallet();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!userInfo) {
          return <Redirect to="/signin" />;
        }
        if(isLoading) {
          return <Redirect to="/login" />;
        }
        return (
          <Layout {...props}>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  )
};
export default WalletRoute;
