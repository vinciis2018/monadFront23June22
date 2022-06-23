import { HashRouter, BrowserRouter, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
// routes
import { Routes } from "routes";
// providers
import { QueryClient, QueryClientProvider } from "react-query";
import { FinnieProvider } from "components/finnie";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryParamProvider } from "use-query-params";
import {
  BackupProvider,
  LoginProvider,
  UploadProvider,
  WalletProvider,
  IpfsProvider,
  GalleryProvider,
} from "components/contexts";
// theme
import { theme } from "./theme";
// ui
import { SEO } from "components/widgets";
// fonts
import "@fontsource/montserrat";
// import { ArWalletProvider } from "components/arConnect";

const queryClient = new QueryClient();

export const App = () => {
  const RouterWrapper = (process.env.NODE_ENV !== "production" ? BrowserRouter : HashRouter) as React.ElementType;
  return (
    <>
      <SEO />
      {/* Theme (Chakra UI) */}
      <ChakraProvider theme={theme}>
        {/* React Query Provider */}
        <QueryClientProvider client={queryClient}>
          <IpfsProvider>
            <WalletProvider>
              <GalleryProvider>
                <BackupProvider>
                  <LoginProvider>
                    <UploadProvider>
                      {/* Finnie Provider */}
                      <FinnieProvider>
                        <RouterWrapper>
                          {/* Query Params */}
                          <QueryParamProvider ReactRouterRoute={Route}>
                            <Routes />
                          </QueryParamProvider>
                        </RouterWrapper>
                      </FinnieProvider>
                    </UploadProvider>
                  </LoginProvider>
                </BackupProvider>
              </GalleryProvider>
            </WalletProvider>
          </IpfsProvider>
          {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
};
