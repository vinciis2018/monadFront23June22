import React, { Fragment, ReactNode } from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from 'react-redux'
import { useLogin } from "components/contexts";

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

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, layout: Layout = EmptyLayout, ...rest }) => {
  const userSignin = useSelector((state: any) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!userInfo) {
          return <Redirect to="/signin" />;
        } else {
          if (!userInfo.defaultWallet) {
            return <Redirect to="/welcome" />
          } 
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
export default PrivateRoute;
